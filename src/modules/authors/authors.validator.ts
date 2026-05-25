import { body } from 'express-validator';

export const createAuthorValidation = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    body('bio')
        .optional()
        .isString().withMessage('Bio must be a string'),
];

export const updateAuthorValidation = [
    body('name')
        .optional()
        .isString().withMessage('Name must be a string'),
    body('bio')
        .optional()
        .isString().withMessage('Bio must be a string'),
];