const express = require("express");
const Router = express.Router();
const { imgUpload } = require("../controllers/index");

Router.route("/upload").post(imgUpload);

module.exports = Router;
