"use client";

import React, { useState, useEffect } from "react";
import { Check, Edit2, RefreshCw, X, Megaphone } from "lucide-react";

interface QuoteCtaContent {
  eyebrow: string;
  heading: string;
  description: string;
  phoneText: string;
  emailLabel: string;
  emailAddress: string;
  brandLogoText: string;
}

export default function AdminQuoteCtaPage() {
  const [content, setContent] = useState<QuoteCtaContent>({
    eyebrow: "LET'S MOVE YOUR BUSINESS FORWARD",
    heading: "Your route starts here.",
    description:
      "Call or email Bay to Bay Express to discuss a delivery, recurring route, or pharmacy supply shipment.",
    phoneText: "705-978-3001",
    emailLabel: "Email us",
    emailAddress: "info@baytobayexpress.ca",
    brandLogoText: "Bay to Bay EXPRESS INC.",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/quote-cta");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setContent({
            eyebrow: data.eyebrow || "LET'S MOVE YOUR BUSINESS FORWARD",
            heading: data.heading || "Your route starts here.",
            description:
              data.description ||
              "Call or email Bay to Bay Express to discuss a delivery, recurring route, or pharmacy supply shipment.",
            phoneText: data.phoneText || "705-978-3001",
            emailLabel: data.emailLabel || "Email us",
            emailAddress: data.emailAddress || "info@baytobayexpress.ca",
            brandLogoText: data.brandLogoText || "Bay to Bay EXPRESS INC.",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching Quote CTA content:", error);
      showMessage("Failed to load CTA banner data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/quote-cta", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        showMessage("CTA Banner content updated successfully!", "success");
      } else {
        showMessage("Failed to update CTA Banner content.", "error");
      }
    } catch (error) {
      console.error(error);
      showMessage("An error occurred while saving CTA Banner content.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F9FC] text-slate-800 p-4 sm:p-6 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 font-semibold text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-sky-600" />
          <span>Loading CTA banner configuration...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F9FC] text-slate-800 p-3 sm:p-5">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white px-4 py-3.5 sm:px-5 rounded-xl border border-slate-200/60 shadow-2xs">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-sky-600" />
            <span>CTA Banner (Pre-Footer)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the bottom call-to-action banner text, phone, email, and brand tagline before the site footer.
          </p>
        </div>

        {/* Feedback Alert Message */}
        {message && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between shadow-xs ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <span>{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Edit Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h2 className="text-base font-black text-[#071A2E] mb-4 flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-sky-600" />
            <span>Banner Text & Action Controls</span>
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Eyebrow Label
                </label>
                <input
                  type="text"
                  value={content.eyebrow}
                  onChange={(e) => setContent({ ...content, eyebrow: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Heading Title
                </label>
                <input
                  type="text"
                  value={content.heading}
                  onChange={(e) => setContent({ ...content, heading: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Description Subtext
              </label>
              <textarea
                rows={2}
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={content.phoneText}
                  onChange={(e) => setContent({ ...content, phoneText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Email Button Label
                </label>
                <input
                  type="text"
                  value={content.emailLabel}
                  onChange={(e) => setContent({ ...content, emailLabel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={content.emailAddress}
                  onChange={(e) => setContent({ ...content, emailAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#05172A] hover:bg-[#030E1B] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Banner Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
