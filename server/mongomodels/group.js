import mongoose from "mongoose";

let groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const Group = mongoose.model("Group", groupSchema);
