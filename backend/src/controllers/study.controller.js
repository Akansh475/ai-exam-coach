const Planner = require("../models/Planner");

// Mark task complete
exports.completeTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId, confidence } = req.body;

    const planner = await Planner.findOne({ userId });

    if (!planner) {
      return res.status(404).json({ message: "Planner not found" });
    }

    let updated = false;

    planner.plan.forEach((day) => {
      day.tasks.forEach((task) => {
        if (task._id.toString() === taskId) {
          task.done = true;
          task.confidence = confidence; // optional
          updated = true;
        }
      });
    });

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    await planner.save();

    res.json({ message: "Task marked complete" });

  } catch (err) {
    console.error("STUDY ERROR:", err);
    res.status(500).json({ message: "Study update failed" });
  }
};
