const express = require("express");
const Router = express.Router();
const {
  extractText,
  uploadFile,
  getAllText,
  saveText,
  deleteText,
  deleteAllText,
} = require("../controllers/index");
const upload = require("../config/upload");

Router.route("/upload").post(upload.single("imgUpload"), uploadFile);
Router.route("/extract").post(extractText);
Router.route("/getalltext").get(getAllText);
Router.route("/savetext").post(saveText);
Router.route("/deletetext").post(deleteText);
Router.route("/deletealltext").post(deleteAllText);

module.exports = Router;
