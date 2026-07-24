import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#112E81] to-[#5790F4] flex items-center justify-center shadow-md shadow-[#112E81]/20 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-[15px] font-bold text-slate-900">CampusConnect</span>
          </Link>

          <ul className="hidden md:flex items-center gap-7">
            {[
              { to: "/events", label: "Events" },
              { to: "/departments", label: "Departments" },
              { to: "/calendar", label: "Calendar" },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm font-medium text-slate-600 hover:text-[#112E81] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-[#112E81] transition-colors">
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-[#112E81] text-white text-sm font-semibold hover:bg-[#0e2468] hover:-translate-y-0.5 transition-all shadow-sm shadow-[#112E81]/30 border border-[#5790F4]/20"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#070b1e] text-slate-400 py-12 px-6 mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#112E81] to-[#5790F4] flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <span className="text-white font-bold">CampusConnect</span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed text-slate-400">
                Connecting every department. Empowering every event.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/events", label: "Events" },
                { to: "/departments", label: "Departments" },
                { to: "/login", label: "Log In" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="hover:text-[#5790F4] transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
            © 2026 CampusConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
