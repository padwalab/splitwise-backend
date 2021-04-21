// const Groups = require("../models").Groups;
// const Expenses = require("../models").Expenses;
// const UserGroups = require("../models").UserGroups;
// const Users = require("../models").Users;
import { Group } from "../mongomodels/group";
import { User } from "../mongomodels/users";
import { UserGroup } from "../mongomodels/usergroups";
module.exports = {
  create(req, res) {
    // return Groups.create({
    //   name: req.body.name,
    // })
    return (
      Group.create({
        name: req.body.name,
        users: req.body.members,
      })
        // .then((group) => res.status(201).send(group))
        .then((group) => {
          group.users.forEach((user) => {
            console.log(user);
            User.updateOne(
              { _id: user.memberId },
              { $push: { groups: group._id } }
            )
              .then((result) => console.log(result))
              .catch((error) => console.log(error));
          });
          res.status(201).send(group);
        })
        .catch((error) => res.status(400).send(error))
    );
  },
  createAddUsers(req, res) {
    return Group.create({
      name: req.body.name,
    })
      .then((group) =>
        req.body.members.forEach(async (member) => {
          console.log(member);
          await User.find({ email: member }, "id")
            .then(async (user) => {
              console.log(user);
              await UserGroup.create({
                groupId: group.id,
                userId: user.toJSON().id,
              })
                .then(async (usergroup) => {
                  await User.updateOne(
                    { email: member },
                    { $push: { groups: group._id } }
                  );
                  res.status(200).send(usergroup);
                })
                .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
        })
      )
      .catch((error) => res.status(400).send(error));
  },
  // addMember(req, res){
  //   return Groups.addUsers(Users.findOne({where: {email: req.body.email}}))
  // }
  list(req, res) {
    // return Groups.findAll({
    //   include: [{ model: Expenses, as: "expenseItems" }],
    //   include: [{ model: Users, as: "users" }],
    // })
    return Group.find()
      .then((groups) => res.status(200).send(groups))
      .catch((error) => res.status(400).send(error));
  },
  getGroup(req, res) {
    // return Groups.findOne({
    //   include: [
    //     { model: Expenses, as: "expenseItems" },
    //     { model: Users, as: "users" },
    //   ],
    //   where: {
    //     id: req.params.groupId,
    //   },
    // })
    return Group.find({
      _id: req.params.groupId,
    })
      .then((resultGroup) => res.status(200).send(resultGroup))
      .catch((error) => res.status(404).send(error));
  },
};
