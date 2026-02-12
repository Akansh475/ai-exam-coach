const { generateAI } = require("../services/aiService");
const { studyPrompt } = require("../prompts/studyPrompt");
const AICache = require("../models/AICache");

const getStudyAI = async (req, res) => {
  try {
    const { exam, subject, topic } = req.body;

    // 1️⃣ Check cache first
    const cached = await AICache.findOne({ exam, subject, topic });

    if (cached) {
      return res.json({
        success: true,
        data: cached.response,
        cached: true,
      });
    }

    // 2️⃣ Generate via AI
    const prompt = studyPrompt({ exam, subject, topic });
    const result = await generateAI(prompt);

    // 3️⃣ Save to DB
    await AICache.create({
      exam,
      subject,
      topic,
      response: result,
    });

    res.json({
      success: true,
      data: result,
      cached: false,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "AI failed" });
  }
};

module.exports = { getStudyAI };
