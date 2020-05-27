import express from 'express';
import userRouter from './user.route.js';


const app = express.Router();

app.use('/users', userRouter);

export default app;
