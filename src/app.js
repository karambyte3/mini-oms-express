import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFound.js';
import { productRouter } from './products/productsRoutes.js';

const app = express();

app.use(express.json());

// ------- begin system endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express' });
});

app.post('/boom', (req, res) => {
  const err = new Error('Async Boom!');
  err.status = 500;

  throw err;
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});
// ------- end system endpoints

app.use('/products', productRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
