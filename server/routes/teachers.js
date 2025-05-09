const express = require("express");
const router = express.Router();
const { createTeacher } = require("../controllers/teacherController");
const { authMiddleware, restrictTo } = require("../middleware/auth");

router.post("/", authMiddleware, restrictTo("admin"), createTeacher);

module.exports = router;
