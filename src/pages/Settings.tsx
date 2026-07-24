import { useState } from "react";
import { Sun, Moon, Monitor, Bell, Clock, RefreshCw, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const THEMES = [
  { value: "light" as const, icon: Sun, label: "Light", desc: "Always use light mode" },
  { value: "dark" as const, icon: Moon, label: "Dark", desc: "Always use dark mode" },
  { value: "system" as const, icon: Monitor, label: "System", desc: "Match device preference" },
];

const REMINDER_TIMES = [
  { value: "1-hour", label: "1 hour before" },
  { value: "3-hours", label: "3 hours before" },
  { value: "1-day", label: "1 day before" },
  { value: "2-days", label: "2 days before" },
];

export default function Settings() {
  const { settings, updateSettings } = useApp();
  const [saved, setSaved] = useState(false);

  const handleSave = (update: Parameters<typeof updateSettings>[0]) => {
    updateSettings(update);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    updateSettings({
      theme: "light",
      registrationNotifications: true,
      reminderNotifications: true,
      announcementNotifications: true,
      updateNotifications: true,
      reminderTiming: "1-day",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Preferences</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Personalize your CampusConnect experience.</p>
      </div>

      {/* Saved toast */}
      {saved && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 animate-fade-in">
          <Check className="w-5 h-5 flex-shrink-0" />
          <p className="font-semibold text-sm">Settings saved!</p>
        </div>
      )}

      {/* Theme */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#112E81]/10 flex items-center justify-center">
            <Sun className="w-5 h-5 text-[#112E81]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#112E81]">Appearance</p>
            <h2 className="text-lg font-black text-slate-900">Theme Preferences</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {THEMES.map(({ value, icon: Icon, label, desc }) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                value={value}
                checked={settings.theme === value}
                onChange={() => handleSave({ theme: value })}
                className="sr-only"
              />
              <div className={cn(
                "rounded-2xl border-2 p-4 transition-all",
                settings.theme === value
                  ? "border-[#112E81] bg-[#112E81]/5 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              )}>
                {/* Mini preview */}
                <div className={cn(
                  "w-full h-16 rounded-lg mb-3 flex overflow-hidden border border-slate-200",
                  value === "dark" ? "bg-[#070b1e]" : value === "system" ? "bg-gradient-to-r from-white to-[#070b1e]" : "bg-white"
                )}>
                  <div className={cn("w-1/3 h-full", value === "dark" ? "bg-[#112E81]" : "bg-slate-100")} />
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#112E81]" />
                  <span className="text-sm font-bold text-slate-900">{label}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#5790F4]/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#112E81]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#5790F4]">Notifications</p>
            <h2 className="text-lg font-black text-slate-900">Notification Preferences</h2>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { key: "registrationNotifications" as const, label: "Registration confirmations", desc: "Notified when you successfully register for an event." },
            { key: "reminderNotifications" as const, label: "Event reminders", desc: "Reminded before your registered events begin." },
            { key: "announcementNotifications" as const, label: "Campus announcements", desc: "Updates about important campus news and events." },
            { key: "updateNotifications" as const, label: "Event updates", desc: "Notified when event details change." },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
              <Switch
                id={key}
                checked={settings[key]}
                onCheckedChange={(checked) => handleSave({ [key]: checked })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reminder timing */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#112E81]/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#112E81]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#112E81]">Reminders</p>
            <h2 className="text-lg font-black text-slate-900">Event Reminder Timing</h2>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <p className="text-sm font-semibold text-slate-900">Remind me before an event</p>
            <p className="text-xs text-slate-500 mt-0.5">Used for upcoming event notifications.</p>
          </div>
          <select
            id="reminder-timing"
            value={settings.reminderTiming}
            onChange={(e) => handleSave({ reminderTiming: e.target.value })}
            className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5790F4]/40 focus:border-[#112E81] transition-all"
          >
            {REMINDER_TIMES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      {/* Reset */}
      <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-red-500">Reset</p>
            <h2 className="text-lg font-black text-slate-900">Reset Preferences</h2>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 p-4 bg-red-50/50 rounded-xl border border-red-100">
          <div>
            <p className="text-sm font-semibold text-slate-900">Restore default settings</p>
            <p className="text-xs text-slate-500 mt-0.5">Resets appearance and notification preferences. Profile and registrations are not affected.</p>
          </div>
          <button
            onClick={handleReset}
            className="flex-shrink-0 px-4 py-2 rounded-xl border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
