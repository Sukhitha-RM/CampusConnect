import { Link } from "react-router-dom";
import { MapPin, Clock, Heart, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { formatDate, getProgressPercent } from "@/lib/utils";
import { categoryColors, type Event } from "@/data/mockData";
import TiltedCard from "@/components/TiltedCard";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  showActions?: boolean;
}

export default function EventCard({ event, showActions = true }: EventCardProps) {
  const { savedIds, toggleSave, registeredIds } = useApp();
  const isSaved = savedIds.has(event.id);
  const isRegistered = registeredIds.has(event.id);
  const colors = categoryColors[event.category] || { bg: "bg-slate-100", text: "text-slate-700" };
  const progress = getProgressPercent(event.registered, event.capacity);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Tilted Image Header */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#112E81]/10 to-[#00D2FF]/20">
        <TiltedCard
          imageSrc={event.image}
          altText={event.title}
          captionText={event.title}
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={14}
          scaleOnHover={1.08}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div className="relative w-full h-full p-3 flex flex-col justify-between pointer-events-none">
              {/* Top row: Category + Save Button */}
              <div className="flex items-center justify-between pointer-events-auto">
                <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-md border border-white/20", colors.bg, colors.text)}>
                  {event.category}
                </span>

                {showActions && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSave(event.id);
                    }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-md",
                      isSaved
                        ? "bg-[#00D2FF] text-[#070b1e] shadow-lg"
                        : "bg-white/80 text-slate-700 hover:bg-white hover:text-red-500"
                    )}
                    aria-label={isSaved ? "Unsave event" : "Save event"}
                  >
                    <Heart className={cn("w-4 h-4", isSaved && "fill-[#070b1e]")} />
                  </button>
                )}
              </div>

              {/* Bottom row: Registered badge */}
              {isRegistered && (
                <div className="pointer-events-auto">
                  <span className="inline-block px-2.5 py-0.5 bg-[#112E81] text-[#00D2FF] border border-[#00D2FF]/40 text-xs font-bold rounded-full shadow-lg">
                    ✓ Registered
                  </span>
                </div>
              )}
            </div>
          }
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-slate-900 text-[15px] leading-snug line-clamp-2 group-hover:text-[#112E81] transition-colors">
            {event.title}
          </h3>
        </div>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-[#112E81] flex-shrink-0" />
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-[#00D2FF] flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              <span>{event.registered} / {event.capacity}</span>
            </div>
            <span className={cn(progress >= 80 ? "text-amber-600 font-bold" : "text-[#112E81] font-semibold")}>{progress}% full</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                progress >= 80 ? "bg-amber-500" : "bg-gradient-to-r from-[#112E81] to-[#00D2FF]"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Link to={`/events/${event.id}`}>
          <Button variant="outline" size="sm" className="w-full border-[#112E81]/20 text-[#112E81] hover:bg-[#112E81] hover:text-white transition-all group/btn">
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
