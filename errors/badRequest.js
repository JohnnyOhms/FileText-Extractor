const CustumeError = require("./custome");
const statusCode = require("http-status");

class BadRequest extends CustumeError {
  constructor(mssg) {
    super(mssg);
    this.statusCode = statusCode.BAD_REQUEST;
  }
}

module.exports = BadRequest;
