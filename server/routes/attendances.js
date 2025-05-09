const express = require("express");
const router = express.Router();
const { postAttendance } = require("../controllers/attendanceController");

router.post("/", postAttendance);

module.exports = router;
