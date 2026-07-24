import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Star, CalendarDays, Building2,
  CheckCircle2, Heart, Bell, User, Settings, LogOut, X, Zap,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const mainLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/events", label: "Events", icon: Star },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/departments", label: "Departments", icon: Building2 },
];

const activityLinks = [
  { to: "/my-registrations", label: "My Registrations", icon: CheckCircle2 },
  { to: "/saved-events", label: "Saved Events", icon: Heart },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: true },
];

const accountLinks = [
  { to: "/profile", label: "My Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { user, unreadCount, setSidebarOpen } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => navigate("/");

  return (
    <aside className="flex flex-col h-full bg-[#070b1e] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#112E81] to-[#5790F4] flex items-center justify-center shadow-lg shadow-[#5790F4]/20 group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-white">CampusConnect</span>
        </NavLink>

        {/* Close on mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Main */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Main
          </p>
          <div className="space-y-0.5">
            {mainLinks.map((link) => (
              <SidebarLink key={link.label} {...link} onClick={() => setSidebarOpen(false)} />
            ))}
          </div>
        </div>

        {/* My Activity */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            My Activity
          </p>
          <div className="space-y-0.5">
            {activityLinks.map((link) => (
              <SidebarLink
                key={link.label}
                {...link}
                badgeCount={link.badge ? unreadCount : 0}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
          </div>
        </div>

        {/* Account */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Account
          </p>
          <div className="space-y-0.5">
            {accountLinks.map((link) => (
              <SidebarLink key={link.label} {...link} onClick={() => setSidebarOpen(false)} />
            ))}
          </div>
        </div>
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#112E81] to-[#00D2FF] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            {user.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.shortName}</p>
            <p className="text-xs text-slate-400 truncate">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  to, label, icon: Icon, badgeCount = 0, onClick,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  badgeCount?: number;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/events" && label === "Events" ? false : undefined}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-[#112E81] text-white shadow-lg shadow-[#112E81]/40 border-r-2 border-[#5790F4]"
            : "text-slate-300 hover:text-white hover:bg-white/8"
        )
      }
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {badgeCount > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5790F4] text-[10px] font-extrabold text-[#070b1e]">
          {badgeCount}
        </span>
      )}
    </NavLink>
  );
}
