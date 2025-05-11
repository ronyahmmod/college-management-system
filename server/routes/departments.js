const express = require("express");
const router = express.Router();
const {
  createDepartment,
  getDepartments,
} = require("../controllers/departmentController");
const { authMiddleware, restrictTo } = require("../middleware/auth");

router.post(
  "/",
  authMiddleware,
  restrictTo("admin", "superuser"),
  createDepartment
);
router.get(
  "/",
  authMiddleware,
  restrictTo("admin", "superuser"),
  getDepartments
);

module.exports = router;
