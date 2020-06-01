import express from 'express';
import fileUpload from 'express-fileupload';
import Book from '../controller/book.controller';
import BookMiddleware from '../middleware/book.middleware';
import UserMiddleware from '../middleware';
import validate from '../helpers/validator';
import helper from '../helpers/cloudinary';

const app = express.Router();
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));
app.post('/', UserMiddleware.verifyToken, helper.imageUpload, validate.book, BookMiddleware.checkIfExists, Book.create);
app.patch('/:id', UserMiddleware.verifyToken, helper.imageUpload, validate.book, BookMiddleware.getBookById, Book.update);
app.get('/', Book.getAll);
app.get('/:id', UserMiddleware.verifyToken, BookMiddleware.getBookById, Book.getOne);
app.delete('/:id', UserMiddleware.verifyToken, BookMiddleware.getBookById, Book.delete);

export default app;
