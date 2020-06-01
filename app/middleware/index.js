import db from '../database/models';
import helpers from '../helpers';

const UserMiddleware = {

  async getUser(req, res, next) {
    const user = await db.User.findOne({ where: { email: req.body.email }, raw: true });
    user
      ? res.status(409).send({ status: 409, message: 'user with email already exists' })
      : next();
  },

  async checkUserExist(req, res, next) {
    const user = await db.User.findOne({ where: { email: req.body.email }, raw: true });
    const password = user && helpers.comparePassword(req.body.password, user.password);
    if (!password) {
      return res.status(400).send({ status: 400, message: 'invalid login details' });
    }
    delete user.password;
    req.user = user;
    return next();
  },

  async getBook(req, res, next) {
    const book = await db.Book.findOne({ where: { email: req.params.id }, raw: true });
    book
      ? res.status(409).send({ status: 409, message: 'user with email already exists' })
      : next();
  },

  verifyToken(req, res, next) {
    const token = helpers.getToken(req);
    if (!token) return res.status(401).send({ status: 401, message: 'provide token to get access' });
    const userData = helpers.decodeToken(token);
    if (userData.error) return res.status(401).send({ status: 401, message: userData.error });
    req.user = userData;
    next();
  },
};


export default UserMiddleware;
