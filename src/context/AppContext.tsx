import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { events, type User, type Notification, initialUser, notifications as initialNotifications } from "@/data/mockData";

const SETTINGS_STORAGE_KEY = "campusconnect-settings";
const APP_STORAGE_KEY = "campusconnect-app-state";

type ThemeSetting = "light" | "dark" | "system";

interface AppContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  registeredIds: Set<number>;
  toggleRegister: (id: number) => void;
  savedIds: Set<number>;
  toggleSave: (id: number) => void;
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: number) => void;
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  getRegisteredCount: (id: number) => number;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface AppSettings {
  theme: ThemeSetting;
  registrationNotifications: boolean;
  reminderNotifications: boolean;
  announcementNotifications: boolean;
  updateNotifications: boolean;
  reminderTiming: string;
}

const defaultSettings: AppSettings = {
  theme: "light",
  registrationNotifications: true,
  reminderNotifications: true,
  announcementNotifications: true,
  updateNotifications: true,
  reminderTiming: "1-day",
};

interface StoredAppState {
  registeredIds: number[];
  savedIds: number[];
  notifications: Notification[];
  eventCounts: Record<number, number>;
}

function readStoredSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) } as AppSettings;
  } catch {
    return defaultSettings;
  }
}

function readStoredAppState(): StoredAppState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAppState;
  } catch {
    return null;
  }
}

function getInitialEventCounts(stored?: Record<number, number>) {
  return events.reduce<Record<number, number>>((acc, event) => {
    acc[event.id] = stored?.[event.id] ?? event.registered;
    return acc;
  }, {});
}

function createNotificationId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const storedSettings = useMemo(readStoredSettings, []);
  const storedState = useMemo(readStoredAppState, []);
  const [registeredIds, setRegisteredIds] = useState<Set<number>>(() => new Set(storedState?.registeredIds ?? [1, 3, 5]));
  const [savedIds, setSavedIds] = useState<Set<number>>(() => new Set(storedState?.savedIds ?? [2, 4, 6]));
  const [notifications, setNotifications] = useState<Notification[]>(() => storedState?.notifications ?? initialNotifications);
  const [settings, setSettings] = useState<AppSettings>(storedSettings);
  const [eventCounts, setEventCounts] = useState<Record<number, number>>(() => getInitialEventCounts(storedState?.eventCounts));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isSystemThemeDark = useMemo(() => {
    if (typeof window === "undefined" || settings.theme !== "system") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [settings.theme]);

  const isDarkMode = settings.theme === "dark" || (settings.theme === "system" && isSystemThemeDark);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      APP_STORAGE_KEY,
      JSON.stringify({
        registeredIds: Array.from(registeredIds),
        savedIds: Array.from(savedIds),
        notifications,
        eventCounts,
      })
    );
  }, [eventCounts, notifications, registeredIds, savedIds]);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  const pushNotification = useCallback((notification: Omit<Notification, "id" | "read" | "time">) => {
    setNotifications((prev) => [
      {
        id: createNotificationId(),
        read: false,
        time: "Just now",
        ...notification,
      },
      ...prev,
    ]);
  }, []);

  const toggleRegister = useCallback((id: number) => {
    const event = events.find((item) => item.id === id);
    if (!event) return;

    setRegisteredIds((prev) => {
      const next = new Set(prev);
      const isRegistered = next.has(id);

      if (isRegistered) next.delete(id);
      else next.add(id);

      setEventCounts((current) => ({
        ...current,
        [id]: Math.max(0, (current[id] ?? event.registered) + (isRegistered ? -1 : 1)),
      }));

      pushNotification({
        type: "registration",
        title: isRegistered ? "Registration cancelled" : "Registration confirmed",
        message: isRegistered
          ? `Registration cancelled for ${event.title}.`
          : `You successfully registered for ${event.title}.`,
      });

      return next;
    });
  }, [pushNotification]);

  const toggleSave = useCallback((id: number) => {
    const event = events.find((item) => item.id === id);
    if (!event) return;

    setSavedIds((prev) => {
      const next = new Set(prev);
      const isSaved = next.has(id);

      if (isSaved) next.delete(id);
      else next.add(id);

      pushNotification({
        type: "announcement",
        title: isSaved ? "Event removed from saved list" : "Event saved",
        message: isSaved ? `${event.title} was removed from your saved list.` : `${event.title} was saved for later.`,
      });

      return next;
    });
  }, [pushNotification]);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === "dark" ? "light" : "dark",
    }));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const getRegisteredCount = useCallback(
    (id: number) => eventCounts[id] ?? events.find((event) => event.id === id)?.registered ?? 0,
    [eventCounts]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        registeredIds,
        toggleRegister,
        savedIds,
        toggleSave,
        notifications,
        unreadCount,
        markAllRead,
        markRead,
        settings,
        updateSettings,
        toggleTheme,
        isDarkMode,
        getRegisteredCount,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
