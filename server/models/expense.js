import mongoose from "mongoose";

let ExpenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", ExpenseSchema);
