const statusCode = require("http-status");

const errorHandlerMiddleware = (err, req, res, next) => {
  const custumeError = {
    statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
    mssg: err.mssg || "Something went wrong",
  };

  return res.status(custumeError.statusCode).send(custumeError.mssg);
};

module.exports = errorHandlerMiddleware;
