import { Router } from 'express';
import { CreateBook, GetAllBooks, GetBookByID, UpdateBooks, DeleteBooks, GetFilteredBooks } from './books.controller';
import { createBookValidation, getFilteredBooksValidation, updateBookValidation } from './books.validator';

const router = Router();

router.post('/', createBookValidation, CreateBook);
router.get('/', GetAllBooks);
router.get('/:id', GetBookByID);
router.put('/:id', updateBookValidation, UpdateBooks);
router.get('/', getFilteredBooksValidation, GetFilteredBooks);
router.delete('/:id', DeleteBooks);

export default router;