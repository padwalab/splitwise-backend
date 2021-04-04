const Users = require("../models").Users;
const Groups = require("../models").Groups;
const Expenses = require("../models").Expenses;
var count = 0;
import { User } from "../mongomodels/users";

module.exports = {
  create(req, res) {
    return User.create({
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
    // return Users.findOne({
    //   include: [{ model: Groups, as: "groups" }],
    //   where: { email: req.params.email },
    // })
    return (
      User.find({
        email: req.params.email,
      })
        .populate("groups")
        // .exec()
        .then((user) => res.status(200).send(user))
        .catch((error) => res.status(400).send(error))
    );
  },
  updateUserProfile(req, res) {
    // return Users.update(
    //   {
    //     name: req.body.name,
    //     phone: req.body.phone,
    //     profile_photo: req.body.profile_photo,
    //     default_currency: req.body.default_currency,
    //     time_zone: req.body.time_zone,
    //     language: req.body.language,
    //   },
    //   { where: { email: req.params.email }, returning: true, plain: true }
    // )
    User.findOneAndUpdate(
      { email: req.params.email },
      {
        name: req.body.name,
        email: req.params.email,
        phone: req.body.phone,
        profile_photo: req.body.profile_photo,
        default_currency: req.body.default_currency,
        time_zone: req.body.time_zone,
        language: req.body.language,
      },
      { upsert: true, new: true }
    )
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    // return User.findAll({
    //   attributes: { exclude: ["password"] },
    //   include: [
    //     { model: Groups, as: "groups" },
    //     { model: Expenses, as: "expenses" },
    //   ],
    // })
    return (
      User.find()
        // .populate("groups")
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).send(error))
    );
  },
  validateUser(req, res) {
    return User.findOne(
      { email: req.body.email, password: req.body.password },
      "id name email phone profile_photo default_currency time_zone language"
    )
      .then((user) =>
        user
          ? res.status(200).send(user)
          : res.status(404).send({ error: "No such user" })
      )
      .catch((error) => res.status(401).send(error));
  },
  getUserId(req, res) {
    return User.findOne(
      {
        email: req.params.userEmail,
      },
      "id email"
    )
      .then((user) => res.status(200).send(user))
      .catch((error) => res.status(400).send(error));
  },
  getUserNameFromId(req, res) {
    return User.findOne(
      {
        _id: req.params.id,
      },
      "name"
    )
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },
  getUsersList(req, res) {
    // return Users.findAll({
    //   attributes: ["id", "name", "email"],
    // })
    return User.find({}, "id name email").then((users) =>
      res.status(200).send(users)
    );
  },
};
