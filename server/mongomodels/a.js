import mongoose from "mongoose";

let aSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bs: [{ type: mongoose.Schema.Types.ObjectId, ref: "B" }],
});

export const A = mongoose.model("A", aSchema);
