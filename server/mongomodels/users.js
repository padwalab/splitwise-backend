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

let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    profile_photo: { type: String },
    default_currency: { type: String, default: "USD" },
    time_zone: { type: String, default: "PT" },
    language: { type: String, default: "ENG" },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
