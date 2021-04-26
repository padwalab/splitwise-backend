import { Group } from "../../models/group";
import { User } from "../../models/user";
import { Membership } from "../../models/membership";
import { Payment } from "../../models/payment";

export let MembershipHandler = {};

MembershipHandler.add = (params, body, res) => {
  return Membership.findOneAndUpdate(
    { _id: params.membershipId },
    {
      $inc: { share: body.share },
    },
    { returnOriginal: false, new: true }
  )
    .then((membership) =>
      res.status(200).send({
        status: "SUCCESS",
        message: "Add share successful",
        member: membership,
      })
    )
    .catch((error) =>
      res.status(400).send({ status: "ERROR", message: "Add share failed" })
    );
};

MembershipHandler.exit = (params, body, res) => {
  return Membership.findOneAndDelete({
    _id: params.membershipId,
  })
    .then((membership) =>
      Group.findOneAndUpdate(
        { _id: body.groupId },
        { $pull: { members: params.membershipId } }
      ).then((group) =>
        User.findOneAndUpdate(
          { _id: body.userId },
          { $pull: { groups: body.groupId } }
        ).then((result) =>
          res
            .status(200)
            .send({ status: "SUCCESS", message: "Exit group successful" })
        )
      )
    )
    .catch((error) => res.status(400).send(error));
};

MembershipHandler.userBalance = (params, body, res) => {
  return Membership.findOne({ _id: params.membershipId })
    .populate("member")
    .then((memberDetails) => res.status(200).send(memberDetails))
    .catch((error) => res.status(400).send(error));
};

MembershipHandler.settleUp = (params, body, res) => {
  return Membership.findOneAndUpdate(
    { _id: body.payerId },
    { $inc: { share: body.amount } }
  )
    .then((membership) =>
      Membership.findOneAndUpdate(
        { _id: body.payeeId },
        { $inc: { share: -body.amount } }
      )
    )
    .then(
      (data) =>
        Payment.create({
          payer: body.payerId,
          payee: body.payeeId,
          amount: body.amount,
        }).then((payment) =>
          Group.findOneAndUpdate(
            { _id: body.groupId },
            { $addToSet: { payments: payment._id } }
          ).then((group) =>
            res
              .status(200)
              .send({ status: "SUCCESS", message: "Settle Up successful." })
          )
        )
      // res
      //   .status(200)
      //   .send({ status: "SUCCESS", message: "Settle up successful." })
    )
    .catch((error) => res.status(400).send(error));
};
