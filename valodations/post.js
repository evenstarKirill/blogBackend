import { body } from 'express-validator';

export const postValidation = [
  body('email', 'wrong format email').isEmail(),
  body('password', 'minimal length for password is 5 symbols').isLength({ min: 5 }),
  body('name', 'minimal length for password is 2 symbols').isLength({ min: 2 }),
  body('avatarUrl', 'avatar must be an url').optional().isURL()
];
