const UserGroups = require("../models").UserGroups;
const Groups = require("../models").Groups;
const Expenses = require("../models").Expenses;
const Payments = require("../models").Payments;
const { Sequelize } = require("sequelize");

module.exports = {
  getPayment(req, res) {
    Payments.findAll({
      where: {
        groupToId: req.params.groupId,
      },
    })
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },
  AddUserToGroup(req, res) {
    return UserGroups.create({
      userId: req.body.userId,
      groupId: req.params.groupId,
      share: 0,
      userconsent: true,
    })
      .then((usergroup) => res.status(201).send(usergroup))
      .catch((error) => res.status(400).send(error));
  },
  AddMemberToGroup(req, res) {
    return UserGroups.create({
      userId: req.body.userId,
      groupId: req.params.groupId,
      share: 0,
      userconsent: false,
    })
      .then((usergroup) => res.status(201).send(usergroup))
      .catch((error) => res.status(400).send(error));
  },
  async GetUserGroup(req, res) {
    let userGroups = [];
    const groups = await UserGroups.findAll({
      where: {
        userId: req.params.userId,
        userconsent: true,
      },
    });
    let i = 0;
    for (i = 0; i < groups.length; i++) {
      const groupDetail = await Groups.findOne({
        include: [
          { model: Expenses, as: "expenseItems" },
          { model: Payments, as: "payments" },
        ],
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
        userconsent: true,
      },
    }).then((members) => res.status(200).send(members));
  },
  updateUserShare(req, res) {
    return UserGroups.update(
      { share: Sequelize.literal(`share + ${req.body.amount}`) },
      {
        where: {
          groupId: req.body.groupId,
          userId: req.body.userId,
          userconsent: true,
        },
      }
    )
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },
  async settleUpUser(req, res) {
    const responses = [];
    await UserGroups.update(
      { share: Sequelize.literal(`share + ${req.body.amount}`) },
      {
        where: {
          groupId: req.params.groupId,
          userId: req.body.userId,
          userconsent: true,
        },
      }
    )
      .then((result) => Payments)
      .catch((error) => res.status(400).send(error));
    return UserGroups.update(
      { share: Sequelize.literal(`share - ${req.body.amount}`) },
      {
        where: {
          groupId: req.params.groupId,
          userId: req.body.memberId,
          userconsent: true,
        },
      }
    )
      .then((result) => {
        Payments.create({
          payeeName: req.body.userId,
          payerName: req.body.memberId,
          groupToId: req.params.groupId,
          amount: req.body.amount,
        });
        responses.push(result);
        res.status(200).send(responses);
      })
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
  getUserInvitations(req, res) {
    return UserGroups.findAll({
      where: {
        userId: req.params.userId,
        userconsent: false,
      },
    })
      .then((userGroups) => res.status(200).send(userGroups))
      .catch((error) => res.status(400).send(error));
  },
  acceptGroupInvitation(req, res) {
    return UserGroups.update(
      { userconsent: true },
      {
        where: {
          userId: req.body.userId,
          groupId: req.params.groupId,
        },
      }
    )
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },
  exitGroup(req, res) {
    return UserGroups.destroy({
      where: {
        userId: req.body.userId,
        groupId: req.params.groupId,
      },
    })
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },
};
