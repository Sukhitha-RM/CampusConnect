import React, { createContext, useContext, useState, useCallback } from "react";
import { type User, type Notification, initialUser, notifications as initialNotifications } from "@/data/mockData";

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
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface AppSettings {
  theme: "light" | "dark" | "system";
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

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const [registeredIds, setRegisteredIds] = useState<Set<number>>(new Set([1, 3, 5]));
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set([2, 4, 6]));
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleRegister = useCallback((id: number) => {
    setRegisteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSave = useCallback((id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

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

  const unreadCount = notifications.filter((n) => !n.read).length;

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
