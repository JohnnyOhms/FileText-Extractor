const statusCode = require("http-status");
const Tesseract = require("tesseract.js");
const fs = require("node:fs");
const db = require("../config/db");
const uuid = require("uuid");
const { BadRequestError, UnauthorizedError } = require("../errors");

const extractText = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new UnauthorizedError("unauthorized to extract"));
  }
  const id = user.userId;
  db.query(`SELECT * FROM uploads WHERE userId = ?`, [id], (err, result) => {
    if (err) {
      return next(new BadRequestError("failed to upload"));
    }
    const img = fs.readFileSync(`./uploads/${result[0].file}`);
    Tesseract.recognize(img, "eng", {})
      .then((d) => {
        return res
          .status(statusCode.CREATED)
          .json({ success: true, text: d.data.text });
      })
      .catch((err) => next(new BadRequestError("failed to extract text ")));
  });
};

const uploadFile = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new UnauthorizedError("sign in to upload file"));
  }
  let id = req.user.userId.toString(),
    file = req.file.filename.toString();
  db.query("SELECT * FROM uploads WHERE userId = ?", [id], (err, result) => {
    if (err) {
      return next(new BadRequestError("failed to load data"));
    }
    if (result.length <= 0) {
      return db.query(
        `INSERT INTO uploads (\`userId\`, \`file\`) VALUES (?, ?)`,
        [id, file],
        (err, result) => {
          if (err) {
            return next(new BadRequestError("failed to upload"));
          }
          return res.status(statusCode.CREATED).json({
            success: true,
            file: { name: req.file.originalname, size: req.file.size },
          });
        }
      );
    }
    db.query(
      "UPDATE uploads SET file = ? WHERE userId = ?",
      [file, id],
      (err, result) => {
        if (err) {
          return next(new BadRequestError("failed to upload"));
        }
        return res.status(statusCode.CREATED).json({
          success: true,
          file: { name: req.file.originalname, size: req.file.size },
        });
      }
    );
  });
};

const getAllText = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new UnauthorizedError("unauthorized to load data"));
  }
  const userId = user.userId;
  db.query(
    "SELECT * FROM savedText WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        return next(new BadRequestError("failed to load data"));
      }
      if (result <= 0) {
        return res
          .status(statusCode.OK)
          .json({ success: true, mssg: "no saved text found" });
      }
      return res.status(statusCode.OK).json({ sucess: true, data: result[0] });
    }
  );
};

const saveText = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new UnauthorizedError("unauthorized to save text"));
  }
  if (!req.body) {
    return next(new BadRequestError("provide text to save"));
  }
  const { text, date } = req.body;
  const userId = user.userId;
  const textId = uuid();
  db.query(
    `INSERT INTO savedText (\`userId\`, \`text\`, \'DOC\', \'textId\') VALUES (?, ?, ?, ?)`,
    [userId, text, date, textId],
    (err, result) => {
      if (err) {
        return next(new BadRequestError("failed to add data"));
      }
      return res
        .status(statusCode.ACCEPTED)
        .json({ success: true, mssg: "Text saved successfully" });
    }
  );
};

const deleteText = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new UnauthorizedError("unauthorized to save text"));
  }
  if (!req.body) {
    return next(new BadRequestError("provide textId to delete"));
  }
  const userId = user.userId;
  const { textId } = req.body;
  db.query(
    "DELETE FROM savedText WHERE userId = ? AND textId = ?",
    [userId, textId],
    (err, result) => {
      if (err) {
        return next(new BadRequestError("failed to delete data"));
      }
      return res
        .status(statusCode.ACCEPTED)
        .json({ success: true, mssg: `${textId} deleted succesfully` });
    }
  );
};

const deleteAllText = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new UnauthorizedError("unauthorized to save text"));
  }
  const userId = user.userId;
  db.query(
    "DELETE FROM savedText WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        return next(new BadRequestError("failed to delete data"));
      }
      return res
        .status(statusCode.OK)
        .json({ success: true, mssg: "all data deleted successfully" });
    }
  );
};

module.exports = {
  extractText,
  uploadFile,
  getAllText,
  saveText,
  deleteText,
  deleteAllText,
};
