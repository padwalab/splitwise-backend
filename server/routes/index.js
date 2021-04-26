import express from "express";

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "World" });
});

router.post("/api", (req, res, next) => {
  res.status(200).send("success");
});

export default router;
