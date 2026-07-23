import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { events } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function Calendar() {
  const [date, setDate] = useState(new Date(2026, 7, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const eventsByDay = events.reduce<Record<number, typeof events>>((acc, e) => {
    const d = new Date(e.date + "T00:00:00");
    if (d.getMonth() === month && d.getFullYear() === year) {
      const day = d.getDate();
      acc[day] = [...(acc[day] || []), e];
    }
    return acc;
  }, {});

  const upcomingEvents = events
    .filter((e) => new Date(e.date + "T00:00:00") >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedEvents = selectedDay ? (eventsByDay[selectedDay] || []) : [];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Plan Your Campus Life</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Event Calendar</h1>
        <p className="text-slate-500 mt-1">Browse upcoming events and plan your campus experiences.</p>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <button
            onClick={() => setDate(new Date(year, month - 1, 1))}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-black text-slate-900">{MONTHS[month]} {year}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDate(new Date())}
              className="px-3.5 py-1.5 rounded-xl text-sm font-bold text-[#112E81] border border-[#112E81]/20 hover:bg-[#112E81]/5 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setDate(new Date(year, month + 1, 1))}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const hasEvents = day && eventsByDay[day];
            const isToday = day && today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
            const isSelected = day === selectedDay;

            return (
              <div
                key={i}
                onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                className={cn(
                  "min-h-[80px] p-2 border-b border-r border-slate-100 transition-colors",
                  day ? "cursor-pointer hover:bg-slate-50" : "bg-slate-50/30",
                  isSelected && "bg-[#112E81]/10",
                )}
              >
                {day && (
                  <>
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold mb-1 mx-auto",
                      isToday ? "bg-[#112E81] text-white font-bold" : "text-slate-700"
                    )}>
                      {day}
                    </div>
                    {hasEvents && (
                      <div className="space-y-0.5">
                        {eventsByDay[day].slice(0, 2).map((e) => (
                          <div key={e.id} className="hidden md:block text-[10px] font-bold px-1.5 py-0.5 bg-[#112E81]/10 text-[#112E81] rounded border border-[#112E81]/20 truncate">
                            {e.title}
                          </div>
                        ))}
                        <div className="md:hidden flex justify-center mt-1">
                          <span className="w-1.5 h-1.5 bg-[#00D2FF] rounded-full" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected day events */}
      {selectedDay && selectedEvents.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Events on {MONTHS[month]} {selectedDay}</h3>
          <div className="space-y-3">
            {selectedEvents.map((e) => (
              <div key={e.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#112E81]/5 border border-[#112E81]/10">
                <div className="w-10 h-10 rounded-xl bg-[#112E81] flex items-center justify-center text-[#00D2FF] text-sm font-black flex-shrink-0">
                  {selectedDay}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">{e.title}</h4>
                  <p className="text-xs text-slate-500">{e.time} · {e.venue}</p>
                </div>
                <Link to={`/events/${e.id}`} className="text-xs font-bold text-[#112E81] hover:text-[#00D2FF]">
                  View →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming events list */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">What's Next</p>
            <h2 className="text-xl font-black text-slate-900">Upcoming Events</h2>
          </div>
          <Link to="/events" className="text-sm font-bold text-[#112E81] hover:text-[#00D2FF] flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((e) => {
            const d = new Date(e.date + "T00:00:00");
            return (
              <div key={e.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#112E81]/10 border border-[#112E81]/10 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-[#112E81] uppercase">{MONTHS[d.getMonth()].slice(0,3)}</span>
                  <span className="text-xl font-black text-[#112E81] leading-tight">{d.getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-[#112E81] transition-colors">{e.title}</h3>
                  <p className="text-xs text-slate-500">{e.time} · {e.venue}</p>
                </div>
                <span className="hidden md:block text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                  {e.category}
                </span>
                <Link to={`/events/${e.id}`} className="text-xs font-bold text-[#112E81] hover:text-[#00D2FF] flex items-center gap-1 flex-shrink-0">
                  View <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
