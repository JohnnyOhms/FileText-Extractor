const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const db = require("../config/db");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { JwtToken } = require("./util");

// local startegy
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
    JwtToken.signToken({
      userId: user[0].userId,
      username: user[0].username,
      email: user[0].email,
    });
    const verifyPassword = bcrypt.compareSync(
      password.toString(),
      user[0].password
    );
    if (!verifyPassword) {
      return done(null, false);
    }
    return done(null, user[0]);
  });
};

const strategy = new LocalStrategy(custumFileds, verifyCallback);

passport.use(strategy);

// google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9000/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        const { email, given_name, sub } = profile._json;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(sub.toString(), salt);
        const userId = uuid();
        db.query(
          `SELECT * FROM users WHERE email = ?`,
          [email],
          (err, result) => {
            if (err) {
              return done(err);
            }
            if (result.length > 0) {
              return done(err, result[0]);
            }
            db.query(
              "INSERT INTO users (`email`, `username`, `password`, `userId`) VALUES (?, ?, ?, ?)",
              [email, given_name, hash, userId],
              (err, result) => {
                if (err) {
                  return done(err);
                }
                return done(err, {
                  email,
                  username: given_name,
                  password: hash,
                  userId,
                });
              }
            );
          }
        );
      });
    }
  )
);

// github strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:9000/api/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        const { id, login } = profile._json;
        const email =
          profile._json.company ||
          profile._json.email ||
          profile._json.blog ||
          login;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(id.toString(), salt);
        const userId = uuid();

        db.query(
          `SELECT * FROM users WHERE email = ?`,
          [email],
          (err, result) => {
            if (err) {
              return done(err);
            }
            if (result.length > 0) {
              return done(err, result[0]);
            }
            db.query(
              "INSERT INTO users (`email`, `username`, `password`, `userId`) VALUES (?, ?, ?, ?)",
              [email, login, hash, userId],
              (err, result) => {
                if (err) {
                  return done(err);
                }
                return done(err, {
                  email,
                  username: login,
                  password: hash,
                  userId,
                });
              }
            );
          }
        );
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // qurey to find user from db
  db.query(
    `SELECT * FROM users WHERE userId = ?`,
    [user.userId],
    (err, result) => {
      if (err) {
        return done(err);
      }
      return done(null, result[0]);
    }
  );
});
