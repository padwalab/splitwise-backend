"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupHandler = void 0;

var _group = require("../../models/group");

var _user = require("../../models/user");

var _membership = require("../../models/membership");

var GroupHandler = {};
exports.GroupHandler = GroupHandler;

GroupHandler.create = function (params, body, res) {
  return _group.Group.create({
    name: body.name
  }).then(function (group) {
    return _membership.Membership.create({
      member: body.userId,
      share: 0
    }).then(function (membership) {
      console.log(membership);

      _group.Group.findOneAndUpdate({
        _id: group.id
      }, {
        $addToSet: {
          members: membership._id
        }
      }, {
        returnOriginal: false,
        "new": true
      }).then(function (groupNew) {
        console.log(groupNew);

        _user.User.findOneAndUpdate({
          _id: body.userId
        }, {
          $addToSet: {
            groups: groupNew._id
          }
        }, {
          returnOriginal: false,
          "new": true
        }).then(function (result) {
          return res.status(201).send(groupNew);
        });
      });
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

GroupHandler.get = function (params, body, res) {
  return _group.Group.findOne({
    _id: params.groupId
  }).populate("members").populate({
    path: "expenses",
    populate: {
      path: "createdBy"
    }
  }).populate({
    path: "expenses",
    populate: {
      path: "notes",
      populate: {
        path: "createdBy"
      }
    }
  }).then(function (group) {
    return res.status(200).send(group);
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

GroupHandler.members = function (params, body, res) {
  return _group.Group.findOne({
    _id: params.groupId
  }, "members").populate("members").then(function (members) {
    return res.status(200).send(members);
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

GroupHandler.memberships = function (params, body, res) {
  return _group.Group.findOne({
    _id: params.groupId
  }, "members").populate("members").populate({
    path: "members",
    populate: {
      path: "member"
    }
  }).then(function (members) {
    return res.status(200).send(members);
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
}; // GroupHandler.leave = (params, body, res) => {
//     return Group.findOneAndDelete({ _id: params.groupId}).then((res) => res.status(200).send({status: "SUCCESS", message: "Exit group succ"}))
// }