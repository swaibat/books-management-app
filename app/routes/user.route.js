import express from 'express';
import User from '../controller/user.controller'
import Middleware from '../middleware'
import validate from '../helpers/validator'
const app = express.Router();

app.post('/auth/register',validate.register,Middleware.getUser,User.signup);
app.post('/auth/login',Middleware.checkUserExist,User.login);

export default app;