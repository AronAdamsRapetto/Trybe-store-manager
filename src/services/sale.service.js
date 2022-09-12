const validationSaleSchema = require('./validations/validationSaleSchema');
const { productModel, saleModel } = require('../models');

const getProducts = (productIds) => productIds
  .map(async (productId) => productModel
    .getProductById(productId));

const verifyProducts = async (sales) => {
  const productIds = sales.map(({ productId }) => productId);
  const products = await Promise.all(getProducts(productIds));
  return products.some((product) => !product);
};

const insertSale = async (sales) => {
  const validation = validationSaleSchema(sales);
  if (validation.type) return validation;

  const someProductNotExist = await verifyProducts(sales);
  if (someProductNotExist) return { type: 'NOT_FOUND', message: 'Product not found' };

  const saleId = await saleModel.insertSale(sales);
  return { type: null, message: { id: saleId, itemsSold: sales } };
};

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);

  if (!sale || sale.length < 1) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const removeSale = async (id) => {
  const sale = await getSaleById(id);

  if (sale.type) return sale;

  await saleModel.removeSale(id);
  return { type: null, message: '' };
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  removeSale,
};