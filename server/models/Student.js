const mongoose = require("mongoose");

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
    type: String,
    required: [true, "Department is required"],
    enum: ["CSE", "BBA", "EEE", "English", "Others"],
  },
  subjects: [
    {
      type: String,
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
    enum: ["active", "inactive"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
