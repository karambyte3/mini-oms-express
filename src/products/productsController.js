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
  const updatedProductsArr = create(newProductReqObj);

  res.json(updatedProductsArr);
};

export const updateProduct = (req, res) => {
  res.json(update(req.params.id, req.body));
};

export const deleteProduct = (req, res) => {
  res.json(deleteProd(req.params.id));
};
