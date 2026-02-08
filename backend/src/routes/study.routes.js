const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const { completeTask } = require("../controllers/study.controller");

router.post("/complete", auth, completeTask);

module.exports = router;
