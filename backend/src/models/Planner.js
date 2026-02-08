const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    examName: String,

    daysLeft: Number,

    dailyHours: Number,

    plan: [
      {
        date: String,

        tasks: [
          {
            topic: String,
            priority: String, // high / medium / revision
            duration: String, // "1.5h"
            done: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Planner", plannerSchema);
