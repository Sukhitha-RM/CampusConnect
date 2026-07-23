import { Link } from "react-router-dom";
import { Bell, Search, Menu, Zap } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Topbar() {
  const { user, unreadCount, setSidebarOpen } = useApp();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      {/* Left: hamburger + mobile logo + search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-700 hover:text-[#112E81] hover:bg-slate-100 transition-all"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile logo */}
        <Link to="/dashboard" className="lg:hidden flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#112E81] to-[#00D2FF] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="text-sm font-bold text-slate-900">CampusConnect</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 w-full max-w-xs bg-slate-50 border border-slate-200 rounded-xl px-3 h-9 ml-2 focus-within:ring-2 focus-within:ring-[#00D2FF]/40 focus-within:border-[#112E81] transition-all">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="search"
            placeholder="Search CampusConnect..."
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative flex items-center justify-center w-9 h-9 rounded-xl text-slate-600 hover:text-[#112E81] hover:bg-slate-100 transition-all"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#00D2FF] rounded-full border-2 border-white ring-1 ring-[#112E81]/30" />
          )}
        </Link>

        {/* Profile */}
        <Link to="/profile" className="flex items-center gap-2.5 pl-2 hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#112E81] to-[#00D2FF] flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-sm">
            {user.initial}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-slate-800 leading-tight">{user.shortName}</p>
            <p className="text-xs text-[#112E81] font-medium leading-tight">{user.role}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
