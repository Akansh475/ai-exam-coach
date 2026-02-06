import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Animation on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect to onboarding
      navigate("/onboarding");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B14] text-slate-100">

      {/* Background */}
      <div className="absolute inset-0 animate-bg">
        <div className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className={`w-full max-w-lg rounded-2xl border border-white/10
          bg-[#0E1424]/90 p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          backdrop-blur-xl transition-all duration-700
          ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Continue your preparation
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Your personalized exam plan is ready
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="text-sm text-slate-400">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 w-full rounded-lg border border-white/10
                bg-[#070B14] px-4 py-3 text-sm
                outline-none transition
                focus:border-cyan-400/60
                focus:ring-1 focus:ring-cyan-400/30"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-400">Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-2 w-full rounded-lg border border-white/10
                bg-[#070B14] px-4 py-3 text-sm
                outline-none transition
                focus:border-cyan-400/60
                focus:ring-1 focus:ring-cyan-400/30"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-cyan-600
              py-3 text-sm font-medium
              transition hover:bg-cyan-500
              active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-400">
            New here?{" "}
            <span
              onClick={() => navigate("/register")}
              className="cursor-pointer text-cyan-400 hover:text-cyan-300 transition"
            >
              Sign up
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;
