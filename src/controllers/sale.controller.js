const { saleService } = require('../services');
const errorCode = require('../utils/errorMap'); 

const insertSale = async (req, res) => {
  const { body } = req;

  const { type, message } = await saleService.insertSale(body);

  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const sales = await saleService.getAllSales();

  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getSaleById(id);

  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(200).json(message);
};

const removeSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.removeSale(id);

  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const { type, message } = await saleService.updateSale(id, body);

  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  removeSale,
  updateSale,
};