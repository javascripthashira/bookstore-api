import { prisma } from "../../library/prisma";
import { AppError } from '../../middleware/errorHandler';



export async function CreateAuthor(data: { name: string; bio?: string }) {
    return await prisma.author.create({
        data: { name: data.name, bio: data.bio }
    });
}

export async function GetAllAuthors() {
    return await prisma.author.findMany({
        include: {
            books: {
                select: {
                    id: true,
                    title: true,
                    price: true,
                    genres: {
                        select: {
                            genre: {
                                select: { name: true }
                            }
                        }
                    }
                }
            }
        }
    });
}


export async function GetAuthorById(id: string) {
    const author = await prisma.author.findUnique({
        where: { id },
        include: {
            books: {
                select: {
                    id: true,
                    title: true,
                    price: true,
                    genres: {
                        select: {
                            genre: {
                                select: { name: true }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!author) throw new AppError('Author not found', 404);
    return author;
}

export async function UpdateAuthor(id: string, data: { name?: string, bio?: string }) {
    await GetAuthorById(id); // throws automatically if not found

    return await prisma.author.update({
        where: { id },
        data: { name: data.name, bio: data.bio }
    });
}

export async function DeleteAuthor(id: string) {
    await GetAuthorById(id);

    return await prisma.author.delete({
        where: {
            id: id
        },
    });
}

