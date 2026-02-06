const express = require("express");
const cors = require("cors");
const onboardingRoutes = require("./routes/onboarding.routes");

const authRoutes = require("./routes/auth.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("AI Exam Coach Backend Running");
});

module.exports = app;
