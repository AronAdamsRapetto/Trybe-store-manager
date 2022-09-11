const { saleService } = require('../services');
const errorCode = require('../utils/errorMap'); 

const insertSale = async (req, res) => {
  const { body } = req;

  const { type, message } = await saleService.insertSale(body);

  if (type) return res.status(errorCode(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  insertSale,
};