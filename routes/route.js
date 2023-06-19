const express = require("express");
const Router = express.Router();
const { extractText } = require("../controllers/index");

Router.route("/extract").post(extractText);

module.exports = Router;
