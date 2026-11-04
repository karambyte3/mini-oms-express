import { randomUUID } from 'node:crypto';
import { getProductObjIndex } from '../helpers/productsHelper.js';

const products = [
  {
    id: '3f1c2a9e-7b4d-4e8a-9c21-5d6f0a1b2c3d',
    name: 'Wireless Mouse',
    sku: 'MOU-001',
    priceCents: 2499,
    stock: 50,
    createdAt: '2026-11-03T10:15:00.000Z',
    updatedAt: '2026-11-03T10:15:00.000Z',
  },
  {
    id: '8a7e5c14-2f9b-4d3a-b6e1-0c4d9f2a7b58',
    name: 'Mechanical Keyboard',
    sku: 'KEY-001',
    priceCents: 8999,
    stock: 25,
    createdAt: '2026-11-03T10:20:00.000Z',
    updatedAt: '2026-11-03T10:20:00.000Z',
  },
  {
    id: '5e9b1d7c-4a2f-4b8e-a3c6-7d0e1f2a3b4c',
    name: 'USB-C Hub',
    sku: 'HUB-001',
    priceCents: 3999,
    stock: 0,
    createdAt: '2026-11-03T10:30:00.000Z',
    updatedAt: '2026-11-03T10:30:00.000Z',
  },
];

// const products = [
//   {
//     id: '5e9b1d7c-4a2f-4b8e-a3c6-7d0e1f2a3b4c',
//     name: 'USB-C Hub',
//     sku: 'HUB-001',
//     priceCents: 3999,
//     stock: 0,
//     createdAt: '2026-11-03T10:30:00.000Z',
//     updatedAt: '2026-11-03T10:30:00.000Z',
//   },
// ];

export const findAll = () => {
  return products.length > 0 ? products : [];
};

export const findById = (id, create) => {
  const foundProduct = products.find((product) => product.id === id);

  if (create) {
    return null;
  }

  return foundProduct || { error: true, message: 'Product ID was NOT FOUND!' };
};

export const createProduct = (reqObject) => {
  const createdDate = new Date();
  const id = randomUUID();

  const alreadyExist = findById(reqObject.id, true);

  if (alreadyExist) {
    return { error: true, message: 'Product Already Exist' };
  }

  products.push({
    id: id,
    ...reqObject,
    createdAt: createdDate,
    updatedAt: createdDate,
  });

  return products;
};

export const updateProduct = (id, newProductReqObj) => {
  const product = findById(id);
  const productIndex = getProductObjIndex(product, products);
  const updatedDate = new Date();

  if (productIndex === -1) {
    return { error: true, message: 'Product Not Found' };
  }

  const updatedProductObj = {
    id: id,
    ...newProductReqObj,
    createdAt: product.createdAt,
    updatedAt: updatedDate,
  };

  products[productIndex] = updatedProductObj;

  return updatedProductObj;
};

export const deleteProduct = (id) => {
  const product = findById(id);
  const productIndex = getProductObjIndex(product, products);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
  }

  return products;
};
