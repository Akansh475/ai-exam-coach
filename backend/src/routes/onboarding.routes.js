const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
  saveOnboarding,
} = require("../controllers/onboarding.controller");

router.post("/", auth, saveOnboarding);

module.exports = router;
