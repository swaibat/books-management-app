import db from '../database/models';

const BookMiddleware = {
  async checkIfExists(req, res, next) {
    const { title, author } = req.body;
    const book = await db.Book.findOne({ where: { title, author }, raw: true });
    book
      ? res.status(409).send({ status: 409, message: 'book with the same title and author already exists' })
      : next();
  },
  async getBookById(req, res, next) {
    const book = await db.Book.findOne({ where: { id: req.params.id }, raw: true });
    !book
      ? res.status(404).send({ status: 404, message: 'Book with given id not found' })
      : (req.book = book, next());
  },
};


export default BookMiddleware;
