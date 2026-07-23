import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/EventCard";
import { events } from "@/data/mockData";

const DEPARTMENTS = ["All Departments", ...Array.from(new Set(events.map((e) => e.department)))];
const CATEGORIES = ["All Categories", ...Array.from(new Set(events.map((e) => e.category)))];

export default function Events() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [cat, setCat] = useState("All Categories");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase());
      const matchDept = dept === "All Departments" || e.department === dept;
      const matchCat = cat === "All Categories" || e.category === cat;
      return matchSearch && matchDept && matchCat;
    });
  }, [search, dept, cat]);

  const clearFilters = () => { setSearch(""); setDept("All Departments"); setCat("All Categories"); };
  const hasFilters = search || dept !== "All Departments" || cat !== "All Categories";

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Discover Campus Life</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Events</h1>
        <p className="text-slate-500 mt-1">Discover workshops, competitions, cultural programs, and more.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search by event, department, venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 focus-visible:ring-[#00D2FF] focus-visible:border-[#112E81]"
            />
          </div>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#00D2FF]/40 focus:border-[#112E81] transition-all"
          >
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#00D2FF]/40 focus:border-[#112E81] transition-all"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-0.5">Explore</p>
          <h2 className="text-xl font-black text-slate-900">Upcoming Events</h2>
        </div>
        <p className="text-sm text-slate-500 font-medium">{filtered.length} event{filtered.length !== 1 ? "s" : ""} found</p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
          <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700 mb-1">No events found</h3>
          <p className="text-slate-400 text-sm">Try changing your search or filters.</p>
          <button onClick={clearFilters} className="mt-4 text-sm font-bold text-[#112E81] hover:text-[#00D2FF]">
            Clear all filters →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
