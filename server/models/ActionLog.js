const mongoose = require("mongoose");

const actionLogSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: ["true", "Admin ID is required"],
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: [true, "Application ID is required"],
  },
  action: {
    type: String,
    enum: ["reviewed", "approved", "rejected", "commented"],
    required: [true, "Action type is required"],
  },
  details: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ActionLog", actionLogSchema);
