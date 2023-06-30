const express = require("express");
const Router = express.Router();
const { Register, forgotPassword, login } = require("../controllers/auth");
const passport = require("passport");
const { JwtToken } = require("../config/util");
const path = require("path");

Router.route("/register").post(Register);
// Router.route("/login").post(
//   passport.authenticate("local", {
//     failureRedirect: "/failed",
//     // successRedirect: "/api/dashboard",
//   }),
//   login
// );
Router.route("/login").post(login);
Router.route("/auth/google").get(
  passport.authenticate("google", { scope: ["email", "profile"] })
);
Router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/api/dashboard",
  })
);
Router.route("/auth/github").get(
  passport.authenticate("github", { scope: ["user:email"] })
);
Router.route("/auth/github/callback").get(
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/api/dashboard",
  })
);
Router.route("/forgetpassword").post(forgotPassword);

module.exports = Router;
