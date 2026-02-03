import { useState } from "react";
import { motion } from "framer-motion";

const StudySession = () => {
  const [level, setLevel] = useState("understood");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0F172A] text-slate-100"
    >
      <div className="max-w-5xl mx-auto px-8 py-12 space-y-14">


        {/* Header */}
        <div className="flex justify-between items-center">

          <button className="text-slate-400 hover:text-white transition">
            ← Back to Planner
          </button>

          <div className="px-5 py-2 bg-[#020617] rounded-xl text-sm">
            ⏱ 44:44
          </div>

        </div>


        {/* Topic Intro */}
        <div className="text-center space-y-6">

          <span className="inline-block px-4 py-1 rounded-full bg-amber-400/10 text-amber-400 text-sm font-semibold">
            ⚡ High Priority · 1.5h
          </span>

          <h1 className="text-5xl font-bold leading-tight">
            Z-Transform Properties
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Essential for solving difference equations and
            understanding system behavior.
          </p>

        </div>


        {/* Must Know */}
        <Section title="Must-Know Concepts" meta="5 core ideas">

          <Concept
            no="1"
            title="Linearity Property"
            desc="Z{a·x₁[n] + b·x₂[n]} = aX₁(z) + bX₂(z). Valid in overlapping ROC."
          />

          <Concept
            no="2"
            title="Time-Shifting Property"
            desc="Z{x[n−n₀]} = z⁻ⁿ⁰X(z). Delay → multiplication."
          />

          <Concept
            no="3"
            title="Convolution Property"
            desc="Z{x*h} = X(z)H(z). Key for system analysis."
          />

        </Section>


        {/* Exam Questions */}
        <Section title="Likely Exam Questions" meta="3 patterns">

          <Question
            label="Derivation"
            text="Derive the time-shifting property and state its ROC."
          />

          <Question
            label="Application"
            text="Given X(z)=z/(z−0.5), find Z{x[n−2]} and ROC."
          />

          <Question
            label="System Analysis"
            text="Use convolution to find Y(z) from X(z), H(z)."
          />

        </Section>


        {/* Mistakes */}
        <Section title="Common Mistakes" meta="3 traps">

          <Mistake
            title="Ignoring ROC"
            desc="Always update ROC after time shifting."
          />

          <Mistake
            title="Misusing Final Value Theorem"
            desc="Valid only for stable systems."
          />

          <Mistake
            title="Forgetting Linearity Conditions"
            desc="Needs overlapping ROC."
          />

        </Section>


        {/* Self Check */}
        <Section title="How Well Do You Understand?">

          <div className="grid md:grid-cols-3 gap-6">

            <Level
              active={level === "revise"}
              onClick={() => setLevel("revise")}
              emoji="😕"
              title="Need Revision"
              desc="Not confident yet"
            />

            <Level
              active={level === "understood"}
              onClick={() => setLevel("understood")}
              emoji="🙂"
              title="Understood"
              desc="Can recall basics"
            />

            <Level
              active={level === "confident"}
              onClick={() => setLevel("confident")}
              emoji="😄"
              title="Confident"
              desc="Exam ready"
            />

          </div>

        </Section>


        {/* Actions */}
        <div className="space-y-5">

          <button className="w-full py-5 bg-green-500 text-black font-semibold rounded-xl hover:opacity-90 transition text-lg">
            Mark Complete & Continue →
          </button>

          <button className="w-full py-4 bg-[#020617] rounded-xl border border-slate-800 hover:border-green-400 transition">
            📝 Take Practice Test
          </button>

          <button className="w-full py-4 bg-[#020617] rounded-xl border border-slate-800 hover:border-green-400 transition">
            📚 View Full Notes
          </button>

        </div>


        {/* Next */}
        <div className="text-center space-y-2">

          <p className="text-slate-400">
            Up Next
          </p>

          <p className="text-xl font-semibold text-green-400">
            FIR Filter Design Methods →
          </p>

        </div>

      </div>
    </motion.div>
  );
};


/* ================= COMPONENTS ================= */


const Section = ({ title, meta, children }) => {
  return (
    <section className="bg-[#020617] rounded-2xl p-10 space-y-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-semibold">
          {title}
        </h2>

        {meta && (
          <span className="text-slate-400 text-sm">
            {meta}
          </span>
        )}

      </div>

      {children}

    </section>
  );
};


const Concept = ({ no, title, desc }) => {
  return (
    <div className="p-6 border border-slate-800 rounded-xl">

      <p className="text-green-400 font-bold mb-1">
        {no}
      </p>

      <h4 className="font-semibold text-lg">
        {title}
      </h4>

      <p className="text-slate-400 mt-2">
        {desc}
      </p>

    </div>
  );
};


const Question = ({ label, text }) => {
  return (
    <div className="p-6 border border-slate-800 rounded-xl">

      <p className="uppercase text-xs text-slate-400 mb-2">
        {label}
      </p>

      <p className="text-lg">
        “{text}”
      </p>

    </div>
  );
};


const Mistake = ({ title, desc }) => {
  return (
    <div className="p-6 border border-red-400/30 bg-red-500/5 rounded-xl">

      <h4 className="font-semibold text-red-400">
        {title}
      </h4>

      <p className="text-slate-400 mt-2">
        {desc}
      </p>

    </div>
  );
};


const Level = ({ emoji, title, desc, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-8 rounded-xl border text-center transition ${
        active
          ? "border-green-400 bg-green-500/10"
          : "border-slate-800 hover:border-green-400/40"
      }`}
    >

      <div className="text-3xl mb-3">
        {emoji}
      </div>

      <p className="font-semibold text-lg">
        {title}
      </p>

      <p className="text-slate-400 text-sm mt-1">
        {desc}
      </p>

    </button>
  );
};

export default StudySession;
