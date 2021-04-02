const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
let Cat = require("./server/mongomodels/Cat");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./server/routes")(app);

app.get("/cats", (req, res) => {
  // const kitty = new Cat({ name: "bob" });
  // kitty
  //   .save()
  //   .then(() => console.log("Cat createsd"))
  //   .catch((error) => console.log(error));
  Cat.find({ name: "bob" })
    .then((doc) => res.status(200).send(doc))
    .catch((error) => console.log(error));
  // res.status(200).send(kitty);
});
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the Splitwise BackEnd...",
  })
);
module.exports = app;
