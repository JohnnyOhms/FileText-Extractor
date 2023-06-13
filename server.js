import express from "express";
import React from "react";
import ReactDomServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyledSheet } from "styled-component";
import path from "path";
import fs from "fs";
import App from "./src/App";

const app = express();

app.use(express.static("./build", { index: false }));

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
      data.replace("<div id='root'></div>", `<div id='root'>${reactApp}</div>`)
    );
  });
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
