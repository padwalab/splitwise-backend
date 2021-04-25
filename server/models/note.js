import mongoose from "mongoose";

let NoteSchema = new mongoose.Schema(
  {
    note: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", NoteSchema);
