const express = require("express");
const router = express.Router();
const { createTeacher } = require("../controllers/teacherController");

router.post("/", createTeacher);

module.exports = router;
