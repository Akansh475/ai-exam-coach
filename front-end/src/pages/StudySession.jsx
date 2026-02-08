import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Study = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const task = location.state?.task;

  const [confidence, setConfidence] = useState("understood");
  const [loading, setLoading] = useState(false);

  // 🔐 Redirect safely if task missing
  useEffect(() => {
    if (!task) {
      navigate("/planner");
    }
  }, [task, navigate]);

  // ⏳ While redirecting, render nothing
  if (!task) return null;

  const markComplete = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/study/complete",
        {
          taskId: task._id,
          confidence,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/planner");
    } catch (err) {
      console.error(err);
      alert("Failed to update progress");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0F172A] text-slate-100 px-8 py-14"
    >
      <div className="max-w-4xl mx-auto space-y-14">

        {/* Back */}
        <button
          onClick={() => navigate("/planner")}
          className="text-slate-400 hover:text-white transition"
        >
          ← Back to Planner
        </button>

        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-400/20 text-amber-300 text-sm">
            ⚡ {task.priority.toUpperCase()} • {task.duration}
          </span>

          <h1 className="text-4xl font-bold">
            {task.topic}
          </h1>

          <p className="text-slate-400">
            Focus on understanding core ideas and exam patterns.
          </p>
        </div>

        <Card title="Must-Know Concepts">
          <ul className="space-y-3">
            <li>Linearity property</li>
            <li>Time shifting</li>
            <li>Convolution</li>
          </ul>
        </Card>

        <Card title="Likely Exam Questions">
          <ul className="space-y-3">
            <li>Derive key properties</li>
            <li>Solve numerical problems</li>
            <li>State ROC conditions</li>
          </ul>
        </Card>

        <Card title="Common Mistakes" danger>
          <ul className="space-y-3">
            <li>Ignoring ROC</li>
            <li>Wrong shifting sign</li>
            <li>Missing stability condition</li>
          </ul>
        </Card>

        {/* Confidence */}
        <div className="bg-[#020617] rounded-2xl p-10 space-y-6">
          <h3 className="text-xl font-semibold">
            How well do you understand?
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: "revision", label: "Need Revision" },
              { id: "understood", label: "Understood" },
              { id: "confident", label: "Confident" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setConfidence(c.id)}
                className={`p-6 rounded-xl border transition ${
                  confidence === c.id
                    ? "border-green-400 bg-green-500/10"
                    : "border-slate-800"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={markComplete}
          disabled={loading}
          className="w-full py-4 bg-green-500 text-black font-semibold rounded-xl hover:opacity-90 transition"
        >
          {loading ? "Saving..." : "Mark Complete & Continue →"}
        </button>

      </div>
    </motion.div>
  );
};

const Card = ({ title, children, danger }) => (
  <div
    className={`rounded-2xl p-10 ${
      danger
        ? "bg-red-500/5 border border-red-500/20"
        : "bg-[#020617]"
    }`}
  >
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default Study;
