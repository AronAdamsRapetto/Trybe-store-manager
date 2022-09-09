const errorMap = {
  NOT_FOUND: 404,
  INVALID_FIELD: 400,
  INVALID_VALUE: 422,
};

const errorCode = (error) => errorMap[error];

module.exports = errorCode;