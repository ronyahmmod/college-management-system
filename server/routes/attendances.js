const express = require("express");
const router = express.Router();
const { postAttendance } = require("../controllers/attendanceController");
const { authMiddleware, restrictTo } = require("../middleware/auth");

router.post("/", authMiddleware, restrictTo("teacher"), postAttendance);

module.exports = router;
