import mongoose from "mongoose";

let bSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const B = mongoose.model("B", bSchema);
