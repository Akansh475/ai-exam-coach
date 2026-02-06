const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    examName: String,
    examDate: Date,

    dailyStudyTime: Number, // hours

    studyMaterial: String, // later file URL

    examPressure: {
      type: String,
      enum: ["standard", "important", "critical"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Onboarding", onboardingSchema);
