const Onboarding = require("../models/Onboarding");

// Save onboarding
exports.saveOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      examName,
      examDate,
      dailyStudyTime,
      studyMaterial,
      examPressure,
    } = req.body;

    const data = await Onboarding.create({
      userId,
      examName,
      examDate,
      dailyStudyTime,
      studyMaterial,
      examPressure,
    });

    res.status(201).json({
      message: "Onboarding completed",
      data,
    });

  } catch (err) {
  console.error("ONBOARDING ERROR:", err);

  res.status(500).json({
    message: "Onboarding failed",
  });
}


};
