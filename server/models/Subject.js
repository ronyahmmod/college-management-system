const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject name is required"],
    unique: true,
    trim: true,
  },
  code: {
    type: String,
    required: [true, "Subject code is required"],
    unique: true,
    trim: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "Department is required"],
  },
  papers: [
    {
      name: {
        type: String,
        required: [true, "Paper name is required"],
        trim: true,
      },
      code: {
        type: String,
        required: [true, "Paper code is required"],
        trim: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
