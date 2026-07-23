import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2, Heart, Bell, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { events } from "@/data/mockData";
import { formatDate, getShortDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Dashboard() {
  const { user, registeredIds, savedIds, notifications } = useApp();
  const [calDate, setCalDate] = useState(new Date(2026, 7, 1));

  const registeredEvents = useMemo(() => events.filter((e) => registeredIds.has(e.id)), [registeredIds]);
  const recommendedEvents = useMemo(() => events.filter((e) => !registeredIds.has(e.id)).slice(0, 4), [registeredIds]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const monthlyCount = useMemo(() => {
    return events.filter((e) => {
      const d = new Date(e.date + "T00:00:00");
      return d.getMonth() === calDate.getMonth() && d.getFullYear() === calDate.getFullYear();
    }).length;
  }, [calDate]);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Student Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Good morning, {user.name}!
          </h1>
          <p className="text-slate-500 mt-1">Here's what's happening around your campus.</p>
        </div>
        <Link to="/events">
          <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#112E81] text-white text-sm font-semibold hover:bg-[#0e2468] hover:-translate-y-0.5 transition-all shadow-sm shadow-[#112E81]/30 border border-[#00D2FF]/20">
            Explore Events <ArrowRight className="w-4 h-4 text-[#00D2FF]" />
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle2, label: "Registered Events", value: registeredIds.size, color: "text-[#112E81]", bg: "bg-[#112E81]/10" },
          { icon: Heart, label: "Saved Events", value: savedIds.size, color: "text-rose-600", bg: "bg-rose-50" },
          { icon: CalendarDays, label: "Events This Month", value: monthlyCount, color: "text-[#0083a3]", bg: "bg-[#00D2FF]/15" },
          { icon: Bell, label: "New Notifications", value: unreadCount, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-[#112E81] via-[#0e2468] to-[#070b1e] rounded-3xl p-8 text-white overflow-hidden border border-[#00D2FF]/20 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(0,210,255,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-[#00D2FF] text-sm font-bold mb-2 uppercase tracking-wider">Discover Campus Life</p>
          <h2 className="text-2xl font-black mb-2">Find your next campus experience.</h2>
          <p className="text-slate-300 mb-6 max-w-md text-sm leading-relaxed">Explore workshops, competitions, cultural programs, technology expos, and more.</p>
          <Link to="/events">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D2FF] text-[#070b1e] text-sm font-extrabold hover:bg-[#5ae2ff] transition-colors shadow-lg shadow-[#00D2FF]/20">
              Explore Events <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-36 h-36 bg-[#00D2FF]/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Upcoming registered events */}
      <div>
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Coming Up</p>
            <h2 className="text-xl font-black text-slate-900">Your Upcoming Events</h2>
          </div>
          <Link to="/my-registrations" className="text-sm font-semibold text-[#112E81] hover:text-[#00D2FF] flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {registeredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-10 text-center">
            <p className="text-slate-400">You haven't registered for any events yet.</p>
            <Link to="/events" className="text-[#112E81] text-sm font-bold hover:text-[#00D2FF] mt-2 inline-block">
              Browse Events →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {registeredEvents.slice(0, 3).map((event) => {
              return (
                <div key={event.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#112E81]/10 to-[#00D2FF]/20">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#112E81] text-[#00D2FF] text-[10px] font-bold rounded-full border border-[#00D2FF]/30">
                      {event.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-400 mb-1">{formatDate(event.date)} · {event.time}</p>
                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1 group-hover:text-[#112E81] transition-colors">{event.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">📍 {event.venue}</p>
                    <Link to={`/events/${event.id}`} className="text-xs font-bold text-[#112E81] hover:text-[#00D2FF] flex items-center gap-1">
                      View Event <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lower grid: recommendations + mini calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recommendations */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">For You</p>
              <h2 className="text-lg font-black text-slate-900">Recommended Events</h2>
            </div>
            <Link to="/events" className="text-sm font-semibold text-[#112E81] hover:text-[#00D2FF] flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {recommendedEvents.map((event) => {
              const sd = getShortDate(event.date);
              return (
                <div key={event.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[#112E81]/10 flex flex-col items-center justify-center flex-shrink-0 border border-[#112E81]/10">
                    <span className="text-[9px] font-bold text-[#112E81] uppercase">{sd.month}</span>
                    <span className="text-lg font-black text-[#112E81] leading-tight">{sd.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-[#112E81] transition-colors">{event.title}</h3>
                    <p className="text-xs text-slate-500">{event.time} · {event.venue}</p>
                  </div>
                  <Link to={`/events/${event.id}`} className="text-xs font-bold text-[#112E81] hover:text-[#00D2FF] flex items-center gap-1 flex-shrink-0">
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mini calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Schedule</p>
              <h2 className="text-lg font-black text-slate-900">Calendar</h2>
            </div>
            <Link to="/calendar" className="text-sm font-bold text-[#112E81] hover:text-[#00D2FF]">Open →</Link>
          </div>
          <MiniCalendar date={calDate} onPrev={() => setCalDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            onNext={() => setCalDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))} />
        </div>
      </div>

      {/* Recent notifications */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Updates</p>
            <h2 className="text-lg font-black text-slate-900">Recent Notifications</h2>
          </div>
          <Link to="/notifications" className="text-sm font-semibold text-[#112E81] hover:text-[#00D2FF] flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 3).map((n) => (
            <div key={n.id} className={cn("flex gap-3 p-3 rounded-xl transition-colors", !n.read && "bg-[#112E81]/5")}>
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold",
                n.type === "registration" ? "bg-emerald-100 text-emerald-700" :
                  n.type === "reminder" ? "bg-amber-100 text-amber-700" : "bg-[#112E81]/15 text-[#112E81]"
              )}>
                {n.type === "registration" ? "✓" : n.type === "reminder" ? "◷" : "★"}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">{n.title}</h3>
                  {!n.read && <span className="w-2 h-2 bg-[#00D2FF] rounded-full flex-shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.message}</p>
                <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniCalendar({ date, onPrev, onNext }: { date: Date; onPrev: () => void; onNext: () => void }) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const eventDays = new Set(
    events
      .map((e) => new Date(e.date + "T00:00:00"))
      .filter((d) => d.getMonth() === month && d.getFullYear() === year)
      .map((d) => d.getDate())
  );

  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={onPrev} className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"><ChevronLeft className="w-4 h-4" /></button>
        <span className="text-sm font-bold text-slate-900">{MONTH_NAMES[month]} {year}</span>
        <button onClick={onNext} className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"><ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div key={i} className={cn(
            "aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-medium transition-colors relative",
            !day ? "" :
              today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
                ? "bg-[#112E81] text-white font-bold"
                : eventDays.has(day)
                  ? "bg-[#00D2FF]/20 text-[#112E81] font-bold"
                  : "text-slate-600 hover:bg-slate-50"
          )}>
            {day || ""}
            {day && eventDays.has(day) && !(today.getDate() === day && today.getMonth() === month && today.getFullYear() === year) && (
              <span className="absolute bottom-0.5 w-1 h-1 bg-[#112E81] rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
