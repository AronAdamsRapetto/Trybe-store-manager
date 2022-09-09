const { nameSchema } = require('./schemas');

const validationNameSchema = (name) => {
  const { error } = nameSchema.validate(name);
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

module.exports = validationNameSchema;