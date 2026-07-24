import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Building2, Zap, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events, departments } from "@/data/mockData";
import { formatDate } from "@/lib/utils";

export default function Landing() {
  const featuredEvents = events.filter((e) => e.featured);

  return (
    <div>
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative overflow-hidden hero-gradient">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5790F4]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#112E81]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#112E81]/10 border border-[#112E81]/20 text-[#112E81] text-sm font-semibold mb-8 animate-fade-in">
            <Zap className="w-3.5 h-3.5 text-[#5790F4] fill-[#5790F4]" />
            Where campus life comes together
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.05] animate-fade-in">
            Discover what's{" "}
            <span className="gradient-text">happening</span>{" "}
            across your campus.
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Explore events from every department, discover new opportunities, and connect
            with your college community — all in one place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
            <Link to="/events">
              <Button size="lg" className="bg-[#112E81] hover:bg-[#0e2468] text-white gap-2 shadow-xl shadow-[#112E81]/30 border border-[#5790F4]/30">
                Explore Events
                <ArrowRight className="w-4 h-4 text-[#5790F4]" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-[#112E81]/30 text-[#112E81] hover:bg-[#112E81]/5 gap-2">
                Organize an Event
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-10 border-t border-slate-200/80 animate-fade-in">
            {[
              { value: "6+", label: "Departments" },
              { value: "50+", label: "Events per Semester" },
              { value: "1000+", label: "Students Connected" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-[#112E81] mb-0.5">{stat.value}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ──────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#5790F4] mb-2">Discover</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Upcoming Events</h2>
          </div>
          <Link to="/events" className="flex items-center gap-1.5 text-sm font-semibold text-[#112E81] hover:text-[#5790F4] transition-colors group">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <div key={event.id} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 bg-gradient-to-br from-[#112E81]/10 to-[#5790F4]/20 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 text-slate-800 text-xs font-semibold rounded-full shadow-sm">
                  {event.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-[#112E81]" />
                  {formatDate(event.date)} · {event.time}
                </p>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-[#112E81] transition-colors">{event.title}</h3>
                <p className="text-sm text-slate-500 mb-4 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#5790F4]" />
                  {event.registered} attending · {event.venue}
                </p>
                <Link to={`/events/${event.id}`}>
                  <Button variant="outline" size="sm" className="w-full border-[#112E81]/20 text-[#112E81] hover:bg-[#112E81] hover:text-white">View Event</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEPARTMENTS ──────────────────────── */}
      <section className="bg-slate-50/80 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-2">Explore</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Browse by Department</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <Link
                key={dept.id}
                to="/departments"
                className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: dept.bgColor, color: dept.color }}
                >
                  {dept.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-[#112E81] transition-colors">{dept.name}</h3>
                <p className="text-xs text-slate-500">{dept.eventCount} events</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-2">Simple and connected</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">How CampusConnect Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", icon: Star, title: "Discover", desc: "Explore events happening across every department and campus organization." },
            { step: "02", icon: Users, title: "Register", desc: "Find an event you love and register to participate through one simple platform." },
            { step: "03", icon: Building2, title: "Connect", desc: "Participate, meet new people, and become part of a more connected campus community." },
          ].map((item) => (
            <div key={item.step} className="relative bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="text-4xl font-black text-slate-100 mb-4">{item.step}</div>
              <div className="w-10 h-10 rounded-xl bg-[#112E81]/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-[#112E81]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="mx-6 mb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#112E81] via-[#0e2468] to-[#070b1e] rounded-3xl p-12 text-center text-white relative overflow-hidden border border-[#5790F4]/20 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.15),transparent)] pointer-events-none" />
          <h2 className="text-4xl font-black mb-4 relative">Ready to join campus life?</h2>
          <p className="text-slate-300 mb-8 text-lg relative max-w-xl mx-auto">Create your free account and start discovering events today.</p>
          <div className="flex flex-wrap justify-center gap-4 relative">
            <Link to="/signup">
              <Button size="lg" className="bg-[#5790F4] text-[#070b1e] font-extrabold hover:bg-[#3B82F6] shadow-xl shadow-[#5790F4]/20">
                Get Started Free
              </Button>
            </Link>
            <Link to="/events">
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
