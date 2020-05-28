import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './app/routes/index';

const app = express();
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api/v1', routes);
// should be added after all routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: `${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} not found`,
  });
});
// HANDLING BODY PARSER ERRORS
app.use((error, req, res, next) => {
  res.status(400).json({
    status: 400,
    message: `bad request: ${error.message}`
  });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port 3000`);
  });
export default app;