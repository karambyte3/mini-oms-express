import {
  findAll,
  findById,
  createProduct as create,
  updateProduct as update,
  deleteProduct as deleteProd,
} from './productsService.js';

export const listProducts = (req, res) => {
  const products = findAll();
  res.json(products);
};

export const getProduct = (req, res) => {
  res.json(findById(req.params.id));
};

export const createProduct = (req, res) => {
  const newProductReqObj = req.body;
  const newProduct = create(newProductReqObj);

  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  res.json(update(req.params.id, req.body));
};

export const deleteProduct = (req, res) => {
  res.status(204).json(deleteProd(req.params.id));
};
