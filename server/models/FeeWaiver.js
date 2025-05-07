const mongoose = require("mongoose");

const feeWaiverSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student ID is required"],
  },
  feeCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeeCategory",
    required: [true, "Fee category is required"],
  },
  amount: {
    type: Number,
    required: [true, "Waiver ammount is required"],
    min: [0, "Waiver amount can not be negative"],
  },
  reason: {
    type: String,
    required: [true, "Reason for waiver is required"],
    trim: true,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "Approved ID is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("FeeWaiver", feeWaiverSchema);
