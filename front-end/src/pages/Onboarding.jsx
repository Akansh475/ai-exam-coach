import { useState } from "react";

const Onboarding = () => {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [pressure, setPressure] = useState("important");

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 px-6 py-14">

      <div className="mx-auto max-w-4xl space-y-12">


        {/* Header */}
        <div className="text-center space-y-4">

          <h1 className="text-5xl font-bold">
            Build Your Study System
          </h1>

          <p className="text-slate-400 max-w-xl mx-auto">
            Answer a few questions. We’ll design a focused,
            realistic plan around your exam.
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

              <label className="text-sm text-slate-400">
                Exam date
              </label>

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


        {/* STEP 3 */}
        <Section number="3" title="Study Material">

          <div className="h-40 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-800 bg-[#020617] text-slate-400 space-y-2">

            <p className="font-medium">
              Upload Syllabus / Notes
            </p>

            <p className="text-sm">
              (We’ll connect this later)
            </p>

          </div>

        </Section>


        {/* STEP 4 */}
        <Section number="4" title="Exam Pressure">

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                id: "standard",
                label: "Standard",
                desc: "Regular semester exam",
              },
              {
                id: "important",
                label: "Important",
                desc: "Need a good grade",
              },
              {
                id: "critical",
                label: "Critical",
                desc: "Must score very high",
              },
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

                <p className="text-lg font-semibold">
                  {item.label}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {item.desc}
                </p>

              </button>

            ))}

          </div>

        </Section>


        {/* CTA */}
        <div className="bg-[#020617] rounded-2xl p-10 text-center space-y-5">

          <p className="text-slate-400 max-w-xl mx-auto">
            We’ll analyze your inputs and generate a realistic,
            day-by-day strategy in under a minute.
          </p>

          <button className="w-full py-4 bg-green-500 text-black font-semibold rounded-xl hover:opacity-90 transition">
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

        <h2 className="text-2xl font-semibold">
          {title}
        </h2>

      </div>

      {children}

    </section>
  );
};

export default Onboarding;
