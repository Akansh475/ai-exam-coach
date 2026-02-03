const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-10 py-14 space-y-12">

        {/* Header */}
        <div className="flex justify-between items-center">

          <div>
            <p className="text-sm text-slate-400 uppercase tracking-widest">
              Dashboard
            </p>

            <h1 className="text-5xl font-bold mt-2">
              Welcome, Alex
            </h1>
          </div>

          <div className="flex items-center gap-5">

            <div className="px-6 py-3 bg-[#020617] rounded-xl text-sm">
              DSP Exam · 8 Days
            </div>

            <div className="h-12 w-12 rounded-full bg-green-400" />

          </div>

        </div>


        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Priority Targets */}
          <div className="lg:col-span-8 bg-[#020617] rounded-2xl p-12 min-h-[360px]">

            <p className="text-green-400 text-sm uppercase mb-3">
              Mission Today
            </p>

            <h2 className="text-3xl font-semibold mb-8">
              Priority Targets
            </h2>

            <div className="space-y-6">

              {[
                "Z-Transform Properties",
                "FIR Filter Design",
                "Sampling Theorem",
              ].map((item, i) => (

                <div
                  key={i}
                  className="flex justify-between items-center py-4 border-b border-slate-800"
                >

                  <span className="text-lg">
                    {item}
                  </span>

                  <span className="text-slate-400">
                    30–45 min
                  </span>

                </div>

              ))}

            </div>

            <button className="mt-10 w-full py-4 bg-green-500 text-black font-semibold rounded-xl hover:opacity-90 transition">
              ▶ Start Focus Mode
            </button>

          </div>


          {/* Right Panel */}
          <div className="lg:col-span-4 space-y-10">

            {/* Stats */}
            <div className="bg-[#020617] rounded-2xl p-10 text-center min-h-[180px]">

              <p className="text-5xl font-bold text-green-400">
                14/23
              </p>

              <p className="uppercase text-slate-400 mt-2">
                Topics
              </p>

              <p className="mt-5 text-3xl">
                🔥 5
              </p>

            </div>


            {/* Progress */}
            <div className="bg-[#020617] rounded-2xl p-10 min-h-[200px]">

              <h3 className="text-xl font-semibold mb-6">
                Mission Progress
              </h3>

              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-400"
                  style={{ width: "61%" }}
                />

              </div>

              <p className="mt-4 text-slate-400">
                61% Completed
              </p>

            </div>


            {/* Actions */}
            <div className="space-y-5">

              <button className="w-full py-4 bg-[#020617] rounded-xl border border-slate-800 hover:border-green-400 transition">
                📝 Practice Test
              </button>

              <button className="w-full py-4 bg-green-500 text-black font-semibold rounded-xl hover:opacity-90 transition">
                ⬆ Upload Notes
              </button>

            </div>

          </div>


          {/* Weak Zones */}
          <div className="lg:col-span-12 bg-[#020617] rounded-2xl p-12">

            <h3 className="text-2xl font-semibold mb-8">
              Weak Zones
            </h3>

            {[
              { name: "FIR Design", v: 45 },
              { name: "IIR Filters", v: 52 },
              { name: "DFT", v: 58 },
            ].map((item, i) => (

              <div key={i} className="mb-7">

                <div className="flex justify-between mb-2">

                  <span className="text-lg">
                    {item.name}
                  </span>

                  <span className="text-slate-400">
                    {item.v}%
                  </span>

                </div>

                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-green-400"
                    style={{ width: `${item.v}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
