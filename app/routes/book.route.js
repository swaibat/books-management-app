import express from 'express';
import Book from '../controller/book.controller';
import BookMiddleware from '../middleware/book.middleware';
import UserMiddleware from '../middleware';
import validate from '../helpers/validator';

const app = express.Router();

app.post('/', UserMiddleware.verifyToken, validate.book, BookMiddleware.checkIfExists, Book.create);
app.get('/', Book.getAll);
app.get('/:id', UserMiddleware.verifyToken, BookMiddleware.getBookById, Book.getOne);
app.patch('/:id', UserMiddleware.verifyToken, validate.book, BookMiddleware.getBookById, Book.update);
app.delete('/:id', UserMiddleware.verifyToken, BookMiddleware.getBookById, Book.delete);

export default app;
