const { productModel } = require('../models');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);  

  if (product) return { type: null, message: product };
  return { type: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getAllProducts,
  getProductById,
};