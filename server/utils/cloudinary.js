const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  // Placeholder: Implement Cloudinary upload logic
  return { secure_url: "https://example.com/document.pdf" };
};

module.exports = { uploadToCloudinary };
