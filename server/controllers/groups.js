const Groups = require("../models").Groups;
const Expenses = require("../models").Expenses;
const UserGroups = require("../models").UserGroups;
const Users = require("../models").Users;
module.exports = {
  create(req, res) {
    return Groups.create({
      name: req.body.name,
    })
      .then((group) => res.status(201).send(group))
      .catch((error) => res.status(400).send(error));
  },
  createAddUsers(req, res) {
    return Groups.create({
      name: req.body.name,
    })
      .then((group) =>
        req.body.members.forEach((member) =>
          Users.findOne({ attributes: ["id"], where: { email: member } })
            .then((user) =>
              UserGroups.create({ groupId: group.id, userId: user.id })
                .then((usergroup) => res.status(200).send(usergroup))
                .catch((error) => res.status(400).send(error))
            )
            .catch((error) => res.status(400).send(error))
        )
      )
      .catch((error) => res.status(400).send(error));
  },
  // addMember(req, res){
  //   return Groups.addUsers(Users.findOne({where: {email: req.body.email}}))
  // }
  list(req, res) {
    return Groups.findAll({
      include: [{ model: Expenses, as: "expenseItems" }],
      include: [{ model: Users, as: "users" }],
    })
      .then((groups) => res.status(200).send(groups))
      .catch((error) => res.status(400).send(error));
  },
  getGroup(req, res) {
    return Groups.findOne({
      include: [
        { model: Expenses, as: "expenseItems" },
        { model: Users, as: "users" },
      ],
      where: {
        id: req.params.groupId,
      },
    }).then((resultGroup) => res.status(200).send(resultGroup));
  },
};
