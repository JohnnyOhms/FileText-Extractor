const statusCode = require("http-status");
const Tesseract = require("tesseract.js");
const fs = require("node:fs");
const db = require("../config/db");
const { BadRequestError } = require("../errors");

const dashboard = (req, res, next) => {
  console.log(req.user);
  res.status(statusCode.OK).send("dashboard page");
};

const extractText = (req, res, next) => {
  db.query(
    `SELECT * FROM uploads WHERE userId = ?`,
    [req.user.userId],
    (err, result) => {
      if (err) {
        return next(new BadRequestError("failed to upload"));
      }
      const img = fs.readFileSync(`./uploads/${result[0].toString()}`);
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
  db.query(
    `INSERT INTO upoads ('userId', 'file') VALUES (?, ?)`,
    [req.user.userId, req.file.filename],
    (err, result) => {
      if (err) {
        next(new BadRequestError("failed to upload"));
      }
      return res.status(statusCode.CREATED).json({
        sucess: true,
        file: { name: req.file.originalname, size: req.file.size },
      });
    }
  );
  res.send("upload sucessfully");
};

module.exports = {
  extractText,
  dashboard,
  uploadFile,
};
