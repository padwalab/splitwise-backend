import { User } from "../../models/user";
import { Group } from "../../models/group";
import { Membership } from "../../models/membership";
const jwt = require("jsonwebtoken");

export let UserHandler = {};

UserHandler.register = (req, res) => {
  res.status(200).send("success");
};

UserHandler.signin = (params, body, res) => {
  return User.create({
    name: body.name,
    email: body.email,
    phone: body.phone,
    password: body.password,
    profile_photo: body.profile_photo,
    default_currency: body.default_currency,
    time_zone: body.time_zone,
    language: body.language,
  })
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send(error));
};

UserHandler.list = (params, body, res) => {
  return User.find({}, "name email")
    .then((users) =>
      users
        ? res.status(200).send(users)
        : res
            .status(404)
            .send({ status: "ERROR", message: "Failed to fetch user list" })
    )
    .catch((error) => res.status(400).send(error));
};

UserHandler.login = (params, body, res) => {
  return User.findOne({
    email: body.email,
    password: body.password,
  })
    .populate({
      path: "groups",
      populate: { path: "members" },
    })
    .populate({
      path: "groups",
      populate: {
        path: "expenses",
        populate: { path: "notes", populate: { path: "createdBy" } },
      },
    })
    .then((user) => {
      user
        ? jwt.sign({ user }, "secret", (err, token) => {
            res.status(200).send({ user, token });
          })
        : res.status(404).send({ message: "User does not exist" });
    })
    .catch((error) => res.status(401).send(error));
};

UserHandler.update = (params, body, res) => {
  return User.findOneAndUpdate(
    { email: params.userEmail, password: body.password },
    {
      $set: {
        name: body.name,
        phone: body.phone,
        default_currency: body.default_currency,
        time_zone: body.time_zone,
        language: body.language,
      },
    },
    {
      returnOriginal: false,
      new: true,
    }
  )
    .then((user) =>
      user
        ? res.status(200).send(user)
        : res.status(400).send({ status: "ERROR", message: "UserUpdateFailed" })
    )
    .catch((error) => res.status(400).send(error));
};

UserHandler.groups = (params, body, res) => {
  return (
    User.findOne({ _id: params.userId }, "groups")
      .populate({
        path: "groups",
        populate: {
          path: "expenses",
          populate: { path: "notes createdBy", populate: "createdBy" },
        },
      })
      // .populate({
      //   path: "groups",
      //   populate: {
      //     path: "expenses",
      //     populate: { path: "notes", populate: { path: "createdBy" } },
      //   },
      // })
      .populate({
        path: "groups",
        populate: { path: "members" },
      })
      .populate({
        path: "groups",
        populate: {
          path: "payments",
          populate: { path: "payer payee", populate: "member" },
        },
      })
      // .populate({
      //   path: "groups",
      //   populate: {
      //     path: "payments",
      //     populate: { path: "payee", populate: "member" },
      //   },
      // })
      .then((groupdata) => res.status(200).send(groupdata))
      .catch((error) => res.status(404).send(error))
  );
};

UserHandler.getInvites = (params, body, res) => {
  return User.findOne({ _id: params.userId }, "invites")
    .populate("invites")
    .then((invites) => res.status(200).send(invites))
    .catch((error) => res.status(400).send(error));
};

UserHandler.getUserDetails = (params, body, res) => {
  return User.findOne({ email: params.userEmail })
    .populate("groups")
    .then((user) =>
      user
        ? res.status(200).send(user)
        : res.status(404).send({ status: "ERROR", message: "User not found" })
    )
    .catch((error) => res.status(400).send(error));
};

UserHandler.getUserIdFromEmail = (params, body, res) => {
  return User.findOne({ email: params.userEmail }, "email")
    .then((user) =>
      user
        ? res.status(200).send(user)
        : res.status(404).send({ status: "ERROR", message: "User not found" })
    )
    .catch((error) => res.status(400).send(error));
};

UserHandler.invite = (params, body, res) => {
  return User.findOneAndUpdate(
    {
      email: body.email,
    },
    { $addToSet: { invites: params.groupId } }
  )
    .then((user) =>
      res.status(200).send({ status: "SUCCESS", message: "User invited" })
    )
    .catch((error) =>
      res.status(400).send({ status: "ERROR", message: "User Invite Failed" })
    );
};

UserHandler.accept = (params, body, res) => {
  return User.findByIdAndUpdate(
    {
      _id: body.userId,
    },
    {
      $pull: { invites: params.groupId },
      $addToSet: { groups: params.groupId },
    },
    {
      returnOriginal: false,
      new: true,
    }
  )
    .then((user) =>
      Membership.create({ member: body.userId, share: 0 }).then((membership) =>
        Group.findOneAndUpdate(
          { _id: params.groupId },
          {
            $addToSet: { members: membership._id },
          }
        ).then((result) =>
          User.findOne({ id: body.userId }).then((updatedUser) =>
            res.status(200).send(updatedUser)
          )
        )
      )
    )
    .catch((error) => res.status(400).send(error));
};
