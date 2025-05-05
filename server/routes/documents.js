const express = require("express");
const router = express.Router();
const { uploadDocument } = require("../controllers/documentController");

router.post("/", uploadDocument);

module.exports = router;
