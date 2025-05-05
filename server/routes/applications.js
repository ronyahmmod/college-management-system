const express = require("express");
const router = express.Router();
const {
  createApplication,
  reviewApplication,
  getApplicationStatus,
} = require("../controllers/applicationController");

router.post("/", createApplication);
router.get("/:id/status", reviewApplication);
router.put("/:id/review", getApplicationStatus);

module.exports = router;
