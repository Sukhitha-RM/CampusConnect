import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { departments, events } from "@/data/mockData";

export default function Departments() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    departments.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Explore Campus</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Departments</h1>
        <p className="text-slate-500 mt-1">Explore departments and discover events organized by each one.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="search"
          placeholder="Search by department name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 focus-visible:ring-[#5790F4] focus-visible:border-[#112E81]"
        />
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-0.5">Browse</p>
          <h2 className="text-xl font-black text-slate-900">All Departments</h2>
        </div>
        <p className="text-sm text-slate-500 font-medium">{filtered.length} department{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
          <p className="text-slate-400 mb-2">No departments found for "{search}"</p>
          <button onClick={() => setSearch("")} className="text-sm font-bold text-[#112E81]">Clear search</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((dept) => {
            const deptEvents = events.filter((e) => e.department === dept.name);
            return (
              <div
                key={dept.id}
                className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: dept.bgColor, color: dept.color }}
                >
                  {dept.icon}
                </div>

                {/* Name + description */}
                <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-[#112E81] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{dept.description}</p>

                {/* Stats + CTA */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: dept.bgColor, color: dept.color }}
                  >
                    {dept.eventCount} events
                  </span>
                  <Link
                    to="/events"
                    className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-[#112E81] transition-colors group-hover:text-[#112E81]"
                  >
                    View events <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Mini event list */}
                {deptEvents.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2">
                    {deptEvents.slice(0, 2).map((e) => (
                      <Link
                        key={e.id}
                        to={`/events/${e.id}`}
                        className="block text-xs text-slate-500 hover:text-[#112E81] transition-colors truncate font-medium"
                      >
                        → {e.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
