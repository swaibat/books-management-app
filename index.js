import express from 'express';
import cors from 'cors';
import routes from './app/routes/index';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/v1', routes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: `${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} not found`,
  });
});

app.use((error, req, res) => {
  res.status(400).json({
    status: 400,
    message: `bad request: ${error.message}`
  });
});

app.listen(process.env.PORT || 3000);
export default app;
