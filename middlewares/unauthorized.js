const jwt = require("jsonwebtoken");
const { UnautorizedError } = require("../errors");
const asyncWrapper = require("./asyncWrapper");
const { JwtToken } = require("../config/util");

const auth = asyncWrapper((req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startWith("Bearer")) {
    return next(new UnautorizedError("Unauthorized"));
  }
  const token = authHeader.split("")[1];

  try {
    const decode = JwtToken.verifyToken(token);
    req.user = {
      userId: decode.userId,
      email: decode.email,
      username: decode.username,
    };
    next();
  } catch (err) {
    return next(new UnautorizedError("Unauthorized"));
  }
});

module.exports = auth;
