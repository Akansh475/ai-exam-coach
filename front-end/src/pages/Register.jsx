import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("REGISTER RESPONSE:", res.data);

      alert("Registered successfully. Please login.");

      // Go to login page
      navigate("/login");

    } catch (err) {
      console.log("REGISTER ERROR:", err.response);

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
    <div className="min-h-screen flex items-center justify-center bg-[#070B14] text-white px-4">

      <div className="w-full max-w-md bg-[#0E1424] p-8 rounded-xl border border-white/10">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-400">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full p-3 rounded bg-black/40 border border-white/10 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full p-3 rounded bg-black/40 border border-white/10 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full p-3 rounded bg-black/40 border border-white/10 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 py-3 rounded hover:bg-cyan-500 transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
