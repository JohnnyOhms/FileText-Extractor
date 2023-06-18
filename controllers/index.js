const statusCode = require("http-status");
const Tesseract = require("tesseract.js");
const fs = require("node:fs");

const extractText = (req, res) => {
  const img = fs.readFileSync("./image2.png");
  Tesseract.recognize(img, "eng", { logger: (m) => console.log(m) })
    .then((d) => {
      console.log(d);
      //   res.send(`<p>${d.data.hocr}</p>`);
      res.status(statusCode.CREATED).send(`<p>${d}</p>`);
    })
    .catch((err) => console.log(err));
};

const imgUpload = (req, res) => {
  res.statusCode(statusCode.ACCEPTED).send("uploaded sucessfully");
};

module.exports = {
  extractText,
  imgUpload,
};
