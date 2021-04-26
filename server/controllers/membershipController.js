import { Group } from "../models/group";
import { User } from "../models/user";
import { Membership } from "../models/membership";
import { Payment } from "../models/payment";
import KafkaRunner from "../kafka/kafkaRunner";

const kafkaRunner = new KafkaRunner();

const producer = kafkaRunner.producer;
producer.connect();

kafkaRunner.startMembershipConsumer();

export let MembershipController = {};

MembershipController.add = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "membership",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "add",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return Membership.findOneAndUpdate(
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

MembershipController.exit = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "membership",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "exit",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return Membership.findOneAndDelete({
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

MembershipController.userBalance = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "membership",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "userBalance",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return Membership.findOne({ _id: req.params.membershipId })
  //   .populate("member")
  //   .then((memberDetails) => res.status(200).send(memberDetails))
  //   .catch((error) => res.status(400).send(error));
};

MembershipController.settleUp = (req, res) => {
  const replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);

  producer.send({
    topic: "membership",
    messages: [
      {
        value: JSON.stringify({
          id: replyId,
          action: "settleUp",
          params: req.params,
          body: req.body,
        }),
      },
    ],
  });
  // return Membership.findOneAndUpdate(
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
