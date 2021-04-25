"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MembershipController = void 0;

var _group = require("../models/group");

var _user = require("../models/user");

var _membership = require("../models/membership");

var _payment = require("../models/payment");

var _kafkaRunner = _interopRequireDefault(require("../kafka/kafkaRunner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var kafkaRunner = new _kafkaRunner["default"]();
var producer = kafkaRunner.producer;
producer.connect();
kafkaRunner.startMembershipConsumer();
var MembershipController = {};
exports.MembershipController = MembershipController;

MembershipController.add = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "membership",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "add",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Membership.findOneAndUpdate(
  //   { _id: req.params.membershipId },
  //   {
  //     $inc: { share: req.body.share },
  //   },
  //   { returnOriginal: false, new: true }
  // )
  //   .then((membership) =>
  //     res.status(200).send({
  //       status: "SUCCESS",
  //       message: "Add share successful",
  //       member: membership,
  //     })
  //   )
  //   .catch((error) =>
  //     res.status(400).send({ status: "ERROR", message: "Add share failed" })
  //   );
};

MembershipController.exit = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "membership",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "exit",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Membership.findOneAndDelete({
  //   _id: req.params.membershipId,
  // })
  //   .then((membership) =>
  //     Group.findOneAndUpdate(
  //       { _id: req.body.groupId },
  //       { $pull: { members: req.params.membershipId } }
  //     ).then((group) =>
  //       User.findOneAndUpdate(
  //         { _id: req.body.userId },
  //         { $pull: { groups: req.body.groupId } }
  //       ).then((result) =>
  //         res
  //           .status(200)
  //           .send({ status: "SUCCESS", message: "Exit group successful" })
  //       )
  //     )
  //   )
  //   .catch((error) => res.status(400).send(error));
};

MembershipController.userBalance = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "membership",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "userBalance",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Membership.findOne({ _id: req.params.membershipId })
  //   .populate("member")
  //   .then((memberDetails) => res.status(200).send(memberDetails))
  //   .catch((error) => res.status(400).send(error));
};

MembershipController.settleUp = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "membership",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "settleUp",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Membership.findOneAndUpdate(
  //   { _id: req.body.payerId },
  //   { $inc: { share: req.body.amount } }
  // )
  //   .then((membership) =>
  //     Membership.findOneAndUpdate(
  //       { _id: req.body.payeeId },
  //       { $inc: { share: -req.body.amount } }
  //     )
  //   )
  //   .then(
  //     (data) =>
  //       Payment.create({
  //         payer: req.body.payerId,
  //         payee: req.body.payeeId,
  //         amount: req.body.amount,
  //       }).then((payment) =>
  //         Group.findOneAndUpdate(
  //           { _id: req.body.groupId },
  //           { $addToSet: { payments: payment._id } }
  //         ).then((group) =>
  //           res
  //             .status(200)
  //             .send({ status: "SUCCESS", message: "Settle Up successful." })
  //         )
  //       )
  //     // res
  //     //   .status(200)
  //     //   .send({ status: "SUCCESS", message: "Settle up successful." })
  //   )
  //   .catch((error) => res.status(400).send(error));
};