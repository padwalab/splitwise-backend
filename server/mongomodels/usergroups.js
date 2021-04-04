import mongoose from "mongoose";

let usergroupSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  share: { type: Number, default: 0 },
  userconsent: { type: Boolean, default: false },
});

export const UserGroup = mongoose.model("UserGroup", usergroupSchema);
