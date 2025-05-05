const mongoose = require("mongoose");

const applicationShema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student ID is required"],
  },
  applicationFee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: [true, "Application fee payment is required"],
  },
  status: {
    type: String,
    enum: ["pending", "under_review", "approved", "rejected", "completed"],
    default: "pending",
  },
  remarks: {
    type: String,
    trim: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

applicationShema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Application", applicationShema);
