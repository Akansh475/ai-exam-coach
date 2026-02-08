import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const name = localStorage.getItem("name");
 
  // Hide on login/register
  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  )
    return null;

  const navItem = ({ isActive }) =>
    `px-5 py-2 rounded-xl text-sm font-medium transition ${
      isActive
        ? "bg-green-500/15 text-green-400 shadow-[0_0_12px_rgba(34,197,94,0.25)]"
        : "text-slate-300 hover:bg-[#020617] hover:text-white"
    }`;

  return (
    <div className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur border-b border-slate-800">

      <nav className="max-w-7xl mx-auto px-8 py-4">

        <div className="flex items-center justify-between bg-[#020617] border border-slate-800 rounded-2xl px-6 py-3 shadow-lg">


          {/* ================= Brand ================= */}
          <div className="flex items-center gap-4">

            {/* Logo */}
            <div className="h-10 w-10 flex items-center justify-center rounded-xl 
              bg-gradient-to-br from-green-400 to-emerald-600 
              text-black font-extrabold tracking-wide shadow-md"
            >
              EF
            </div>

            {/* Name */}
            <div className="leading-tight">

              <p className="font-bold text-lg text-white tracking-wide">
                ExamFlow
              </p>

              <p className="text-xs text-slate-400">
                Exam Strategy System
              </p>

            </div>

          </div>


          {/* ================= Links ================= */}
          <div className="hidden md:flex items-center gap-2">

            <NavLink to="/onboarding" className={navItem}>
              Setup
            </NavLink>

            <NavLink to="/dashboard" className={navItem}>
              Dashboard
            </NavLink>

            <NavLink to="/planner" className={navItem}>
              Planner
            </NavLink>

            <NavLink to="/study" className={navItem}>
              Study
            </NavLink>

            <NavLink to="/test" className={navItem}>
              Test
            </NavLink>

          </div>


          {/* ================= Profile ================= */}
          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">

              <p className="text-sm font-semibold text-white">
                {name || "Student"}
              </p>

              <p className="text-xs text-slate-400">
                Student
              </p>

            </div>

            {/* Avatar */}
            <div
              className="h-10 w-10 flex items-center justify-center rounded-full 
              bg-gradient-to-br from-slate-700 to-slate-900 
              border border-slate-700 text-lg shadow-inner"
            >
              👤
            </div>

          </div>

        </div>

      </nav>

    </div>
  );
};

export default Navbar;
