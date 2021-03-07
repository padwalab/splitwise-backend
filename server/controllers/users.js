const Users = require("../models").Users;

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
};
