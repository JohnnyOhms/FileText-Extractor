const express = require("express");
const Router = express.Router();
const {
  Register,
  forgotPassword,
  login,
  signTokenOauth,
} = require("../controllers/auth");
const passport = require("passport");
const { JwtToken } = require("../config/util");
const path = require("path");

Router.route("/signTokenOauth").get(signTokenOauth);
Router.route("/auth/register").post(Register);
Router.route("/auth/login").post(login);
Router.route("/auth/google").get(
  passport.authenticate("google", { scope: ["email", "profile"] })
);
Router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/api/signTokenOauth",
  })
);
Router.route("/auth/twitter").get(passport.authenticate("twitter"));
Router.route("/auth/twitter/callback").get(
  passport.authenticate("twitter", {
    failureRedirect: "/",
    successRedirect: "/api/signTokenOauth",
  })
);
Router.route("/forgetpassword").post(forgotPassword);

module.exports = Router;
