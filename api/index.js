import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';

const app = express();
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());




app.use((req, res, next) => {
  req.io = io;
  req.connectedClients = connectedClients;
  next();
});

app.use('/api/v1', routes);
// should be added after all routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: `${req.method}=${req.protocol}://${req.headers.host}${req.originalUrl} not found`,
  });
});
// HANDLING BODY PARSER ERRORS
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(400).json({
    status: 400,
    message: `bad request: ${error.message}`
  });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${server.address().port}`);
  });
export default server;
