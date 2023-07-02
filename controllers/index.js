const statusCode = require("http-status");
const Tesseract = require("tesseract.js");
const fs = require("node:fs");
const db = require("../config/db");
const { BadRequestError, UnautorizedError } = require("../errors");

const dashboard = (req, res, next) => {
  console.log(req.session.user);
  return;
  res.status(statusCode.OK).send("dashboard page");
};

const extractText = (req, res, next) => {
  const user = req.session.user;
  db.query(
    `SELECT * FROM uploads WHERE userId = ?`,
    [user.userId],
    (err, result) => {
      if (err) {
        return next(new BadRequestError("failed to upload"));
      }
      const img = fs.readFileSync(`./uploads/${result[0].file.toString()}`);
      Tesseract.recognize(img, "eng", {})
        .then((d) => {
          return res
            .status(statusCode.CREATED)
            .json({ sucess: true, text: d.data.text });
        })
        .catch((err) => next(new BadRequestError("failed to extract text ")));
    }
  );
};

const uploadFile = (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return next(new UnautorizedError("sign in to upload file"));
  }
  let id = req.session.user.userId.toString(),
    file = req.file.filename.toString();
  db.query(
    `INSERT INTO uploads (\`userId\`, \`file\`) VALUES (?, ?)`,
    [id, file],
    (err, result) => {
      if (err) {
        return next(new BadRequestError("failed to upload"));
      }
      return res.status(statusCode.CREATED).json({
        sucess: true,
        file: { name: req.file.originalname, size: req.file.size },
      });
    }
  );
};

module.exports = {
  extractText,
  dashboard,
  uploadFile,
};
