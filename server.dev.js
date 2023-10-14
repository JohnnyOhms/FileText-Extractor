const express = require("express");
const statusCode = require("http-status");
const cors = require("cors");
const Router = require("./routes/route");
const authRouter = require("./routes/auth");
const notFoundMiddleware = require("./middlewares/notfound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./config/db");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const authorization = require("./middlewares/authorization");
const PORT = process.env.PORT || 9000;
require("dotenv").config();
require("./config/passport");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 4 * 24 * 60 * 60 * 1000, //4 days (expiration time of the cookie)
    },
  })
);

app.get("/", (req, res) => {
  res.status(statusCode.OK).send("Backend Server API");
});

app.use("/api/auth/", authRouter);
app.use("/api/", authorization, Router);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  db.connect((err) => {
    if (err) return console.log("failed to connect db", err);
    db.query("SHOW DATABASES", (err, result) => {
      if (err) {
        return console.log("failed to display db");
      }
      // console.log(result);
    });
    console.log(`Express server running on PORT ${PORT}`);
    console.log("connected to db");
  });
});
