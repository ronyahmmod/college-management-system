const mongoose = require("mongoose");
const { PAYMENT_TYPE } = require("../constants");

const feeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Fee category name is required"],
    trim: true,
  },
  type: {
    type: String,
    enum: Object.values(PAYMENT_TYPE),
    required: [true, "Fee type is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Ammount cannot be negative"],
  },
  academicYear: {
    type: String,
    required: [true, "Academic year is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FeeCategory", feeCategorySchema);
