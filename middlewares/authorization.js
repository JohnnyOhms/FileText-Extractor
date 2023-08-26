const { UnauthorizedError } = require("../errors");
const asyncWrapper = require("./asyncWrapper");
const { JwtToken } = require("../config/util");

const authorization = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenRegex = /^Bearer\s+(.*?)$/;

  if (!authHeader) {
    return next(new UnauthorizedError("Unauthorized, no Token"));
  }

  const tokenMatch = authHeader.match(tokenRegex);

  if (!tokenMatch || !tokenMatch[1]) {
    return next(new UnauthorizedError("Unauthorized, no Token"));
  }

  const token = tokenMatch[1];

  try {
    const decode = JwtToken.verifyToken(token);
    req.user = {
      userId: decode.userId,
      email: decode.email,
      username: decode.username,
    };
    next();
  } catch (err) {
    return next(new UnauthorizedError("Unauthorized to decode"));
  }
});

module.exports = authorization;
