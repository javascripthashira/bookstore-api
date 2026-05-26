import { Router } from 'express';
import {
    CreateBook, GetFilteredBooks, GetBookByID, UpdateBooks, DeleteBooks
} from './books.controller';
import { createBookValidation, updateBookValidation, getFilteredBooksValidation } from './books.validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - stock
 *               - publishedAt
 *               - authorId
 *               - genres
 *             properties:
 *               title:
 *                 type: string
 *                 example: Things Fall Apart
 *               price:
 *                 type: number
 *                 example: 12.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *                 example: 1958-01-01T00:00:00.000Z
 *               authorId:
 *                 type: string
 *                 format: uuid
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Fiction", "African Literature"]
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', createBookValidation, CreateBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books with optional filtering, sorting and pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre name
 *         example: Fiction
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price, publishedAt, title]
 *         description: Field to sort by
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of books with pagination metadata
 */
router.get('/', getFilteredBooksValidation, GetFilteredBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
router.get('/:id', GetBookByID);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *               authorId:
 *                 type: string
 *                 format: uuid
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
router.put('/:id', updateBookValidation, UpdateBooks);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete('/:id', DeleteBooks);

export default router;