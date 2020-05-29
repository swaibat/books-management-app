import validate from './validation';

const validator = {
  register(req, res, next) {
    const err = validate(
      req.body, {
        username: { req: true, min: 2 },
        email: { req: true, email: true, min: 2 },
        password: { req: true, min: 4 },
      },
      error => error
    );
    if (err) return res.status(400).send({ status: 400, message: err });
    next();
  },
  book(req, res, next) {
    const err = validate(
      req.body, {
        title: { req: true, min: 2 },
        isbn: { req: true, min: 2 },
        author: { req: true, min: 2 },
        image: { req: true, min: 4 },
      },
      error => error
    );
    if (err) return res.status(400).send({ status: 400, message: err });
    next();
  },
};


export default validator;
