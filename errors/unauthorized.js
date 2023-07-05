const CustumeError = require("./custome");
const statusCode = require("http-status");

class UnautorizedError extends CustumeError {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.UNAUTHORIZED;
  }
}

module.exports = UnautorizedError;
