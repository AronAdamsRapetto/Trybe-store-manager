const validationSaleSchema = require('./validations/validationSaleSchema');
const { productModel, saleModel } = require('../models');

const getProducts = (productIds) => productIds
  .map(async (productId) => productModel
    .getProductById(productId));

const verifyProducts = (products) => products.some((product) => !product);

const insertSale = async (sales) => {
  const validation = validationSaleSchema(sales);
  if (validation.type) return validation;

  const productIds = sales.map(({ productId }) => productId);
  const products = await Promise.all(getProducts(productIds));
  const someProductNotExist = verifyProducts(products);
  if (someProductNotExist) return { type: 'NOT_FOUND', message: 'Product not found' };

  const saleId = await saleModel.insertSale(sales);
  return { type: null, message: { id: saleId, itemsSold: sales } };
};

module.exports = {
  insertSale,
};