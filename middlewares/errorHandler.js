const statusCode = require("http-status");

const errorHandlerMiddleware = (err, req, res, next) => {
  const custumeError = {
    statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong ok",
  };
  console.log(err);
  return res
    .status(custumeError.statusCode)
    .json({ success: false, mssg: custumeError.message });
};

module.exports = errorHandlerMiddleware;
