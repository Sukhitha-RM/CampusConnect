import { Link } from "react-router-dom";
import { CheckCircle2, Calendar } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { events } from "@/data/mockData";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";

export default function MyRegistrations() {
  const { registeredIds } = useApp();
  const registered = events.filter((e) => registeredIds.has(e.id));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">My Activity</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">My Registrations</h1>
        <p className="text-slate-500 mt-1">View all the campus events you've registered for.</p>
      </div>

      {/* Summary card */}
      <div className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm w-fit">
        <div className="w-12 h-12 rounded-xl bg-[#112E81]/10 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-[#112E81]" />
        </div>
        <div>
          <p className="text-2xl font-black text-slate-900">{registered.length}</p>
          <p className="text-sm text-slate-500 font-medium">Registered Events</p>
        </div>
      </div>

      {/* Events */}
      <div>
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-0.5">Your Events</p>
          <h2 className="text-xl font-black text-slate-900">Registered Events</h2>
        </div>

        {registered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-1">No registrations yet</h3>
            <p className="text-slate-400 text-sm mb-6">Explore upcoming campus events and register for the ones you're interested in.</p>
            <Link to="/events">
              <Button className="bg-[#112E81] text-white hover:bg-[#0e2468]">Discover Events</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {registered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
