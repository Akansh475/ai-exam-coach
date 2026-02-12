const User = require("../models/User");
const Onboarding = require("../models/Onboarding");
const Planner = require("../models/Planner");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("name");
    const onboarding = await Onboarding.findOne({ userId });
    const planner = await Planner.findOne({ userId });

    if (!user || !onboarding || !planner) {
      return res.status(404).json({ message: "Dashboard data missing" });
    }

    // ---- TODAY TASKS (CORRECT FIELDS) ----
    const todayPlan = planner.plan[0]; // MVP: first day

    const todayTasks = todayPlan
      ? todayPlan.tasks.map((task, index) => ({
          _id: index,
          title: task.topic,        // ✅ CORRECT
          duration: task.duration,  // ✅ CORRECT
        }))
      : [];

    // ---- PROGRESS ----
    const allTasks = planner.plan.flatMap(day => day.tasks);
    const completedTasks = allTasks.filter(t => t.done).length;

    const progress =
      allTasks.length === 0
        ? 0
        : Math.round((completedTasks / allTasks.length) * 100);

    res.json({
      name: user.name,
      examName: planner.examName,
      daysLeft: planner.daysLeft,
      dailyStudyTime: planner.dailyHours,
      examPressure: onboarding.examPressure,

      topicsDone: completedTasks,
      topicsTotal: allTasks.length,
      progress,

      todayTasks,
      weakZones: [],
    });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
