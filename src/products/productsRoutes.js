import express from 'express';

import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from './productsController.js';

export const productRouter = express.Router();

productRouter.get('/', listProducts);

productRouter.get('/:id', getProduct);

productRouter.post('/', createProduct);

productRouter.patch('/:id', updateProduct);

productRouter.delete('/:id', deleteProduct);

export default productRouter;
