import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Signup() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b1e] via-[#112E81] to-[#070b1e] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#00D2FF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#112E81] mb-6 transition-colors font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#112E81] to-[#00D2FF] flex items-center justify-center shadow-lg shadow-[#00D2FF]/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">CampusConnect</span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 mb-1">Create an account</h1>
          <p className="text-sm text-slate-500 mb-8">Join thousands of students on campus</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="name">Full Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@campus.edu"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#112E81] transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full bg-[#112E81] hover:bg-[#0e2468] text-white shadow-lg shadow-[#112E81]/30">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#112E81] font-bold hover:text-[#00D2FF] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
