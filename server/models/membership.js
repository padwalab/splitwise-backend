import mongoose from "mongoose";

let MmeberShipSchema = new mongoose.Schema(
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    share: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Membership = mongoose.model("Membership", MmeberShipSchema);
