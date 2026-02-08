import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

/* Page Fade */
const pageFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Planner = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:5000/api/planner",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlan(res.data);
    } catch {
      await generatePlan();
    } finally {
      setLoading(false);
    }
  };

  const generatePlan = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/planner/generate",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlan(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        Loading planner...
      </div>
    );
  }

  if (!plan) return null;

  // Stats
  const allTasks = plan.plan.flatMap((d) => d.tasks);
  const total = allTasks.length;
  const done = allTasks.filter((t) => t.done).length;
  const left = total - done;

  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#0F172A] text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-10 py-14 space-y-14">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-400">
              Study Planner
            </p>
            <h1 className="text-5xl font-bold mt-2">
              {plan.examName}
            </h1>
          </div>

          <div className="flex gap-4">
            <div className="px-6 py-3 bg-[#020617] rounded-xl text-sm">
              ⏳ {plan.daysLeft} Days Left
            </div>

            <button
              onClick={generatePlan}
              className="px-6 py-3 bg-green-500 text-black font-semibold rounded-xl hover:opacity-90 transition"
            >
              🔄 Regenerate
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { l: "Topics", v: total },
            { l: "Done", v: done },
            { l: "Left", v: left },
            { l: "Daily", v: `${plan.dailyHours}h` },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-[#020617] rounded-2xl p-10 text-center min-h-[160px]"
            >
              <p className="text-4xl font-bold text-green-400">
                {s.v}
              </p>
              <p className="uppercase text-slate-400 mt-2 text-sm">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {plan.plan.map((day, i) => (
            <DayCard
              key={i}
              title={i === 0 ? "Today" : i === 1 ? "Tomorrow" : "Day"}
              date={day.date}
              highlight={i === 0}
              tasks={day.tasks}
              navigate={navigate}
            />
          ))}
        </div>

      </div>
    </motion.div>
  );
};

/* ================= COMPONENTS ================= */

const DayCard = ({ title, date, tasks, highlight, navigate }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#020617] rounded-2xl p-12 ${
        highlight
          ? "border-2 border-green-400/40"
          : "border border-slate-800"
      }`}
    >
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-green-400">
            {title}
          </p>
          <h3 className="text-2xl font-semibold mt-1">
            {date}
          </h3>
        </div>

        <span className="text-slate-400 text-sm">
          {tasks.length} tasks
        </span>
      </div>

      {/* Tasks */}
      <div className="space-y-5">
        {tasks.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01 }}
            onClick={() =>
              navigate("/study", {
                state: { task: t },
              })
            }
            className="flex items-center gap-5 py-5 px-6 rounded-xl border border-slate-800 cursor-pointer hover:border-green-400 transition"
          >
            <input
              type="checkbox"
              checked={t.done}
              readOnly
              className="accent-green-400 h-4 w-4"
            />

            <span
              className={`px-3 py-1 rounded-md text-xs font-semibold text-black ${
                t.priority === "high"
                  ? "bg-amber-400"
                  : t.priority === "medium"
                  ? "bg-blue-400"
                  : "bg-green-400"
              }`}
            >
              {t.priority.toUpperCase()}
            </span>

            <div className="flex-1">
              <p className="font-medium text-lg">
                {t.topic}
              </p>
              <p className="text-slate-400 text-sm">
                {t.duration}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Planner;
