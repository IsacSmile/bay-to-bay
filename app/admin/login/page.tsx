"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect smoothly to Quotes management page
        router.push("/admin/quotes");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to login server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden text-slate-800 font-sans selection:bg-brand-blue selection:text-white">
      {/* Soft Ambient Ice Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 sm:w-96 sm:h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 sm:w-96 sm:h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card Container */}
      <div className="w-full max-w-sm sm:max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-900/5 backdrop-blur-xl relative z-10 space-y-6 transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4">
        
        {/* Top Logo & Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
            <Image
              src="/approved-logo.png"
              alt="Bay to Bay Express Inc."
              width={200}
              height={40}
              className="h-9 sm:h-10 w-auto object-contain"
              priority
            />
          </div>

          <div>
            <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-brand-blue uppercase block mb-1">
              BAY TO BAY LOGISTICS
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              Sign in to manage quote submissions, services, and routes.
            </p>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in zoom-in-95">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5 group">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="baytobayexpress@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="space-y-1.5 group">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl bg-brand-blue hover:bg-[#0878D1] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/25 transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Security Note */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Server-Side Session</span>
          </div>
        </div>

      </div>

      {/* Footer Copyright */}
      <p className="mt-6 sm:mt-8 text-[11px] sm:text-xs text-slate-400 font-medium text-center relative z-10">
        © {new Date().getFullYear()} Bay to Bay Express Inc. All rights reserved.
      </p>

    </div>
  );
}

