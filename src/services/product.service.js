const { productModel } = require('../models');
const validationName = require('./validations/validationNameSchema');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);  

  if (product) return { type: null, message: product };
  return { type: 'NOT_FOUND', message: 'Product not found' };
};

const insertProduct = async (name) => {
  const validation = validationName(name);

  if (validation.type) return validation;

  const insertedId = await productModel.insertProduct(name);
  const insertedProduct = await productModel.getProductById(insertedId);

  return { type: null, message: insertedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};