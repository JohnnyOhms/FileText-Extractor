const express = require("express");
const statusCode = require("http-status");
const cors = require("cors");
const Router = require("./routes/route");
const notFoundMiddleware = require("./middlewares/notfound");
const uuid = require("uuid");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const DIR = "./uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

app.get("/", (req, res) => {
  res.status(statusCode.OK).send("Backend Server API");
});

app.post("/api/extract", upload.single("imgUpload"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  res.send("upload sucessfully");
});

app.use("/api/v1", Router);
app.use(notFoundMiddleware);

app.listen(9000, () => console.log("running on PORT 9000"));
