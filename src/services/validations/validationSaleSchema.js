const { saleListSchema } = require('./schemas');

const validationSaleSchema = (sales) => {
  const { error } = saleListSchema.validate(sales);
  console.log(error);
  if (error) {
    return {
      type: error.message.includes('required')
        ? 'INVALID_FIELD'
        : 'INVALID_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

module.exports = validationSaleSchema;