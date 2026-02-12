const express = require("express");
const { getStudyAI } = require("../controllers/aicontroller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/study", getStudyAI);


module.exports = router;
