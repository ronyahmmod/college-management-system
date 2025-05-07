const mongoose = require("mongoose");
const { RESULT_TYPE } = require("../constants");

const resultSchema = new mongoose.Schema({
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
  academicYear: {
    type: String,
    required: [true, "Academic year is required"],
    trim: true,
  },
  examType: {
    type: String,
    enum: Object.values(RESULT_TYPE),
    required: [true, "Exam type is required"],
  },
  papers: [
    {
      paperCode: {
        type: String,
        required: [true, "Paper code is required"],
        trim: true,
      },
      marks: {
        type: Number,
        required: [true, "Marks is required"],
        min: [0, "Marks can not be negative"],
      },
    },
  ],
  totalMarks: {
    type: Number,
    required: [true, "Total marks is required"],
    min: [0, "Total marks can not be negative"],
  },
  grade: {
    type: String,
    enum: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"],
    required: [true, "Grade is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Result", resultSchema);
