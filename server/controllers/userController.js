import { User } from "../models/user";
import { Group } from "../models/group";
import { Membership } from "../models/membership";
import KafkaRunner from "../kafka/kafkaRunner";

const kafkaRunner = new KafkaRunner();

const producer = kafkaRunner.producer;
producer.connect();

kafkaRunner.startUserConsumer();

export let UserController = {};

UserController.register = (req, res) => {
  res.status(200).send("success");
};

UserController.signin = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "signin",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.create({
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone,
  //   password: req.body.password,
  //   profile_photo: req.body.profile_photo,
  //   default_currency: req.body.default_currency,
  //   time_zone: req.body.time_zone,
  //   language: req.body.language,
  // })
  //   .then((user) => res.status(201).send(user))
  //   .catch((error) => res.status(400).send(error));
};

UserController.list = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "list",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.find({}, "name email")
  //   .then((users) =>
  //     users
  //       ? res.status(200).send(users)
  //       : res
  //           .status(404)
  //           .send({ status: "ERROR", message: "Failed to fetch user list" })
  //   )
  //   .catch((error) => res.status(400).send(error));
};

UserController.login = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "login",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.findOne({
  //   email: req.body.email,
  //   password: req.body.password,
  // })
  //   .populate({
  //     path: "groups",
  //     populate: { path: "members" },
  //   })
  //   .populate({
  //     path: "groups",
  //     populate: {
  //       path: "expenses",
  //       populate: { path: "notes", populate: { path: "createdBy" } },
  //     },
  //   })
  //   .then((user) => {
  //     user
  //       ? res.status(200).send(user)
  //       : res.status(404).send({ message: "User does not exist" });
  //   })
  //   .catch((error) => res.status(401).send(error));
};

UserController.update = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "update",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.findOneAndUpdate(
  //   { email: req.params.userEmail, password: req.body.password },
  //   {
  //     $set: {
  //       name: req.body.name,
  //       phone: req.body.phone,
  //       default_currency: req.body.default_currency,
  //       time_zone: req.body.time_zone,
  //       language: req.body.language,
  //     },
  //   },
  //   {
  //     returnOriginal: false,
  //     new: true,
  //   }
  // )
  //   .then((user) =>
  //     user
  //       ? res.status(200).send(user)
  //       : res.status(400).send({ status: "ERROR", message: "UserUpdateFailed" })
  //   )
  //   .catch((error) => res.status(400).send(error));
};

UserController.groups = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "groups",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return (
  //   User.findOne({ _id: req.params.userId }, "groups")
  //     .populate({
  //       path: "groups",
  //       populate: {
  //         path: "expenses",
  //         populate: { path: "notes createdBy", populate: "createdBy" },
  //       },
  //     })
  //     // .populate({
  //     //   path: "groups",
  //     //   populate: {
  //     //     path: "expenses",
  //     //     populate: { path: "notes", populate: { path: "createdBy" } },
  //     //   },
  //     // })
  //     .populate({
  //       path: "groups",
  //       populate: { path: "members" },
  //     })
  //     .populate({
  //       path: "groups",
  //       populate: {
  //         path: "payments",
  //         populate: { path: "payer payee", populate: "member" },
  //       },
  //     })
  //     // .populate({
  //     //   path: "groups",
  //     //   populate: {
  //     //     path: "payments",
  //     //     populate: { path: "payee", populate: "member" },
  //     //   },
  //     // })
  //     .then((groupdata) => res.status(200).send(groupdata))
  //     .catch((error) => res.status(404).send(error))
  // );
};

UserController.getInvites = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "getInvites",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.findOne({ _id: req.params.userId }, "invites")
  //   .populate("invites")
  //   .then((invites) => res.status(200).send(invites))
  //   .catch((error) => res.status(400).send(error));
};

UserController.getUserDetails = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "getUserDetails",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.findOne({ email: req.params.userEmail })
  //   .populate("groups")
  //   .then((user) =>
  //     user
  //       ? res.status(200).send(user)
  //       : res.status(404).send({ status: "ERROR", message: "User not found" })
  //   )
  //   .catch((error) => res.status(400).send(error));
};

UserController.getUserIdFromEmail = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "getUserIdFromEmail",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.findOne({ email: req.params.userEmail }, "email")
  //   .then((user) =>
  //     user
  //       ? res.status(200).send(user)
  //       : res.status(404).send({ status: "ERROR", message: "User not found" })
  //   )
  //   .catch((error) => res.status(400).send(error));
};

UserController.invite = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "invite",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.findOneAndUpdate(
  //   {
  //     email: req.body.email,
  //   },
  //   { $addToSet: { invites: req.params.groupId } }
  // )
  //   .then((user) =>
  //     res.status(200).send({ status: "SUCCESS", message: "User invited" })
  //   )
  //   .catch((error) =>
  //     res.status(400).send({ status: "ERROR", message: "User Invite Failed" })
  //   );
};

UserController.accept = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "user",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "accept",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return User.findByIdAndUpdate(
  //   {
  //     _id: req.body.userId,
  //   },
  //   {
  //     $pull: { invites: req.params.groupId },
  //     $addToSet: { groups: req.params.groupId },
  //   },
  //   {
  //     returnOriginal: false,
  //     new: true,
  //   }
  // )
  //   .then((user) =>
  //     Membership.create({ member: req.body.userId, share: 0 }).then(
  //       (membership) =>
  //         Group.findOneAndUpdate(
  //           { _id: req.params.groupId },
  //           {
  //             $addToSet: { members: membership._id },
  //           }
  //         ).then((result) =>
  //           User.findOne({ id: req.body.userId }).then((updatedUser) =>
  //             res.status(200).send(updatedUser)
  //           )
  //         )
  //     )
  //   )
  //   .catch((error) => res.status(400).send(error));
};
