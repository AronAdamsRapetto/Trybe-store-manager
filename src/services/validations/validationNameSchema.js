const { nameSchema } = require('./schemas');

const validationNameSchema = (name) => {
  const { error } = nameSchema.validate(name);
  if (error.message.includes('required')) return { type: 'INVALID_FIELD', message: error.message };
  if (error.message.includes('length')) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

module.exports = validationNameSchema;