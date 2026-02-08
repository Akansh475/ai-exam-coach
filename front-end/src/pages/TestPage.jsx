import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Test = () => {
  const [test, setTest] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/test/start",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTest(res.data);
  };

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        Loading test...
      </div>
    );
  }

  const q = test.questions[current];

  const selectOption = (index) => {
    setAnswers({ ...answers, [current]: index });
  };

  const next = () => {
    if (current < test.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const score = test.questions.reduce((acc, q, i) => {
    return answers[i] === q.correct ? acc + 1 : acc;
  }, 0);

  if (finished) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <div className="bg-[#020617] p-12 rounded-2xl text-center space-y-6">
          <h1 className="text-3xl font-bold">Test Completed</h1>
          <p className="text-xl">
            Score: {score} / {test.questions.length}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-green-500 text-black rounded-xl font-semibold"
          >
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0F172A] text-slate-100 px-10 py-14"
    >
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">
              {test.title}
            </p>
            <h1 className="text-2xl font-semibold">
              Question {current + 1} of {test.questions.length}
            </h1>
          </div>

          <div className="px-4 py-2 bg-[#020617] rounded-xl text-sm">
            ⏱ {test.duration}:00
          </div>
        </div>

        {/* Question */}
        <div className="bg-[#020617] p-10 rounded-2xl space-y-6">
          <p className="text-lg font-medium">
            {q.question}
          </p>

          <div className="space-y-4">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className={`w-full text-left px-6 py-4 rounded-xl border transition ${
                  answers[current] === i
                    ? "border-green-400 bg-green-500/10"
                    : "border-slate-800"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={prev}
            disabled={current === 0}
            className="px-6 py-3 bg-[#020617] rounded-xl disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            onClick={next}
            className="px-6 py-3 bg-green-500 text-black rounded-xl font-semibold"
          >
            {current === test.questions.length - 1
              ? "Finish Test"
              : "Next Question →"}
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default Test;
