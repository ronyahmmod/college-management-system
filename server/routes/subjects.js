const express = require("express");
const router = express.Router();
const {
  createSubject,
  getSubjects,
} = require("../controllers/subjectController");
const { authMiddleware, restrictTo } = require("../middleware/auth");

router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "superuser"),
  createSubject
);
router.get("/", authMiddleware, restrictTo("admin", "superuser"), getSubjects);

module.exports = router;
