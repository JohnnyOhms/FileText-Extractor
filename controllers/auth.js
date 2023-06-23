const db = require("../config/db");
const statusCode = require("http-status");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const uuid = require("uuid");
const { UnautorizedError, BadRequestError } = require("../errors");
const { JwtToken } = require("../config/util");

const Register = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new BadRequestError("Provide the required info"));
  }
  const userId = uuid();

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
        return next(new UnautorizedError("Email already in Use 001"));
      }
      if (result && result.length > 0) {
        return res
          .status(statusCode.UNAUTHORIZED)
          .send({ err: "Email already used 002" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password.toString(), salt);
      req.body["password"] = hash;
      const token = JwtToken.signToken({ userId, email, username });
      db.query(
        "INSERT INTO users (`email`, `username`, `password`, `userId`) VALUES (?, ?, ?, ?)",
        [email, username, req.body.password, userId],
        (err, result) => {
          if (err) {
            console.log(err);
            return next(new BadRequestError("Failed to create an account"));
          }
          return res
            .status(statusCode.CREATED)
            .send({ success: true, mssg: "user created", username, token });
        }
      );
    }
  );
};

const login = (req, res, next) => {};

const forgotPassword = (req, res, next) => {};

module.exports = { Register, login, forgotPassword };
