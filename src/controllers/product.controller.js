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

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insertProduct(name);

  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productService.updateProduct(id, name);

  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.removeProduct(id);

  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(204).json();
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  removeProduct,
};