import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Notification } from "@/data/mockData";

const TYPE_ICONS: Record<string, { icon: string; bg: string; text: string }> = {
  registration: { icon: "✓", bg: "bg-emerald-100", text: "text-emerald-700" },
  reminder: { icon: "◷", bg: "bg-amber-100", text: "text-amber-700" },
  announcement: { icon: "★", bg: "bg-[#112E81]/15", text: "text-[#112E81]" },
};

export default function Notifications() {
  const { notifications, unreadCount, markAllRead, markRead } = useApp();
  const [tab, setTab] = useState("all");

  const filtered = notifications.filter((n) => {
    if (tab === "unread") return !n.read;
    if (tab === "all") return true;
    return n.type === tab;
  });

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Stay Updated</p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-slate-500 mt-1">Keep track of event updates and announcements.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} className="flex-shrink-0 border-[#112E81]/30 text-[#112E81] hover:bg-[#112E81]/5">
            <CheckCheck className="w-3.5 h-3.5 text-[#00a7cc]" /> Mark all read
          </Button>
        )}
      </div>

      {/* Filters */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && <span className="ml-1.5 px-1.5 py-0.5 bg-[#112E81] text-white rounded-full text-[10px] font-bold">{unreadCount}</span>}
          </TabsTrigger>
          <TabsTrigger value="registration">Registrations</TabsTrigger>
          <TabsTrigger value="reminder">Reminders</TabsTrigger>
          <TabsTrigger value="announcement">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          {/* Results count */}
          <div className="flex items-center justify-between my-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-0.5">Recent Activity</p>
              <h2 className="text-lg font-black text-slate-900">Your Notifications</h2>
            </div>
            <p className="text-sm text-slate-500 font-medium">{filtered.length} notification{filtered.length !== 1 ? "s" : ""}</p>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700 mb-1">No notifications</h3>
              <p className="text-slate-400 text-sm">You're all caught up. New updates will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((n) => (
                <NotificationRow key={n.id} notification={n} onRead={() => markRead(n.id)} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationRow({ notification: n, onRead }: { notification: Notification; onRead: () => void }) {
  const config = TYPE_ICONS[n.type] || TYPE_ICONS.announcement;

  return (
    <div
      className={cn(
        "flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-sm",
        !n.read ? "bg-[#112E81]/5 border-[#112E81]/20" : "bg-white border-slate-100"
      )}
      onClick={onRead}
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold", config.bg, config.text)}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn("text-sm font-bold", !n.read ? "text-slate-900" : "text-slate-700")}>{n.title}</h3>
          {!n.read && <span className="w-2 h-2 bg-[#00D2FF] rounded-full flex-shrink-0 mt-1.5" />}
        </div>
        <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
        <p className="text-xs text-slate-400 mt-1.5">{n.time}</p>
      </div>
    </div>
  );
}
