import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Hide on login
  if (location.pathname === "/login") return null;

  const navItem = ({ isActive }) =>
    `px-5 py-2 rounded-xl text-sm font-medium transition ${
      isActive
        ? "bg-green-500/15 text-green-400"
        : "text-slate-300 hover:bg-[#020617] hover:text-white"
    }`;

  return (
    <div className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800">

      <nav className="max-w-7xl mx-auto px-8 py-4">

        <div className="flex items-center justify-between bg-[#020617] border border-slate-800 rounded-2xl px-6 py-3">


          {/* Brand */}
          <div className="flex items-center gap-4">

            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-500 text-black font-bold">
              EF
            </div>

            <div>

              <p className="font-semibold text-lg leading-tight">
                ExamFlow
              </p>

              <p className="text-xs text-slate-400">
                Exam Strategy System
              </p>

            </div>

          </div>


          {/* Links */}
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


          {/* Profile */}
          <div className="flex items-center gap-4">

            <div className="hidden sm:block text-right">

              <p className="text-sm font-medium">
                Alex
              </p>

              <p className="text-xs text-slate-400">
                Student
              </p>

            </div>

            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800">
              👤
            </div>

          </div>


        </div>

      </nav>

    </div>
  );
};

export default Navbar;
