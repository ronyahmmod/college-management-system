const mongoose = require("mongoose");
const { STUDENT_STATUS } = require("../constants");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
    trim: true,
  },
  rollNumber: {
    type: String,
    unique: true,
    trim: true,
  },
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
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Department is required"],
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  admissionDate: {
    type: Date,
    required: [true, "Admission date is required"],
  },
  idCardIssued: {
    type: Boolean,
    default: false,
  },
  libraryCardIssued: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: Object.values(STUDENT_STATUS),
    default: STUDENT_STATUS.ACTIVE,
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

module.exports = mongoose.model("Student", studentSchema);
