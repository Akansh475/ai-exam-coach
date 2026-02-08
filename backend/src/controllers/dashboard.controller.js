const Onboarding = require("../models/Onboarding");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user
    const user = await User.findById(userId).select("name");

    // Get onboarding data
    const onboarding = await Onboarding.findOne({ userId });

    if (!onboarding) {
      return res.status(404).json({
        message: "Onboarding not completed",
      });
    }

    // Calculate days left
    const today = new Date();
    const examDate = new Date(onboarding.examDate);

    const diffTime = examDate - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    res.json({
      name: user.name,
      examName: onboarding.examName,
      daysLeft,
      dailyStudyTime: onboarding.dailyStudyTime,
      examPressure: onboarding.examPressure,

      // Dummy for now (later AI)
      topicsDone: 14,
      topicsTotal: 23,
      progress: 61,

      weakZones: [
        { topic: "FIR Design", percent: 45 },
        { topic: "IIR Filters", percent: 52 },
        { topic: "DFT", percent: 58 },
      ],
    });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);

    res.status(500).json({
      message: "Dashboard error",
    });
  }
};
