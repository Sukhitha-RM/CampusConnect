import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { events } from "@/data/mockData";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";

export default function SavedEvents() {
  const { savedIds } = useApp();
  const saved = events.filter((e) => savedIds.has(e.id));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">My Activity</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Saved Events</h1>
        <p className="text-slate-500 mt-1">Keep track of campus events you're interested in.</p>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm w-fit">
        <div className="w-12 h-12 rounded-xl bg-[#5790F4]/20 flex items-center justify-center">
          <Heart className="w-6 h-6 text-[#112E81] fill-[#112E81]" />
        </div>
        <div>
          <p className="text-2xl font-black text-slate-900">{saved.length}</p>
          <p className="text-sm text-slate-500 font-medium">Saved Events</p>
        </div>
      </div>

      {/* Events grid */}
      <div>
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-0.5">Your Collection</p>
          <h2 className="text-xl font-black text-slate-900">Saved Events</h2>
        </div>

        {saved.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-1">No saved events yet</h3>
            <p className="text-slate-400 text-sm mb-6">Save events you're interested in so you can easily find them later.</p>
            <Link to="/events">
              <Button className="bg-[#112E81] text-white hover:bg-[#0e2468]">Discover Events</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {saved.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
