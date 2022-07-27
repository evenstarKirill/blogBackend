import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
import checkAuth from './utils/checkAuth.js';
import * as UserControllers from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.xs4zwfn.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('o hi mark');
});

app.post('/auth/login', loginValidation, UserControllers.login);
app.post('/auth/register', registerValidation, UserControllers.register);
app.get('/auth/me', checkAuth, UserControllers.getMe);

app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.get('/posts', checkAuth, PostController.getAll);
app.get('/posts/:id', checkAuth, PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);


app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('server ok');
});
