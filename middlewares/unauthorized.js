const jwt = require("jsonwebtoken");
const { UnautorizedError } = require("../errors");
const asyncWrapper = require("./asyncWrapper");

const auth = asyncWrapper((req, res, next) => {
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startWith("Bearer")) {
    next(new UnautorizedError("Unauthorized"));
  }
  const token = authHeader.split("")[1];

  try {
    const decode = jwt.verify(token, process.env.JSON_KEY);
    // req.user = {}
    next();
  } catch (err) {
    next(new UnautorizedError("Unauthorized"));
  }
});

module.exports = auth;
