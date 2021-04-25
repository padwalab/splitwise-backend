import mongoose from "mongoose";

let PaymentSchema = new mongoose.Schema(
  {
    payer: { type: mongoose.Schema.Types.ObjectId, ref: "Membership" },
    payee: { type: mongoose.Schema.Types.ObjectId, ref: "Membership" },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", PaymentSchema);
