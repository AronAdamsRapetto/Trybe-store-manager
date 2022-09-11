const Joi = require('joi');

const nameSchema = Joi.string().min(5).required().messages({
  'string.min': '"name" length must be at least 5 characters long',
  'any.required': '"name" is required',
});

const saleSchema = Joi.object({
  productId: Joi.number().integer().min(1).required()
.messages({
    'any.required': '"productId" is required',
    'number.min': '"productId" must be greater than or equal to 1',
  }),
  quantity: Joi.number().integer().min(1).required()
.messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

const saleListSchema = Joi.array().items(saleSchema);

module.exports = {
  nameSchema,
  saleListSchema,
};