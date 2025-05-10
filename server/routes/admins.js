const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  approveAdmin,
  getPendingAdmins,
} = require("../controllers/adminController");
const { authMiddleware, restrictTo } = require("../middleware/auth");

router.post("/register", registerAdmin);
router.post(
  "/approve/:id",
  authMiddleware,
  restrictTo("superuser"),
  approveAdmin
);
router.get(
  "/pending",
  authMiddleware,
  restrictTo("superuser"),
  getPendingAdmins
);

module.exports = router;
