
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
chai.should();
describe('user Registration', () => {
  it('Should enable user to register successfully', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/register')
      .send({
        username: 'doe',
        email: 'doe@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('email').eql('doe@gmail.com');
        res.body.data.should.have.property('username').eql('doe');
        done();
      });
  });
  it('Should return confict if user exists', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/register')
      .send({
        username: 'doe',
        email: 'doe@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user with email already exists');
        done();
      });
  });
  it('check if required field are provided', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/register')
      .send({
        username: '',
        email: 'doe@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('username is required');
        done();
      });
  });
  it('Validate valid email address', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/register')
      .send({
        username: 'doe',
        email: 'doe@gma',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid email address');
        done();
      });
  });
  it('should login user', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'doe@gmail.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('login successful');
        done();
      });
  });
  it('should decline login invalid details', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'doe@gmail',
        password: 'passwords'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('invalid login details');
        done();
      });
  });
});
