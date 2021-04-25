// this.belongsToMany(models.Groups, {
//   through: "UserGroups",
//   as: "groups",
//   foreignKey: "userId",
//   otherKey: "groupId",
// });
// this.hasMany(models.Expenses, {
//   foreignKey: "createdBy",
//   as: "expenses",

import mongoose from "mongoose";

let groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Membership" }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);
