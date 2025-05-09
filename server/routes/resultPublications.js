const express = require("express");
const router = express.Router();
const {
  createResultPublication,
  publishResult,
} = require("../controllers/resultPublicationController");

router.post("/", createResultPublication);
router.patch("/:id/publish", publishResult);

module.exports = router;
