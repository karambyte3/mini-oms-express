import { randomUUID } from 'node:crypto';
import { getProductObjIndex } from '../helpers/productsHelper.js';
import { NotFoundError, ConflictError } from '../errors/HttpError.js';

// Only these fields may come from the client; id/createdAt/updatedAt are ours.
const WRITABLE_FIELDS = ['name', 'sku', 'priceCents', 'stock'];

const pickWritable = (body = {}) =>
  Object.fromEntries(Object.entries(body).filter(([key]) => WRITABLE_FIELDS.includes(key)));

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

export const findById = (id) => {
  const foundProduct = products.find((product) => product.id === id);

  if (!foundProduct) {
    throw new NotFoundError(`Product ${id} not found`);
  }

  return foundProduct;
};

const findBySku = (sku) => products.find((product) => product.sku === sku);

// exceptId lets an update keep its own sku without tripping the check.
const assertSkuIsFree = (sku, exceptId) => {
  const owner = findBySku(sku);

  if (owner && owner.id !== exceptId) {
    throw new ConflictError(`Product with sku ${sku} already exists`);
  }
};

export const createProduct = (body) => {
  const data = pickWritable(body);
  assertSkuIsFree(data.sku);

  const createdDate = new Date();

  // Our fields go last so nothing from the client can override them.
  const newProduct = {
    ...data,
    id: randomUUID(),
    createdAt: createdDate,
    updatedAt: createdDate,
  };

  products.push(newProduct);

  return newProduct;
};

export const updateProduct = (id, body) => {
  const product = findById(id);
  const productIndex = getProductObjIndex(product, products);
  const changes = pickWritable(body);

  if (changes.sku !== undefined) {
    assertSkuIsFree(changes.sku, id);
  }

  // PATCH = merge: keep existing fields, overwrite only the ones sent.
  const updatedProductObj = {
    ...product,
    ...changes,
    updatedAt: new Date(),
  };

  products[productIndex] = updatedProductObj;

  return updatedProductObj;
};

export const deleteProduct = (id) => {
  const product = findById(id);
  const productIndex = getProductObjIndex(product, products);

  products.splice(productIndex, 1);

  return products;
};
