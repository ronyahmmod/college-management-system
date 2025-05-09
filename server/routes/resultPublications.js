const express = require("express");
const router = express.Router();
const {
  createResultPublication,
  publishResult,
} = require("../controllers/resultPublicationController");
const { authMiddleware, restrictTo } = require("../middleware/auth");

router.post("/", authMiddleware, restrictTo("admin"), createResultPublication);
router.patch(
  "/:id/publish",
  authMiddleware,
  restrictTo("admin"),
  publishResult
);

module.exports = router;
