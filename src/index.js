import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserControllers from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js'

mongoose
  .connect(
    'uri'
  )
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('src/uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, UserControllers.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserControllers.register);

app.get('/auth/me', checkAuth, UserControllers.getMe);

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.get('/posts', checkAuth, PostController.getAll);
app.get('/posts/:id', checkAuth, PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('server ok');
});
