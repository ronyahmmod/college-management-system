const express = require("express");
const router = express.Router();
const {
  postResult,
  getResultSheet,
} = require("../controllers/resultController");
const { authMiddleware, restrictTo } = require("../middleware/auth");

router.post("/", authMiddleware, restrictTo("teacher"), postResult);
router.get(
  "/sheet/:studentId",
  authMiddleware,
  restrictTo("student"),
  getResultSheet
);

module.exports = router;
