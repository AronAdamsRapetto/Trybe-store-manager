const { nameSchema } = require('./schemas');

const validationNameSchema = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { type: 'INVALID_FIELD', message: error.message };
  return { type: null, message: '' };
};

module.exports = validationNameSchema;