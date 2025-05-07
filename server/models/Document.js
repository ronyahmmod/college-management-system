const mongoose = require("mongoose");
const { DOCUMENT_TYPE } = require("../constants");

const documentShema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: [true, "Application ID is required"],
  },
  title: {
    type: String,
    required: [true, "Document must have a title"],
  },
  type: {
    type: String,
    enum: Object.values(DOCUMENT_TYPE),
    recuired: [true, "Document type is required"],
  },
  url: {
    type: String,
    required: [true, "Document URL is required"],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentShema);
