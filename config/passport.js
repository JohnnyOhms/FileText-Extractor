const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const db = require("../config/db");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const fs = require("node:fs");
const path = require("node:path");

// local startegy
const custumFileds = {
  usernameField: "email",
  passwordField: "password",
};

const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (verifyCallback = (email, password, done) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
      if (err) {
        return done(err);
      }
      if (user.length <= 0) {
        return done(null, false);
      }
      const verifyPassword = bcrypt.compareSync(
        password.toString(),
        user[0].password
      );
      if (!verifyPassword) {
        return done(null, false);
      }
      return done(null, user[0]);
    });
  })
);

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
      console.log(profile);
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
        // console.lo
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

// sign token strategy
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: fs.readFileSync(
        path.join(__dirname, "/id_rsa_private.pem"),
        "utf-8"
      ),
    },
    function (jwtPayload, cb) {
      //find the user in db if needed
      return db.query(
        "SELECT * FROM users WHERE userId = ?",
        [jwtPayload.userId],
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          return done(null, user[0]);
        }
      );
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
