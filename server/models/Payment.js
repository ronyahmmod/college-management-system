const mongoose = require("mongoose");
const {
  PAYMENT_TYPE,
  PAYMEENT_METHOD,
  PAYMENT_STATUS,
} = require("../constants");

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
  feeCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeeCategory",
    required: [true, "Fee category is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount can not be negative"],
  },
  type: {
    type: String,
    enum: Object.values(PAYMENT_TYPE),
    required: [true, "Payment type is required"],
  },
  transactionId: {
    type: String,
    required: [true, "Transaction ID is required"],
    unique: true,
  },
  paymentMethod: {
    type: String,
    enum: Object.values(PAYMEENT_METHOD),
    required: [true, "Payment method is required"],
  },
  status: {
    type: String,
    enum: Object.values(PAYMENT_STATUS),
    default: PAYMENT_STATUS.PENDING,
  },
  academicYear: {
    type: String,
    required: [true, "Academic year is required"],
    trim: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
