const jw = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const JwtToken = {
  signToken: (object) => {
    const privateKey = fs.readFileSync(
      path.join(__dirname, "/id_rsa_private.pem"),
      "utf-8"
    );
    return jw.sign(
      object,
      privateKey,
      { algorithm: "RS256" },
      process.env.JSON_EXPIRE
    );
  },
  verifyToken: (token) => {
    const publicKey = fs.readFileSync(
      path.join(__dirname, "/id_rsa_public.pem"),
      "utf-8"
    );
    return jw.verify(token, publicKey, { algorithms: ["RS256"] });
  },
};

module.exports = { JwtToken };
