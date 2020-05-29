
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
chai.should();
describe('Books CRUD Ops', () => {
  it('Should create book successfully', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .send({
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Rich_Dad_Poor_Dad.jpg/220px-Rich_Dad_Poor_Dad.jpg'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('title').eql('Rich Dad Poor Dad');
        done();
      });
  });
  it('Should create book successfully', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .send({
        title: '',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Rich_Dad_Poor_Dad.jpg/220px-Rich_Dad_Poor_Dad.jpg'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should check if book already exists', (done) => {
    chai.request(app)
      .post('/api/v1/books')
      .send({
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Rich_Dad_Poor_Dad.jpg/220px-Rich_Dad_Poor_Dad.jpg'
      })
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
      .send({
        title: 'Rich Dad Poor Dad 3',
        author: 'Robert Kiyosaki',
        isbn: '978-3-16-148410-12',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Rich_Dad_Poor_Dad.jpg/220px-Rich_Dad_Poor_Dad.jpg'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('title').eql('Rich Dad Poor Dad 3');
        done();
      });
  });
  it('Should get all books', (done) => {
    chai.request(app)
      .get('/api/v1/books')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Should get single book by id', (done) => {
    chai.request(app)
      .get('/api/v1/books/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('title').eql('Rich Dad Poor Dad 3');
        done();
      });
  });
  it('Should delete a book', (done) => {
    chai.request(app)
      .delete('/api/v1/books/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('book deleted successfully');
        done();
      });
  });
});
