const { productService } = require('../services');
const errorCode = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.getProductById(id);
  
  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
};