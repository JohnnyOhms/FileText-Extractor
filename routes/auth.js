const express = require("express");
const Router = express.Router();
const {
  Register,
  forgotPassword,
  login,
  signTokenOauth,
} = require("../controllers/auth");
const passport = require("passport");

Router.route("/register").post(Register);
Router.route("/login").post(login);
Router.route("/forgotpassword").post(forgotPassword);
Router.route("/signTokenOauth").get(signTokenOauth);
Router.route("/google").get(
  passport.authenticate("google", { scope: ["email", "profile"] })
);
Router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/api/auth/signTokenOauth",
  })
);
Router.route("/twitter").get(passport.authenticate("twitter"));
Router.route("/twitter/callback").get(
  passport.authenticate("twitter", {
    failureRedirect: "/",
    successRedirect: "/api/auth/signTokenOauth",
  })
);

module.exports = Router;
