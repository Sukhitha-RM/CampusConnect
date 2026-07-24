import { useState } from "react";
import { User, GraduationCap, FileText, Pencil, X, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const { user, updateUser } = useApp();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ ...user });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({ ...user });
    setEditing(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-1">Your Account</p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">My Profile</h1>
        <p className="text-slate-500 mt-1">View and manage your student information.</p>
      </div>

      {/* Success banner */}
      {saved && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 animate-fade-in">
          <Check className="w-5 h-5" />
          <div>
            <p className="font-semibold">Profile updated!</p>
            <p className="text-sm">Your changes have been saved successfully.</p>
          </div>
        </div>
      )}

      {/* Profile overview card */}
      <div className="bg-gradient-to-br from-[#112E81] via-[#0e2468] to-[#070b1e] rounded-3xl p-8 text-white relative overflow-hidden border border-[#5790F4]/20 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.15),transparent)] pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6 z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#112E81] to-[#5790F4] flex items-center justify-center text-4xl font-black text-white border border-[#5790F4]/30 shadow-lg flex-shrink-0">
            {user.initial}
          </div>
          <div className="flex-1">
            <p className="text-[#5790F4] text-sm font-bold mb-1 uppercase tracking-wider">Student Profile</p>
            <h2 className="text-3xl font-black mb-1 text-white">{user.name}</h2>
            <p className="text-slate-300 font-medium">{user.department}</p>
          </div>
          {!editing && (
            <Button
              onClick={() => setEditing(true)}
              className="bg-[#5790F4] text-[#070b1e] font-extrabold hover:bg-[#3B82F6] flex-shrink-0 shadow-lg"
            >
              <Pencil className="w-4 h-4" /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#112E81]/10 flex items-center justify-center">
              <User className="w-4 h-4 text-[#112E81]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#112E81]">Personal</p>
              <h2 className="text-base font-black text-slate-900">Personal Information</h2>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Full Name", value: user.name },
              { label: "Student ID", value: user.studentId },
              { label: "Email", value: user.email },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-semibold text-slate-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#5790F4]/20 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-[#112E81]" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#5790F4]">Academic</p>
              <h2 className="text-base font-black text-slate-900">Academic Information</h2>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Department", value: user.department },
              { label: "Program", value: user.program },
              { label: "Year", value: user.year },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-500">{item.label}</span>
                <span className="text-sm font-semibold text-slate-900 text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#112E81]/10 flex items-center justify-center">
            <FileText className="w-4 h-4 text-[#112E81]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#112E81]">About</p>
            <h2 className="text-base font-black text-slate-900">Bio</h2>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">{user.bio}</p>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#112E81] mb-0.5">Edit</p>
              <h2 className="text-xl font-black text-slate-900">Edit Profile</h2>
            </div>
            <button onClick={handleCancel} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-500">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "name", label: "Full Name", type: "text", key: "name" as const },
                { id: "studentId", label: "Student ID", type: "text", key: "studentId" as const },
                { id: "email", label: "Email", type: "email", key: "email" as const },
                { id: "department", label: "Department", type: "text", key: "department" as const },
                { id: "program", label: "Program", type: "text", key: "program" as const },
              ].map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label htmlFor={field.id} className="text-sm font-semibold text-slate-700">{field.label}</label>
                  <Input
                    id={field.id}
                    type={field.type}
                    value={form[field.key] as string}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    required
                  />
                </div>
              ))}

              <div className="space-y-1.5">
                <label htmlFor="year" className="text-sm font-semibold text-slate-700">Year</label>
                <select
                  id="year"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="bio" className="text-sm font-semibold text-slate-700">Bio</label>
              <textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                maxLength={300}
                className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" className="bg-[#112E81] text-white hover:bg-[#0e2468]">Save Changes</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
