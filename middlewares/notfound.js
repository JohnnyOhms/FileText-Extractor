const statusCode = require("http-status");

const notFound = (req, res) => {
  res
    .status(statusCode.NOT_FOUND)
    .send({ success: false, mssg: "Route not found" });
};

module.exports = notFound;
