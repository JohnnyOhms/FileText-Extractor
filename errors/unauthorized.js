const CustumeError = require("./custome");
const statusCode = require("http-status");

class UnautorizedError extends CustumeError {
  constructor(mssg) {
    super(mssg);
    this.statusCode = statusCode.UNAUTHORIZED;
  }
}

module.exports = UnautorizedError;
