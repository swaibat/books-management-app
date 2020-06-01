
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import helper from '../app/helpers';

chai.use(chaiHttp);
chai.should();
describe('Books CRUD Ops', () => {
  it('Should create book successfully', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .set('Authorization', helper.createToken({ email: 'demo@gmail.com', username: 'demo' }).token)
      .field({
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12'
      })
      .attach('image', './test/test.jpg')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('title').eql('Rich Dad Poor Dad');
        done();
      });
  });
  it('Should create errotr 400', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .set('Authorization', helper.createToken({ email: 'demo@gmail.com', username: 'demo' }).token)
      .field({
        title: '',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12'
      })
      .attach('image', './test/test.jpg')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should check if book already exists', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .set('Authorization', helper.createToken({ email: 'demo@gmail.com', username: 'demo' }).token)
      .field({
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12'
      })
      .attach('image', './test/test.jpg')
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('book with the same title and author already exists');
        done();
      });
  });
  it('Should update book successfully', (done) => {
    chai.request(app)
      .patch('/api/v1/books/1')
      .set('Authorization', helper.createToken({ email: 'demo@gmail.com', username: 'demo' }).token)
      .field({
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12'
      })
      .attach('image', './test/test.jpg')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('title').eql('Rich Dad Poor Dad');
        done();
      });
  });
  it('Should update book successfully', (done) => {
    chai.request(app)
      .patch('/api/v1/books/1')
      .field({
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12'
      })
      .attach('image', './test/test.jpg')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('provide token to get access');
        done();
      });
  });
  it('Should get all books', (done) => {
    chai.request(app)
      .get('/api/v1/books')
      .set('Authorization', helper.createToken({ email: 'demo@gmail.com', username: 'demo' }).token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Should get single book by id', (done) => {
    chai.request(app)
      .get('/api/v1/books/1')
      .set('Authorization', helper.createToken({ email: 'demo@gmail.com', username: 'demo' }).token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('title').eql('Rich Dad Poor Dad');
        done();
      });
  });
  it('Should delete a book', (done) => {
    chai.request(app)
      .delete('/api/v1/books/1')
      .set('Authorization', helper.createToken({ email: 'demo@gmail.com', username: 'demo' }).token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('book deleted successfully');
        done();
      });
  });
});
