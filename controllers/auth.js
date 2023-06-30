const db = require("../config/db");
const statusCode = require("http-status");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { BadRequestError } = require("../errors");
const { JwtToken } = require("../config/util");
const Passport = require("passport");

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
        return next(new BadRequestError("Email already in Use"));
      }
      if (result && result.length > 0) {
        return res
          .status(statusCode.UNAUTHORIZED)
          .send({ err: "Email already used " });
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

const login = (req, res, next) => {
  Passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user,
      });
    }
    req.login(user, { session: true }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = JwtToken.signToken({
        userId: user.userId,
        email: user.email,
        username: user.username,
      });
      return res.json({ user, token });
    });
  })(req, res);
};

const forgotPassword = (req, res, next) => {};

module.exports = { Register, forgotPassword, login };
