import express from 'express';
import UserRouter from './user.route.js';
import BookRouter from './book.route';

const app = express.Router();

app.use('/users', UserRouter);
app.use('/books', BookRouter);

export default app;
