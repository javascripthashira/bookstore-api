import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';
import { createBook, getAllBook, getBookById, updateBook, deleteBook, getFilteredBooks } from './books.service';

export async function CreateBook(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const book = await createBook(req.body);
        return res.status(201).json({ message: "Book created successfully", data: book });
    } catch (error) {
        next(error);
    }
}

export async function GetAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
        const books = await getAllBook();
        return res.status(200).json({ message: "Books fetched successfully", data: books });
    } catch (error) {
        next(error);
    }
}

export async function GetBookByID(req: Request, res: Response, next: NextFunction) {
    try {
        const book = await getBookById(req.params.id as string);
        return res.status(200).json({ message: "Book fetched successfully", data: book });
    } catch (error) {
        next(error);
    }
}

export async function UpdateBooks(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const book = await updateBook(req.params.id as string, req.body);
        return res.status(200).json({ message: "Book updated successfully", data: book });
    } catch (error) {
        next(error);
    }
}

export async function DeleteBooks(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteBook(req.params.id as string);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export async function GetFilteredBooks(req: Request, res: Response, next: NextFunction) {
    try {
        const { genre, sort, page, limit } = req.query;
        const books = await getFilteredBooks({
            genre: genre as string | undefined,
            sort: sort as string | undefined,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });
        return res.status(200).json({ message: "Books fetched successfully", data: books });
    } catch (error) {
        next(error);
    }
}