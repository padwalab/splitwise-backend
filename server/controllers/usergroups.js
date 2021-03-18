const UserGroups = require("../models").UserGroups;
const Groups = require("../models").Groups;
const Expenses = require("../models").Expenses;
const { Sequelize } = require("sequelize");

module.exports = {
  AddUserToGroup(req, res) {
    return UserGroups.create({
      userId: req.body.userId,
      groupId: req.params.groupId,
      share: 0,
    })
      .then((usergroup) => res.status(201).send(usergroup))
      .catch((error) => res.status(400).send(error));
  },
  async GetUserGroup(req, res) {
    let userGroups = [];
    const groups = await UserGroups.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    let i = 0;
    for (i = 0; i < groups.length; i++) {
      const groupDetail = await Groups.findOne({
        include: [{ model: Expenses, as: "expenseItems" }],
        where: {
          id: groups[i].groupId,
        },
      });
      userGroups.push(groupDetail);
    }
    res.status(200).send(userGroups);
  },
  getNumberOfGroupMembers(req, res) {
    return UserGroups.count({
      where: { groupId: req.params.groupId },
    }).then((c) => res.status(200).send(c.toString()));
  },
  getGroupMembers(req, res) {
    return UserGroups.findAll({
      attributes: ["userId"],
      where: {
        groupId: req.params.groupId,
      },
    }).then((members) => res.status(200).send(members));
  },
  updateUserShare(req, res) {
    return UserGroups.update(
      { share: Sequelize.literal(`share + ${req.body.amount}`) },
      { where: { groupId: req.body.groupId, userId: req.body.userId } }
    )
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },
  getUserBalance(req, res) {
    return UserGroups.findOne({
      where: {
        userId: req.body.userId,
        groupId: req.body.groupId,
      },
    }).then((result) => res.status(200).send(result));
  },
  getUserTotalBalance(req, res) {
    return UserGroups.sum("share", {
      where: {
        userId: req.params.userId,
      },
    }).then((sum) => res.status(200).send(sum.toString()));
  },
};
