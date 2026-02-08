import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("DASHBOARD DATA:", res.data);

        setData(res.data);

      } catch (err) {
        console.log("DASHBOARD ERROR:", err);

        // Token expired / invalid
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B14] text-white">
        Loading dashboard...
      </div>
    );
  }

  // Safety check
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B14] text-white">
        No dashboard data
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <p className="text-sm text-slate-400 uppercase">Dashboard</p>

          <h1 className="text-4xl font-bold mt-1">
            Welcome, {data.name}
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-[#020617] px-6 py-3 rounded-xl border border-slate-800">

          <p className="text-sm">
            {data.examName} • {data.daysLeft} Days
          </p>

          <div className="h-3 w-3 rounded-full bg-green-400"></div>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Mission */}
        <div className="lg:col-span-2 bg-[#020617] rounded-2xl p-8 border border-slate-800">

          <p className="text-sm text-green-400 uppercase">
            Mission Today
          </p>

          <h2 className="text-2xl font-semibold mt-2 mb-6">
            Priority Targets
          </h2>

          <div className="space-y-5">

            {[
              "Z-Transform Properties",
              "FIR Filter Design",
              "Sampling Theorem",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-slate-800 pb-3"
              >
                <p>{item}</p>

                <p className="text-sm text-slate-400">
                  30–45 min
                </p>
              </div>
            ))}

          </div>

          <button
            onClick={() => navigate("/study")}
            className="mt-8 w-full bg-green-600 py-3 rounded-lg font-medium hover:bg-green-500 transition"
          >
            ▶ Start Focus Mode
          </button>

        </div>

        {/* Right Panel */}
        <div className="space-y-6">

          {/* Topics */}
          <div className="bg-[#020617] rounded-2xl p-6 border border-slate-800 text-center">

            <p className="text-3xl font-bold text-green-400">
              {data.topicsDone}/{data.topicsTotal}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Topics
            </p>

            <p className="mt-2 text-orange-400">
              🔥 {Math.floor(data.progress / 10)}
            </p>

          </div>

          {/* Progress */}
          <div className="bg-[#020617] rounded-2xl p-6 border border-slate-800">

            <p className="font-semibold mb-3">
              Mission Progress
            </p>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

              <div
                className="h-full bg-green-500"
                style={{ width: `${data.progress}%` }}
              ></div>

            </div>

            <p className="mt-2 text-sm text-slate-400">
              {data.progress}% Completed
            </p>

          </div>

          {/* Actions */}
          <div className="bg-[#020617] rounded-2xl p-6 border border-slate-800 space-y-3">

            <button
              onClick={() => navigate("/test")}
              className="w-full border border-slate-700 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              📝 Practice Test
            </button>

            <button
              onClick={() => navigate("/notes")}
              className="w-full bg-green-600 py-2 rounded-lg hover:bg-green-500 transition"
            >
              ⬆ Upload Notes
            </button>

          </div>

        </div>

      </div>

      {/* Weak Zones */}
      <div className="mt-10 bg-[#020617] rounded-2xl p-8 border border-slate-800">

        <h2 className="text-2xl font-semibold mb-6">
          Weak Zones
        </h2>

        <div className="space-y-5">

          {data.weakZones.map((item) => (
            <div key={item.topic}>

              <div className="flex justify-between mb-1 text-sm">
                <p>{item.topic}</p>
                <p>{item.percent}%</p>
              </div>

              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-500"
                  style={{ width: `${item.percent}%` }}
                ></div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
