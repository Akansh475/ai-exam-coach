import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [pressure, setPressure] = useState("important");

  // 🔥 NEW
  const [topicsText, setTopicsText] = useState("");

  const navigate = useNavigate();

  const handleOnboarding = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    if (!examName || !examDate || !dailyHours || !pressure) {
      alert("Please fill all fields");
      return;
    }

    if (!topicsText.trim()) {
      alert("Please enter at least one topic");
      return;
    }

    // Convert daily hours
    let hoursNumber = 0;
    if (dailyHours === "1-2") hoursNumber = 2;
    if (dailyHours === "2-4") hoursNumber = 4;
    if (dailyHours === "4-6") hoursNumber = 6;
    if (dailyHours === "6+") hoursNumber = 7;

    // 🔥 Convert topics text → array
    const topics = topicsText
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await axios.post(
        "http://localhost:5000/api/onboarding",
        {
          examName,
          examDate,
          dailyStudyTime: hoursNumber,
          examPressure: pressure,
          topics, // 🔥 NEW
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");

    } catch (err) {
      console.log("ONBOARD ERROR:", err.response);
      alert("Onboarding failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 px-6 py-14">
      <div className="mx-auto max-w-4xl space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">Build Your Study System</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Answer a few questions. We’ll design a focused, realistic plan
            around your exam.
          </p>
        </div>

        {/* STEP 1 */}
        <Section number="1" title="Your Exam">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="text-sm text-slate-400">
                Exam name / Subject
              </label>
              <input
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="Digital Signal Processing"
                className="mt-2 w-full bg-[#020617] border border-slate-800 rounded-xl px-5 py-4 outline-none focus:border-green-400 transition"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Exam date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="mt-2 w-full bg-[#020617] border border-slate-800 rounded-xl px-5 py-4 outline-none focus:border-green-400 transition"
              />
            </div>
          </div>
        </Section>

        {/* STEP 2 */}
        <Section number="2" title="Daily Study Time">
          <select
            value={dailyHours}
            onChange={(e) => setDailyHours(e.target.value)}
            className="w-full bg-[#020617] border border-slate-800 rounded-xl px-5 py-4 outline-none focus:border-green-400 transition"
          >
            <option value="">Select hours per day</option>
            <option value="1-2">1–2 hours</option>
            <option value="2-4">2–4 hours</option>
            <option value="4-6">4–6 hours</option>
            <option value="6+">6+ hours</option>
          </select>

          <p className="mt-3 text-sm text-slate-500">
            Consistency beats intensity.
          </p>
        </Section>

        {/* 🔥 STEP 3 (NEW) */}
        <Section number="3" title="Topics / Units to Study">
          <textarea
            value={topicsText}
            onChange={(e) => setTopicsText(e.target.value)}
            rows={6}
            placeholder={`Enter one topic per line\n\nSignals and Systems\nFourier Transform\nSampling Theorem\nZ-Transform`}
            className="w-full bg-[#020617] border border-slate-800 rounded-xl px-5 py-4 outline-none focus:border-green-400 transition resize-none"
          />
          <p className="text-sm text-slate-500">
            Don’t worry, you can edit this later.
          </p>
        </Section>

        {/* STEP 4 */}
        <Section number="4" title="Exam Pressure">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: "standard", label: "Standard", desc: "Regular semester exam" },
              { id: "important", label: "Important", desc: "Need a good grade" },
              { id: "critical", label: "Critical", desc: "Must score very high" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setPressure(item.id)}
                className={`p-6 rounded-xl border text-left transition ${
                  pressure === item.id
                    ? "border-green-400 bg-green-500/10"
                    : "border-slate-800 hover:border-green-400/40"
                }`}
              >
                <p className="text-lg font-semibold">{item.label}</p>
                <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
              </button>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <div className="bg-[#020617] rounded-2xl p-10 text-center space-y-5">
          <p className="text-slate-400 max-w-xl mx-auto">
            We’ll analyze your inputs and generate a realistic, day-by-day
            strategy in under a minute.
          </p>

          <button
            onClick={handleOnboarding}
            className="px-8 py-3 bg-green-600 rounded-lg hover:bg-green-500 transition"
          >
            Generate My Study Plan
          </button>
        </div>

      </div>
    </div>
  );
};

/* =============== Section Wrapper =============== */

const Section = ({ number, title, children }) => {
  return (
    <section className="bg-[#020617] rounded-2xl p-10 space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-green-500 text-black font-bold">
          {number}
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default Onboarding;
