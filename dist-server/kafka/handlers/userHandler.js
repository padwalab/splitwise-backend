"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserHandler = void 0;

var _user = require("../../models/user");

var _group = require("../../models/group");

var _membership = require("../../models/membership");

var jwt = require("jsonwebtoken");

var UserHandler = {};
exports.UserHandler = UserHandler;

UserHandler.register = function (req, res) {
  res.status(200).send("success");
};

UserHandler.signin = function (params, body, res) {
  return _user.User.create({
    name: body.name,
    email: body.email,
    phone: body.phone,
    password: body.password,
    profile_photo: body.profile_photo,
    default_currency: body.default_currency,
    time_zone: body.time_zone,
    language: body.language
  }).then(function (user) {
    return res.status(201).send(user);
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

UserHandler.list = function (params, body, res) {
  return _user.User.find({}, "name email").then(function (users) {
    return users ? res.status(200).send(users) : res.status(404).send({
      status: "ERROR",
      message: "Failed to fetch user list"
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

UserHandler.login = function (params, body, res) {
  return _user.User.findOne({
    email: body.email,
    password: body.password
  }).populate({
    path: "groups",
    populate: {
      path: "members"
    }
  }).populate({
    path: "groups",
    populate: {
      path: "expenses",
      populate: {
        path: "notes",
        populate: {
          path: "createdBy"
        }
      }
    }
  }).then(function (user) {
    user ? jwt.sign({
      user: user
    }, "secret", function (err, token) {
      res.status(200).send({
        user: user,
        token: token
      });
    }) : res.status(404).send({
      message: "User does not exist"
    });
  })["catch"](function (error) {
    return res.status(401).send(error);
  });
};

UserHandler.update = function (params, body, res) {
  return _user.User.findOneAndUpdate({
    email: params.userEmail,
    password: body.password
  }, {
    $set: {
      name: body.name,
      phone: body.phone,
      default_currency: body.default_currency,
      time_zone: body.time_zone,
      language: body.language
    }
  }, {
    returnOriginal: false,
    "new": true
  }).then(function (user) {
    return user ? res.status(200).send(user) : res.status(400).send({
      status: "ERROR",
      message: "UserUpdateFailed"
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

UserHandler.groups = function (params, body, res) {
  return _user.User.findOne({
    _id: params.userId
  }, "groups").populate({
    path: "groups",
    populate: {
      path: "expenses",
      populate: {
        path: "notes createdBy",
        populate: "createdBy"
      }
    }
  }) // .populate({
  //   path: "groups",
  //   populate: {
  //     path: "expenses",
  //     populate: { path: "notes", populate: { path: "createdBy" } },
  //   },
  // })
  .populate({
    path: "groups",
    populate: {
      path: "members"
    }
  }).populate({
    path: "groups",
    populate: {
      path: "payments",
      populate: {
        path: "payer payee",
        populate: "member"
      }
    }
  }) // .populate({
  //   path: "groups",
  //   populate: {
  //     path: "payments",
  //     populate: { path: "payee", populate: "member" },
  //   },
  // })
  .then(function (groupdata) {
    return res.status(200).send(groupdata);
  })["catch"](function (error) {
    return res.status(404).send(error);
  });
};

UserHandler.getInvites = function (params, body, res) {
  return _user.User.findOne({
    _id: params.userId
  }, "invites").populate("invites").then(function (invites) {
    return res.status(200).send(invites);
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

UserHandler.getUserDetails = function (params, body, res) {
  return _user.User.findOne({
    email: params.userEmail
  }).populate("groups").then(function (user) {
    return user ? res.status(200).send(user) : res.status(404).send({
      status: "ERROR",
      message: "User not found"
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

UserHandler.getUserIdFromEmail = function (params, body, res) {
  return _user.User.findOne({
    email: params.userEmail
  }, "email").then(function (user) {
    return user ? res.status(200).send(user) : res.status(404).send({
      status: "ERROR",
      message: "User not found"
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

UserHandler.invite = function (params, body, res) {
  return _user.User.findOneAndUpdate({
    email: body.email
  }, {
    $addToSet: {
      invites: params.groupId
    }
  }).then(function (user) {
    return res.status(200).send({
      status: "SUCCESS",
      message: "User invited"
    });
  })["catch"](function (error) {
    return res.status(400).send({
      status: "ERROR",
      message: "User Invite Failed"
    });
  });
};

UserHandler.accept = function (params, body, res) {
  return _user.User.findByIdAndUpdate({
    _id: body.userId
  }, {
    $pull: {
      invites: params.groupId
    },
    $addToSet: {
      groups: params.groupId
    }
  }, {
    returnOriginal: false,
    "new": true
  }).then(function (user) {
    return _membership.Membership.create({
      member: body.userId,
      share: 0
    }).then(function (membership) {
      return _group.Group.findOneAndUpdate({
        _id: params.groupId
      }, {
        $addToSet: {
          members: membership._id
        }
      }).then(function (result) {
        return _user.User.findOne({
          id: body.userId
        }).then(function (updatedUser) {
          return res.status(200).send(updatedUser);
        });
      });
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};