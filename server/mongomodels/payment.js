import mongoose from "mongoose";

let paymentSchema = new mongoose.Schema({
  payeeName: String,
  payerName: String,
  amount: Number,
});

module.exports = mongoose.model("Payment", paymentSchema);
