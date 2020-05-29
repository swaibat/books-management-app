import db from '../database/models';

const Book = {
  async create(req, res) {
    const { title, isbn, author, image } = req.body;
    const user = await db.Book.create({ title, isbn, author, image });
    return res.status(201).send({ status: 201, message: 'book created successfully', data: user.dataValues });
  },

  async update(req, res) {
    const { title, isbn, author, image } = req.body;
    const book = await db.Book.update(
      { title, isbn, author, image }, { where: { id: req.book.id }, returning: true, plain: true, raw: true, }
    );
    return res.status(200).send({ status: 200, message: 'book updated successfully', data: book[1] });
  },

  async getAll(req, res) {
    const books = await db.Book.findAll();
    return res.status(200).send({ status: 200, data: books });
  },

  getOne(req, res) {
    res.status(200).send({ status: 200, data: req.book });
  },

  async delete(req, res) {
    await db.Book.destroy({ where: { id: req.book.id, } });
    return res.status(200).send({ status: 200, message: 'book deleted successfully' });
  }
};

export default Book;
