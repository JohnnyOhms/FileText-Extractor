const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../config/db");
const bcrypt = require("bcrypt");

const custumFileds = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (email, password, done) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    const verifyPassword = bcrypt.compareSync(
      password.toString(),
      user[0].password
    );
    if (!verifyPassword) {
      return done(null, false);
    }
    return done(null, user);
  });
};

const strategy = new LocalStrategy(custumFileds, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // qurey to find user from db
  const userId = user[0].userId;
  db.query(`SELECT * FROM users WHERE userId = ?`, [userId], (err, result) => {
    if (err) {
      return done(err);
    }
    return done(null, result[0]);
  });
});
