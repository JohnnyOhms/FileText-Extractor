const express = require("express");
const app = express();
const T = require("tesseract.js");

app.get("/", (req, res) => {
  T.recognize(img, "eng", { logger: (m) => console.log(m) })
    .then((d) => {
      console.log(d);
      res.send(`<p>${d.data.hocr}</p>`);
    })
    .catch((err) => console.log(err))
    .finally((c) => console.log(c));
});

app.listen(9000, () => console.log("running on PORT 9000"));
