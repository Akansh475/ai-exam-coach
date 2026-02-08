const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const { getTest } = require("../controllers/test.controller");

router.get("/start", auth, getTest);

module.exports = router;
