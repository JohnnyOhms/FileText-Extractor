const express = require("express");
const Tesseract = require("tesseract.js");
const fs = require("node:fs");
const cors = require("cors");

const app = express();
app.use(cors());

const img = fs.readFileSync("./image2.png");

app.get("/", (req, res) => {
  Tesseract.recognize(img, "eng", { logger: (m) => console.log(m) })
    .then((d) => {
      console.log(d);
      //   res.send(`<p>${d.data.hocr}</p>`);
      res.send(`<p>${d}</p>`);
    })
    .catch((err) => console.log(err));
});

app.listen(9000, () => console.log("running on PORT 9000"));
