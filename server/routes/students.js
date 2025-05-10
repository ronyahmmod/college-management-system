const express = require("express");
const router = express.Router();
const {
  applyStudent,
  approveStudent,
  assignRollAndSubjects,
  getPendingStudents,
} = require("../controllers/studentController");
const { authMiddleware, restrictTo } = require("../middleware/auth");

router.post("/apply", applyStudent);
router.post(
  "/approve/:id",
  authMiddleware,
  restrictTo("admin", "superuser"),
  approveStudent
);
router.post(
  "/assign/:id",
  authMiddleware,
  restrictTo("admin", "superuser"),
  assignRollAndSubjects
);
router.get(
  "/pending",
  authMiddleware,
  restrictTo("admin", "superuser"),
  getPendingStudents
);

module.exports = router;
