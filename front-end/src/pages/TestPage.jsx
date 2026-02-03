import { useState } from "react";
import { motion } from "framer-motion";

const TestPage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0F172A] text-slate-100"
    >
      <div className="max-w-4xl mx-auto px-8 py-12 space-y-12">


        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6">

          <div>
            <p className="text-sm text-slate-400">
              Z-Transform Properties
            </p>

            <h1 className="text-2xl font-semibold mt-1">
              Question 3 of 10
            </h1>
          </div>

          <div className="px-5 py-2 bg-[#020617] rounded-xl text-sm font-medium">
            ⏱ 10:34
          </div>

        </div>


        {/* Question */}
        <div className="bg-[#020617] rounded-2xl p-10 space-y-6">

          <p className="uppercase text-sm text-slate-400 tracking-widest">
            Question
          </p>

          <h2 className="text-2xl font-medium leading-relaxed">
            Which property of Z-transform allows us to convert convolution
            in time domain to multiplication in Z-domain?
          </h2>

        </div>


        {/* Options */}
        <div className="space-y-5">

          {[
            "Linearity Property",
            "Time-Shifting Property",
            "Convolution Property",
            "Multiplication Property",
          ].map((opt, i) => (

            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-7 py-5 rounded-xl border transition ${
                selected === i
                  ? "border-green-400 bg-green-500/10"
                  : "border-slate-800 hover:border-green-400/40"
              }`}
            >

              <div className="flex items-center gap-4">

                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-700 text-sm font-semibold">
                  {String.fromCharCode(65 + i)}
                </span>

                <span className="text-lg">
                  {opt}
                </span>

              </div>

            </button>

          ))}

        </div>


        {/* Navigation */}
        <div className="flex justify-between pt-6">

          <button className="px-6 py-3 bg-[#020617] rounded-xl border border-slate-800 hover:border-green-400 transition">
            ← Previous
          </button>

          <button className="px-8 py-3 bg-green-500 text-black font-semibold rounded-xl hover:opacity-90 transition">
            Next Question →
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default TestPage;
