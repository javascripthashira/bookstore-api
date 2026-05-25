import { NextFunction, Request, Response } from "express";
import { CreateAuthor, GetAllAuthors, GetAuthorById, DeleteAuthor, UpdateAuthor } from "./authors.service";
import { validationResult } from "express-validator";

export const Createauthor = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const author = await CreateAuthor(req.body)
        return res.status(201).json({ message: "Author created successfully", data: author })
    } catch (error) {
        next(error)
    }


}
export const GetAllauthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authors = await GetAllAuthors()
        return res.status(200).json({ message: "Authors fetched successfully", data: authors })
    } catch (error) {
        next(error)
    }
}
export const GetAuthorByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const author = await GetAuthorById(id);
        return res.status(200).json({ message: "Author fetched successfully", data: author })
    } catch (error) {
        next(error)
    }
}
export const UpdateAuthors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const id = req.params.id as string;
        const author = await UpdateAuthor(id, req.body);
        return res.status(200).json({ message: "Author updated successfully", data: author })
    } catch (error) {
        next(error)
    }
}
export const DeleteAuthors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const author = await DeleteAuthor(id);
        return res.status(200).json({ message: "Author deleted successfully", data: author })
    } catch (error) {
        next(error)
    }
}