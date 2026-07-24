import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, Heart, CheckCircle2, Building2, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { events, categoryColors } from "@/data/mockData";
import { formatDate, getProgressPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedIds, toggleSave, registeredIds, toggleRegister, getRegisteredCount } = useApp();
  const [showUnregisterConfirm, setShowUnregisterConfirm] = useState(false);

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Event not found</h2>
        <p className="text-slate-500 mb-6">This event doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/events")} variant="outline" className="border-[#112E81]/30 text-[#112E81]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
        </Button>
      </div>
    );
  }

  const isSaved = savedIds.has(event.id);
  const isRegistered = registeredIds.has(event.id);
  const colors = categoryColors[event.category] || { bg: "bg-slate-100", text: "text-slate-700" };
  const registeredCount = getRegisteredCount(event.id);
  const progress = getProgressPercent(registeredCount, event.capacity);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#112E81] mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Events
      </button>

      {/* Hero image */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-[#112E81]/10 to-[#5790F4]/20 mb-8 shadow-lg">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className={cn("px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm shadow-md", colors.bg, colors.text)}>
            {event.category}
          </span>
        </div>
        {isRegistered && (
          <div className="absolute top-6 right-6 flex items-center gap-1.5 px-4 py-2 bg-[#112E81] text-[#5790F4] border border-[#5790F4]/30 rounded-full text-sm font-extrabold shadow-lg">
            <CheckCircle2 className="w-4 h-4" /> Registered
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3">{event.title}</h1>
            <p className="text-sm font-bold text-[#112E81] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#5790F4]" /> {event.department}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Calendar, label: "Date", value: formatDate(event.date) },
              { icon: Clock, label: "Time", value: event.time },
              { icon: MapPin, label: "Venue", value: event.venue },
              { icon: Building2, label: "Organizer", value: event.organizer },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-[#112E81]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-[#112E81]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">About this Event</h2>
            <p className="text-slate-600 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Sidebar card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-24">
            {/* Capacity */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <Users className="w-4 h-4 text-[#112E81]" />
                  <span>{registeredCount} / {event.capacity} attending</span>
                </div>
                <span className={cn("text-sm font-semibold", progress >= 80 ? "text-amber-600" : "text-[#112E81]")}>
                  {progress}%
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", progress >= 80 ? "bg-amber-500" : "bg-gradient-to-r from-[#112E81] to-[#5790F4]")}
                  style={{ width: `${progress}%` }}
                />
              </div>
              {progress >= 80 && (
                <p className="text-xs text-amber-600 font-medium mt-1.5">Filling up fast!</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => {
                  if (isRegistered) {
                    setShowUnregisterConfirm(true);
                    return;
                  }
                  toggleRegister(event.id);
                }}
                className={cn(
                  "w-full font-bold shadow-md",
                  isRegistered
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-[#112E81] text-white hover:bg-[#0e2468] border border-[#5790F4]/30"
                )}
              >
                {isRegistered ? (
                  <><CheckCircle2 className="w-4 h-4" /> Registered</>
                ) : "Register for Event"}
              </Button>

              <button
                onClick={() => toggleSave(event.id)}
                className={cn(
                  "w-full flex items-center justify-center gap-2 h-10 rounded-xl border text-sm font-bold transition-all",
                  isSaved
                    ? "bg-rose-100 border-rose-200 text-rose-600"
                    : "border-[#112E81]/20 text-[#112E81] bg-white hover:bg-slate-50"
                )}
              >
                <Heart className={cn("w-4 h-4", isSaved && "fill-rose-600 text-rose-600")} />
                {isSaved ? "Saved" : "Save Event"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUnregisterConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-card border border-border shadow-2xl p-6 animate-fade-in">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                  <h3 className="text-lg font-black text-foreground">Unregister from this event?</h3>
                <p className="text-sm text-muted-foreground mt-1">This will remove you from the attendee list.</p>
              </div>
              <button onClick={() => setShowUnregisterConfirm(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setShowUnregisterConfirm(false)}>Cancel</Button>
              <Button
                className="bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => {
                  toggleRegister(event.id);
                  setShowUnregisterConfirm(false);
                }}
              >
                Unregister
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
