const errorMap = {
  NOT_FOUND: 404,
};

const errorCode = (error) => errorMap[error];

module.exports = errorCode;