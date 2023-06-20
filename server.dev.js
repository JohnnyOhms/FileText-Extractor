const express = require("express");
const statusCode = require("http-status");
const cors = require("cors");
const Router = require("./routes/route");
const notFoundMiddleware = require("./middlewares/notfound");
const upload = require("./config/upload");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.status(statusCode.OK).send("Backend Server API");
});

app.post("/api/upload", upload.single("imgUpload"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  res.send("upload sucessfully");
});

app.use("/api/", Router);
app.use(notFoundMiddleware);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.listen(9000, () => {
  console.log("running on PORT 9000");
  db.connect((err) => {
    if (err) return console.log("failed to connect db", err);
    console.log("connected to db");
  });
});
