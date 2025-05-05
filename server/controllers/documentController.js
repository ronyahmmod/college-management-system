const Document = require("../models/Document");
const { uploadToCloudinary } = require("../utils/cloudinary");

const uploadDocument = async (req, res) => {
  try {
    const { applicationId, type } = req.body;
    const file = req.file; // Assuming file is sent via multipart form-data

    // Upload to Cloudinary
    const result = await uploadToCloudinary(file);

    const document = new Document({
      applicationId: applicationId,
      type,
      url: result.secure_url,
    });
    await document.save();
    return res.status(201).json(document);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { uploadDocument };
