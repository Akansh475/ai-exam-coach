import { motion } from "framer-motion";

/* Page Fade */
const pageFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Planner = () => {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#0F172A] text-slate-100"
    >
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-10 py-14 space-y-14">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>
            <p className="text-sm uppercase tracking-widest text-slate-400">
              Study Planner
            </p>

            <h1 className="text-5xl font-bold mt-2">
              Digital Signal Processing
            </h1>
          </div>

          <div className="flex gap-4">

            <div className="px-6 py-3 bg-[#020617] rounded-xl text-sm">
              ⏳ 8 Days Left
            </div>

            <button className="px-6 py-3 bg-[#020617] rounded-xl border border-slate-800 hover:border-green-400 transition">
              ⚙ Adjust
            </button>

            <button className="px-6 py-3 bg-green-500 text-black font-semibold rounded-xl hover:opacity-90 transition">
              🔄 Regenerate
            </button>

          </div>

        </div>


        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {[
            { l: "Topics", v: "23" },
            { l: "Done", v: "14" },
            { l: "Left", v: "9" },
            { l: "Daily", v: "3.5h" },
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

          <DayCard
            title="Today"
            date="Mon · Feb 3"
            highlight
            tasks={[
              {
                level: "HIGH",
                color: "amber",
                title: "Z-Transform",
                meta: "1.5h",
              },
              {
                level: "MED",
                color: "blue",
                title: "FIR Design",
                meta: "1.5h",
              },
              {
                level: "REV",
                color: "green",
                title: "Sampling",
                meta: "30m",
              },
            ]}
          />

          <DayCard
            title="Tomorrow"
            date="Tue · Feb 4"
            tasks={[
              {
                level: "HIGH",
                color: "amber",
                title: "IIR Filters",
                meta: "2h",
              },
              {
                level: "MED",
                color: "blue",
                title: "FFT",
                meta: "1.5h",
              },
            ]}
          />

        </div>


        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Progress */}
          <div className="bg-[#020617] rounded-2xl p-12 min-h-[220px]">

            <h3 className="text-2xl font-semibold mb-6">
              Overall Progress
            </h3>

            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "61%" }}
                transition={{ duration: 1.2 }}
                className="h-full bg-green-400"
              />

            </div>

            <p className="mt-4 text-slate-400">
              61% completed
            </p>

          </div>


          {/* Priority */}
          <div className="bg-[#020617] rounded-2xl p-12 min-h-[220px]">

            <h3 className="text-2xl font-semibold mb-6">
              Priority Breakdown
            </h3>

            <Priority label="High" color="amber" count="8" />
            <Priority label="Medium" color="blue" count="7" />
            <Priority label="Revision" color="green" count="8" />

          </div>

        </div>

      </div>

    </motion.div>
  );
};


/* ================= COMPONENTS ================= */


const DayCard = ({ title, date, tasks, highlight }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#020617] rounded-2xl p-12 ${
        highlight ? "border-2 border-green-400/40" : "border border-slate-800"
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
            className="flex items-center gap-5 py-5 px-6 rounded-xl border border-slate-800 hover:border-green-400 transition"
          >

            <input
              type="checkbox"
              className="accent-green-400 h-4 w-4"
            />

            <span
              className={`px-3 py-1 rounded-md text-xs font-semibold text-black ${
                t.color === "amber"
                  ? "bg-amber-400"
                  : t.color === "blue"
                  ? "bg-blue-400"
                  : "bg-green-400"
              }`}
            >
              {t.level}
            </span>

            <div className="flex-1">

              <p className="font-medium text-lg">
                {t.title}
              </p>

              <p className="text-slate-400 text-sm">
                {t.meta}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.section>
  );
};


const Priority = ({ label, count, color }) => {
  return (
    <div className="mb-5 flex items-center gap-5 py-4 px-6 rounded-xl border border-slate-800">

      <span
        className={`h-6 w-1 rounded-full ${
          color === "amber"
            ? "bg-amber-400"
            : color === "blue"
            ? "bg-blue-400"
            : "bg-green-400"
        }`}
      />

      <p className="text-lg">
        {label} — {count}
      </p>

    </div>
  );
};

export default Planner;
