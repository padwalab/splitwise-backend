const UserGroups = require("../models").UserGroups;

module.exports = {
  AddUserToGroup(req, res) {
    return UserGroups.create({
      userId: req.body.userId,
      groupId: req.params.groupId,
    })
      .then((usergroup) => res.status(201).send(usergroup))
      .catch((error) => res.status(400).send(error));
  },
  GetUserGroup(req, res) {
    return UserGroups.findAll({
      where: {
        userId: req.params.userId,
      },
    }).then((groups) => res.status(200).send(groups));
  },
};
