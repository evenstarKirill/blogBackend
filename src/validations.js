import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'wrong format email').isEmail(),
  body('password', 'minimal length for password is 5 symbols').isLength({
    min: 5,
  }),
  body('name', 'minimal length for password is 2 symbols').isLength({ min: 2 }),
  body('avatarUrl', 'avatar must be an url').optional().isURL(),
];

export const loginValidation = [
  body('email', 'wrong format email').isEmail(),
  body('password', 'minimal length for password is 5 symbols').isLength({
    min: 5,
  }),
];

export const postCreateValidation = [
  body('title', 'enter the title').isLength({ min: 3 }).isString(),
  body('text', 'enter the text').isLength({ min: 10 }).isString(),
  body('tags', 'wrong data format (enter array of strings)')
    .optional()
    .isArray(),
  body('imageUrl', 'wrong url)').optional().isString(),
];
