import express from 'express';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

app.use(errorHandler);

app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

export default app;
