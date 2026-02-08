const { generateAI } = require("../services/aiService");
const { studyPrompt } = require("../prompts/studyPrompt");

const getStudyAI = async (req, res) => {
  try {
    const { exam, subject, topic } = req.body;

    const prompt = studyPrompt({
      exam,
      subject,
      topic,
    });

    const result = await generateAI(prompt);

    res.json({ success: true, data: result });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "AI failed",
    });
  }
};

module.exports = { getStudyAI };
