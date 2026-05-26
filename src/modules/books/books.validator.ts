import { body, query } from 'express-validator';

export const createBookValidation = [
    body('title')
        .notEmpty().withMessage('title is required')
        .isString().withMessage('title is required to be a string'),


    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    body('stock')
        .notEmpty().withMessage('Stock is required')
        .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),

    body('publishedAt')
        .notEmpty().withMessage('Published date is required')
        .isISO8601().withMessage('Published date must be a valid date e.g 2024-01-01'),

    body('authorId')
        .notEmpty().withMessage('Author ID is required')
        .isUUID().withMessage('Author ID must be a valid UUID'),

    body('genres')
        .notEmpty().withMessage('Genres is required')
        .isArray({ min: 1 }).withMessage('Genres must be an array with at least one genre'),

    body('genres.*')
        .isString().withMessage('Each genre must be a string')
        .notEmpty().withMessage('Genre name cannot be empty'),
];

export const updateBookValidation = [
    body('title')
        .optional()
        .isString().withMessage('Title must be a string'),

    body('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),

    body('publishedAt')
        .optional()
        .isISO8601().withMessage('Published date must be a valid date e.g 2024-01-01'),

    body('authorId')
        .optional()
        .isUUID().withMessage('Author ID must be a valid UUID'),

    body('genres')
        .optional()
        .isArray({ min: 1 }).withMessage('Genres must be an array with at least one genre'),

    body('genres.*')
        .optional()
        .isString().withMessage('Each genre must be a string')
        .notEmpty().withMessage('Genre name cannot be empty'),
];


export const getFilteredBooksValidation = [
    query('genre')
        .optional()
        .isString().withMessage('Genre must be a string')
        .trim(),

    query('sort')
        .optional()
        .isIn(['price', 'publishedAt', 'title']).withMessage('Sort must be one of: price, publishedAt, title'),

    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer')
        .toInt(),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
        .toInt(),
];