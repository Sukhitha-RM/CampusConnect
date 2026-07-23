import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import AppLayout from "@/layouts/AppLayout";

// Public pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

// App pages
import Dashboard from "@/pages/Dashboard";
import Events from "@/pages/Events";
import EventDetails from "@/pages/EventDetails";
import Calendar from "@/pages/Calendar";
import Departments from "@/pages/Departments";
import MyRegistrations from "@/pages/MyRegistrations";
import SavedEvents from "@/pages/SavedEvents";
import Notifications from "@/pages/Notifications";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-slate-50">
      <div className="text-7xl font-black text-slate-100 mb-4">404</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/dashboard" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
        Go to Dashboard
      </a>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>

          {/* Standalone auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* App routes with sidebar layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/my-registrations" element={<MyRegistrations />} />
            <Route path="/saved-events" element={<SavedEvents />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
