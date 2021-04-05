import mongoose from "mongoose";

let groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [
      {
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        share: { type: Number, default: 0 },
        userConsent: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);
