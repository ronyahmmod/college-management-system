const mongoose = require("mongoose");
const { RESULT_TYPE, RESULT_STATUS } = require("../constants");
const resultPublicationSchema = new mongoose.Schema({
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
  publicationDate: {
    type: Date,
    required: [true, "Publication date is required"],
  },
  status: {
    type: String,
    enum: Object.values(RESULT_STATUS),
    default: RESULT_STATUS.DRAFT,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: [true, "Creator ID is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ResultPublication", resultPublicationSchema);
