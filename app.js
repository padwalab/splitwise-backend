const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
// var multer = require("multer");

// const DIR = "./upload/";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, "adsf" + fileName);
//   },
// });

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     cb(null, true);
//   },
// });

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./server/routes")(app);

// app.post("/file", upload.single("filedata"), (req, res) => {
//   console.log(req.body);
// });

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Splitwise BackEnd...",
  })
);
module.exports = app;
