import express from 'express';
import Book from '../controller/book.controller';
import BookMiddleware from '../middleware/book.middleware';
import validate from '../helpers/validator';

const app = express.Router();

app.post('/', validate.book, BookMiddleware.checkIfExists, Book.create);
app.get('/', Book.getAll);
app.get('/:id', BookMiddleware.getBookById, Book.getOne);
app.patch('/:id', validate.book, BookMiddleware.getBookById, Book.update);
app.delete('/:id', BookMiddleware.getBookById, Book.delete);

export default app;
