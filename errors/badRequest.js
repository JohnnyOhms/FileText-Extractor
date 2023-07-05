const CustumeError = require("./custome");
const statusCode = require("http-status");

class BadRequest extends CustumeError {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.BAD_REQUEST;
  }
}

module.exports = BadRequest;
