"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MembershipHandler = void 0;

var _group = require("../../models/group");

var _user = require("../../models/user");

var _membership = require("../../models/membership");

var _payment = require("../../models/payment");

var MembershipHandler = {};
exports.MembershipHandler = MembershipHandler;

MembershipHandler.add = function (params, body, res) {
  return _membership.Membership.findOneAndUpdate({
    _id: params.membershipId
  }, {
    $inc: {
      share: body.share
    }
  }, {
    returnOriginal: false,
    "new": true
  }).then(function (membership) {
    return res.status(200).send({
      status: "SUCCESS",
      message: "Add share successful",
      member: membership
    });
  })["catch"](function (error) {
    return res.status(400).send({
      status: "ERROR",
      message: "Add share failed"
    });
  });
};

MembershipHandler.exit = function (params, body, res) {
  return _membership.Membership.findOneAndDelete({
    _id: params.membershipId
  }).then(function (membership) {
    return _group.Group.findOneAndUpdate({
      _id: body.groupId
    }, {
      $pull: {
        members: params.membershipId
      }
    }).then(function (group) {
      return _user.User.findOneAndUpdate({
        _id: body.userId
      }, {
        $pull: {
          groups: body.groupId
        }
      }).then(function (result) {
        return res.status(200).send({
          status: "SUCCESS",
          message: "Exit group successful"
        });
      });
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

MembershipHandler.userBalance = function (params, body, res) {
  return _membership.Membership.findOne({
    _id: params.membershipId
  }).populate("member").then(function (memberDetails) {
    return res.status(200).send(memberDetails);
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

MembershipHandler.settleUp = function (params, body, res) {
  return _membership.Membership.findOneAndUpdate({
    _id: body.payerId
  }, {
    $inc: {
      share: body.amount
    }
  }).then(function (membership) {
    return _membership.Membership.findOneAndUpdate({
      _id: body.payeeId
    }, {
      $inc: {
        share: -body.amount
      }
    });
  }).then(function (data) {
    return _payment.Payment.create({
      payer: body.payerId,
      payee: body.payeeId,
      amount: body.amount
    }).then(function (payment) {
      return _group.Group.findOneAndUpdate({
        _id: body.groupId
      }, {
        $addToSet: {
          payments: payment._id
        }
      }).then(function (group) {
        return res.status(200).send({
          status: "SUCCESS",
          message: "Settle Up successful."
        });
      });
    });
  } // res
  //   .status(200)
  //   .send({ status: "SUCCESS", message: "Settle up successful." })
  )["catch"](function (error) {
    return res.status(400).send(error);
  });
};