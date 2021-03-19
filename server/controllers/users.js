const Users = require("../models").Users;
const Groups = require("../models").Groups;
const Expenses = require("../models").Expenses;
const fs = require("fs");
const IMAGES = "/Users/abhijeetpadwal/splitwise";
var count = 0;

module.exports = {
  create(req, res) {
    return Users.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      profile_photo: req.body.profile_photo,
      default_currency: req.body.default_currency,
      time_zone: req.body.time_zone,
      language: req.body.language,
    })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },
  getUser(req, res) {
    return Users.findOne({
      include: [{ model: Groups, as: "groups" }],
      where: { email: req.params.email },
    })
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(400).send(erro));
  },
  updateUserProfile(req, res) {
    // var fs = require("fs");
    // console.log(req.body.profile_photo);
    // var img = req.body.profile_photo.replace(/^data:image\/\w+;base64,/, "");
    // var buf = Buffer.from(img, "binary");
    // let imgname = IMAGES + "/" + count + ".jpg";
    // fs.writeFile(imgname, buf, function (err) {
    //   if (err) throw err;
    // });
    // count += 1;

    return Users.update(
      {
        name: req.body.name,
        phone: req.body.phone,
        profile_photo: req.body.profile_photo,
        default_currency: req.body.default_currency,
        time_zone: req.body.time_zone,
        language: req.body.language,
      },
      { where: { email: req.params.email } }
    )
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return Users.findAll({
      attributes: { exclude: ["password"] },
      include: [
        { model: Groups, as: "groups" },
        { model: Expenses, as: "expenses" },
      ],
    })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },
  validateUser(req, res) {
    return Users.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: [{ model: Groups, as: "groups" }],
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    })
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).send({
            message: "User is unauthorized",
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(401).send(error));
  },
  getUserId(req, res) {
    return Users.findOne({
      attributes: ["id", "email"],
      where: {
        email: req.params.userEmail,
      },
    })
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(400).send(error));
  },
  getUserNameFromId(req, res) {
    return Users.findOne({
      attributes: ["name"],
      where: {
        id: req.params.id,
      },
    })
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },
  getUsersList(req, res) {
    return Users.findAll({
      attributes: ["id", "name", "email"],
    }).then((users) => res.status(200).send(users));
  },
};
