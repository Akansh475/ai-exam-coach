const express = require("express");
const cors = require("cors");
const onboardingRoutes = require("./routes/onboarding.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const plannerRoutes = require("./routes/planner.routes");
const studyRoutes = require("./routes/study.routes");
const testRoutes=require('./routes/test.routes')
const aiRoutes =require('./routes/aiRoutes')




const authRoutes = require("./routes/auth.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/study", studyRoutes);
app.use("/api/test", testRoutes);
app.use("/api/ai", aiRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("AI Exam Coach Backend Running");
});

module.exports = app;
