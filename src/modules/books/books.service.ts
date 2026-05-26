import { prisma } from "../../library/prisma";
import { AppError } from '../../middleware/errorHandler';

export async function createBook(data: { title: string; price: number; stock: number; publishedAt: Date; authorId: string; genres: string[] }) {
    const { title, price, stock, publishedAt, authorId, genres } = data;
    return await prisma.book.create({
        data: {
            title,
            price,
            stock,
            publishedAt,
            authorId,
            genres: {
                create: genres.map(genreName => ({
                    genre: {
                        connectOrCreate: {
                            where: { name: genreName },
                            create: { name: genreName }
                        }
                    }
                }))
            }
        },
        include: {
            author: {
                select: { id: true, name: true }
            },
            genres: {
                include: {
                    genre: {
                        select: { id: true, name: true }
                    }
                }
            }
        }
    });
}

export async function getAllBook() {
    return await prisma.book.findMany({
        include: {
            author: {
                select: { id: true, name: true }
            },
            genres: {
                include: {
                    genre: {
                        select: { id: true, name: true }
                    }
                }
            }
        }
    });
}

export async function getBookById(id: string) {
    const book = await prisma.book.findUnique({
        where: { id },
        include: {
            author: {
                select: { id: true, name: true }
            },
            genres: {
                include: {
                    genre: {
                        select: { id: true, name: true }
                    }
                }
            }
        }
    });
    if (!book) throw new AppError('Book not found', 404);
    return book;
}

export async function updateBook(id: string, data: {
    title?: string;
    price?: number;
    stock?: number;
    publishedAt?: Date;
    authorId?: string;
    genres?: string[];
}) {
    await getBookById(id); // throws 404 if not found

    const { genres, ...bookData } = data;

    return await prisma.book.update({
        where: { id },
        data: {
            ...bookData,
            ...(genres && {
                genres: {
                    deleteMany: {},  // remove existing genre links
                    create: genres.map(genreName => ({
                        genre: {
                            connectOrCreate: {
                                where: { name: genreName },
                                create: { name: genreName }
                            }
                        }
                    }))
                }
            })
        },
        include: {
            author: { select: { id: true, name: true } },
            genres: { include: { genre: { select: { id: true, name: true } } } }
        }
    });
}

export async function deleteBook(id: string) {
    await getBookById(id);
    return await prisma.book.delete({ where: { id } });
}

export async function getFilteredBooks(query: {
    genre?: string;
    sort?: string;
    page?: number;
    limit?: number;
}) {
    const { genre, sort, page = 1, limit = 10 } = query;

    const validSortFields = ['price', 'publishedAt', 'title'];
    const orderByField = validSortFields.includes(sort ?? '') ? sort! : 'publishedAt';

    const where = genre ? {
        genres: {
            some: {
                genre: {
                    name: { equals: genre, mode: 'insensitive' as const }
                }
            }
        }
    } : {};

    const books = await prisma.book.findMany({
        where,
        orderBy: { [orderByField]: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
            author: { select: { id: true, name: true } },
            genres: {
                include: {
                    genre: { select: { id: true, name: true } }
                }
            }
        }
    });

    const total = await prisma.book.count({ where });

    return {
        data: books,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
}