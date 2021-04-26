import { Group } from "../../models/group";
import { User } from "../../models/user";
import { Membership } from "../../models/membership";

export let GroupHandler = {};

GroupHandler.create = (params, body, res) => {
  return Group.create({
    name: body.name,
  })
    .then((group) =>
      Membership.create({ member: body.userId, share: 0 }).then(
        (membership) => {
          console.log(membership);
          Group.findOneAndUpdate(
            { _id: group.id },
            { $addToSet: { members: membership._id } },
            { returnOriginal: false, new: true }
          ).then((groupNew) => {
            console.log(groupNew);
            User.findOneAndUpdate(
              { _id: body.userId },
              { $addToSet: { groups: groupNew._id } },
              { returnOriginal: false, new: true }
            ).then((result) => res.status(201).send(groupNew));
          });
        }
      )
    )
    .catch((error) => res.status(400).send(error));
};

GroupHandler.get = (params, body, res) => {
  return Group.findOne({ _id: params.groupId })
    .populate("members")
    .populate({ path: "expenses", populate: { path: "createdBy" } })
    .populate({
      path: "expenses",
      populate: { path: "notes", populate: { path: "createdBy" } },
    })
    .then((group) => res.status(200).send(group))
    .catch((error) => res.status(400).send(error));
};

GroupHandler.members = (params, body, res) => {
  return Group.findOne({ _id: params.groupId }, "members")
    .populate("members")
    .then((members) => res.status(200).send(members))
    .catch((error) => res.status(400).send(error));
};

GroupHandler.memberships = (params, body, res) => {
  return Group.findOne({ _id: params.groupId }, "members")
    .populate("members")
    .populate({ path: "members", populate: { path: "member" } })
    .then((members) => res.status(200).send(members))
    .catch((error) => res.status(400).send(error));
};

// GroupHandler.leave = (params, body, res) => {
//     return Group.findOneAndDelete({ _id: params.groupId}).then((res) => res.status(200).send({status: "SUCCESS", message: "Exit group succ"}))
// }
