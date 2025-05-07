const express = require("express");
const router = express.Router();
const { postResult } = require("../controllers/resultController");

router.post("/", postResult);

module.exports = router;
