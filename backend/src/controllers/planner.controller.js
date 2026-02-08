const Planner = require("../models/Planner");
const Onboarding = require("../models/Onboarding");

// Get existing plan
exports.getPlan = async (req, res) => {
  try {
    const userId = req.user.id;

    const plan = await Planner.findOne({ userId });

    if (!plan) {
      return res.status(404).json({
        message: "No plan found",
      });
    }

    res.json(plan);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Planner error" });
  }
};

// Generate new plan (dummy for now)
exports.generatePlan = async (req, res) => {
  try {
    const userId = req.user.id;

    const onboarding = await Onboarding.findOne({ userId });

    if (!onboarding) {
      return res.status(400).json({
        message: "Complete onboarding first",
      });
    }

    // Temporary static plan (AI later)
    const generatedPlan = [
      {
        date: "Today",
        tasks: [
          {
            topic: "Z-Transform",
            priority: "high",
            duration: "1.5h",
          },
          {
            topic: "FIR Design",
            priority: "medium",
            duration: "1.5h",
          },
          {
            topic: "Sampling",
            priority: "revision",
            duration: "30m",
          },
        ],
      },
      {
        date: "Tomorrow",
        tasks: [
          {
            topic: "IIR Filters",
            priority: "high",
            duration: "2h",
          },
          {
            topic: "FFT",
            priority: "medium",
            duration: "1.5h",
          },
        ],
      },
    ];

    // Remove old plan
    await Planner.deleteOne({ userId });

    // Save new plan
    const plan = await Planner.create({
      userId,
      examName: onboarding.examName,
      daysLeft: 8,
      dailyHours: onboarding.dailyStudyTime,
      plan: generatedPlan,
    });

    res.json(plan);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Generate failed" });
  }
};
