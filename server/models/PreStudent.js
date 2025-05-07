const mongoose = require("mongoose");
const { STUDENT_STATUS } = require("../constants");

const preStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  phone: {
    type: String,
    trim: true,
  },
  applidedDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Department is required"],
  },
  status: {
    type: String,
    enum: Object.values(STUDENT_STATUS),
    default: STUDENT_STATUS.ACTIVE,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PreStudent", preStudentSchema);
