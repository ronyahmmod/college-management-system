const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student ID is required"],
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: [true, "Application ID is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount can not be negative"],
  },
  type: {
    type: String,
    enum: ["application_fee", "admission_fee"],
    required: [true, "Payment type is required"],
  },
  transactionId: {
    type: String,
    required: [true, "Transaction ID is required"],
    unique: true,
  },
  paymentMethod: {
    type: String,
    enum: ["bkash", "rocket", "nagad", "bank"],
    required: [true, "Payment method is required"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
