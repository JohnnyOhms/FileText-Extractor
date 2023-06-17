import express from "express";
import React from "react";
import ReactDomServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";
import path from "path";
import fs from "fs";
import Tesseract from "tesseract.js";
import App from "./src/App";

const app = express();

app.use(express.static("./build", { index: false }));
const style = new ServerStyleSheet();
const img = fs.readFileSync("./image2.png");

app.get("/*", (req, res) => {
  const reactApp = ReactDomServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const templateFile = path.resolve("./build/index.html");
  fs.readFile(templateFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.send(
      data
        .replace("<div id='root'></div>", `<div id='root'>${reactApp}</div>`)
        .replace("{{style}}", style.getStyleTags())
    );
  });
});

app.get("/api/extract", (req, res) => {
  Tesseract.recognize(img, "eng", { logger: (m) => console.log(m) })
    .then((d) => {
      console.log(d);
      res.send(`<p>${d.data.hocr}</p>`);
    })
    .catch((err) => console.log(err))
    .finally((c) => console.log(c));
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
