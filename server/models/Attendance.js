const mongoose = require("mongoose");
const { ATTENDANCE_STATUS } = require("../constants");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student ID is required"],
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: [true, "Subject ID is required"],
  },
  paperCode: {
    type: String,
    required: [true, "Paper code is required"],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: [true, "Teacher ID is required"],
  },
  academicYear: {
    type: String,
    trim: true,
    required: [true, "Academic year is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: Object.values(ATTENDANCE_STATUS),
    required: [true, "Attendance status is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
