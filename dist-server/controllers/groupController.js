"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupController = void 0;

var _group = require("../models/group");

var _user = require("../models/user");

var _membership = require("../models/membership");

var _kafkaRunner = _interopRequireDefault(require("../kafka/kafkaRunner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var kafkaRunner = new _kafkaRunner["default"]();
var producer = kafkaRunner.producer;
producer.connect();
kafkaRunner.startGroupConsumer();
var GroupController = {};
exports.GroupController = GroupController;

GroupController.create = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "group",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "create",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Group.create({
  //   name: req.body.name,
  // })
  //   .then((group) =>
  //     Membership.create({ member: req.body.userId, share: 0 }).then(
  //       (membership) => {
  //         console.log(membership);
  //         Group.findOneAndUpdate(
  //           { _id: group.id },
  //           { $addToSet: { members: membership._id } },
  //           { returnOriginal: false, new: true }
  //         ).then((groupNew) => {
  //           console.log(groupNew);
  //           User.findOneAndUpdate(
  //             { _id: req.body.userId },
  //             { $addToSet: { groups: groupNew._id } },
  //             { returnOriginal: false, new: true }
  //           ).then((result) => res.status(201).send(groupNew));
  //         });
  //       }
  //     )
  //   )
  //   .catch((error) => res.status(400).send(error));
};

GroupController.get = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "group",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "get",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Group.findOne({ _id: req.params.groupId })
  //   .populate("members")
  //   .populate({ path: "expenses", populate: { path: "createdBy" } })
  //   .populate({
  //     path: "expenses",
  //     populate: { path: "notes", populate: { path: "createdBy" } },
  //   })
  //   .then((group) => res.status(200).send(group))
  //   .catch((error) => res.status(400).send(error));
};

GroupController.members = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "group",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "members",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Group.findOne({ _id: req.params.groupId }, "members")
  //   .populate("members")
  //   .then((members) => res.status(200).send(members))
  //   .catch((error) => res.status(400).send(error));
};

GroupController.memberships = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "group",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "memberships",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Group.findOne({ _id: req.params.groupId }, "members")
  //   .populate("members")
  //   .populate({ path: "members", populate: { path: "member" } })
  //   .then((members) => res.status(200).send(members))
  //   .catch((error) => res.status(400).send(error));
}; // GroupController.leave = (req, res) => {
//     return Group.findOneAndDelete({ _id: req.params.groupId}).then((res) => res.status(200).send({status: "SUCCESS", message: "Exit group succ"}))
// }