const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const {
  getPlan,
  generatePlan,
} = require("../controllers/planner.controller");

router.get("/", auth, getPlan);
router.post("/generate", auth, generatePlan);

module.exports = router;
