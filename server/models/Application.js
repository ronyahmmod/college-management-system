const mongoose = require("mongoose");
const { APPLICATION_STATUS } = require("../constants");

const applicationShema = new mongoose.Schema({
  preStudent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PreStudent",
    required: [true, "PreStudent ID is required"],
  },
  applicationFee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: [true, "Application fee payment is required"],
  },
  status: {
    type: String,
    enum: Object.values(APPLICATION_STATUS),
    default: APPLICATION_STATUS.PENDING,
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
