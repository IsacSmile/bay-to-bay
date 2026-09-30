"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { PrivacyEnquiriesModal } from "@/components/PrivacyEnquiriesModal";

export interface ContactFormProps {
  phone?: string;
  email?: string;
  initialServices?: { id: string; title: string }[];
}

const RUN_OPTIONS = [
  "Other route / please advise",
  "Tuesday — North Bay to Hearst",
  "Wednesday — Hearst to North Bay",
  "Thursday — North Bay to Hearst",
  "Friday — Hearst to North Bay",
];

const FREQUENCY_OPTIONS = [
  "One-time delivery",
  "Recurring delivery",
];

export const ContactForm: React.FC<ContactFormProps> = ({
  phone = "705-978-3001",
  email = "baytobayexpress@gmail.com",
  initialServices = [],
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    pickupLocation: "",
    deliveryLocation: "",
    preferredDate: "",
    frequency: "One-time delivery",
    service: "",
    packageDetails: "",
    preferredRun: "Other route / please advise",
    website_hp: "", // Honeypot
  });

  const [services, setServices] = useState<{ id: string; title: string }[]>(initialServices);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<{
    id?: string;
    fullName: string;
    email: string;
    pickupLocation: string;
    deliveryLocation: string;
    preferredDate: string;
    frequency: string;
    service?: string;
    preferredRun?: string;
  } | null>(null);

  // Fetch admin services dynamically on mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setServices(data.map((s: any) => ({ id: s.id, title: s.title })));
        }
      }
    } catch (err) {
      console.warn("Failed to fetch dynamic services from admin API:", err);
    } finally {
      setServicesLoading(false);
    }
  };

  const handleServicesDropdownOpen = () => {
    // Re-fetch smoothly if empty or to ensure fresh admin updates
    if (services.length === 0) {
      fetchServices();
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Your name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) errors.email = "Please enter a valid email address";
    if (!formData.pickupLocation.trim()) errors.pickupLocation = "Pickup town or postal code is required";
    if (!formData.deliveryLocation.trim()) errors.deliveryLocation = "Delivery town or postal code is required";
    if (!formData.preferredDate.trim()) errors.preferredDate = "Preferred date is required";
    if (!formData.packageDetails.trim()) errors.packageDetails = "Package details are required";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSubmitStatus("loading");
    setErrorMessage(null);

    try {
      const payload = {
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: "", // default phone for online contact form
        pickupLocation: formData.pickupLocation,
        deliveryLocation: formData.deliveryLocation,
        preferredDate: formData.preferredDate,
        frequency: formData.frequency,
        service: formData.service,
        preferredRun: formData.preferredRun,
        additionalInfo: formData.packageDetails,
        website_hp: formData.website_hp,
      };

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedSummary({
          id: data.id,
          fullName: formData.fullName,
          email: formData.email,
          pickupLocation: formData.pickupLocation,
          deliveryLocation: formData.deliveryLocation,
          preferredDate: formData.preferredDate,
          frequency: formData.frequency,
          service: formData.service,
          preferredRun: formData.preferredRun,
        });
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || "Failed to submit request. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage("Network error occurred. Please try again or call us directly.");
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      pickupLocation: "",
      deliveryLocation: "",
      preferredDate: "",
      frequency: "One-time delivery",
      service: "",
      packageDetails: "",
      preferredRun: "Other route / please advise",
      website_hp: "",
    });
    setSubmittedSummary(null);
    setSubmitStatus("idle");
    setErrorMessage(null);
  };

  const telLink = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const mailtoLink = `mailto:${email}`;

  return (
    <>
      <div className="w-full bg-[#F6F9FC] py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Top Header */}
          <div className="mb-10 sm:mb-12">
            <span className="text-[#0284C7] text-xs font-black tracking-widest uppercase block mb-2">
              LET&apos;S TALK DELIVERY
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-[#071A2E] tracking-tight leading-tight">
              Request a quote
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-normal mt-2 max-w-2xl leading-relaxed">
              Tell us about your shipment. We&apos;ll review the details and confirm availability and pricing.
            </p>
          </div>

          {/* Main 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
            
            {/* Left Column: Form Card (~60%) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xs">
              {submitStatus === "success" ? (
                <div className="py-6 sm:py-8 px-1 sm:px-2 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  {/* Top Status & Badge */}
                  <div className="text-center space-y-3">
                    <div className="relative inline-flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/90 flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                      </span>
                    </div>

                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-2">
                        <span>Dispatch Request Confirmed</span>
                        {submittedSummary?.id && (
                          <span className="text-emerald-900/60 font-mono text-[11px]">
                            • #{submittedSummary.id.slice(0, 8).toUpperCase()}
                          </span>
                        )}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#071A2E] tracking-tight">
                        Quote Request Received!
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mt-2 leading-relaxed">
                        Thank you, <span className="font-bold text-[#071A2E]">{submittedSummary?.fullName || formData.fullName}</span>. We&apos;ve logged your shipment in our dispatch queue and sent your details to our route planners.
                      </p>
                    </div>
                  </div>

                  {/* Shipment Summary Box */}
                  {submittedSummary && (
                    <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-200/70 pb-2.5 text-xs">
                        <span className="font-extrabold uppercase tracking-wider text-slate-400">
                          Shipment Overview
                        </span>
                        <span className="font-semibold text-slate-600">
                          {submittedSummary.email}
                        </span>
                      </div>

                      {/* Route Row */}
                      <div className="bg-white p-3 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#0088FF] shrink-0" />
                          <span>{submittedSummary.pickupLocation}</span>
                        </div>
                        <span className="text-slate-400 text-xs px-2">→</span>
                        <div className="flex items-center gap-2 text-right">
                          <span>{submittedSummary.deliveryLocation}</span>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                          <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">
                            Target Date
                          </span>
                          <span className="font-bold text-slate-800">
                            {submittedSummary.preferredDate}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                          <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">
                            Frequency
                          </span>
                          <span className="font-bold text-slate-800">
                            {submittedSummary.frequency}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs col-span-2 sm:col-span-1">
                          <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">
                            Service Type
                          </span>
                          <span className="font-bold text-[#0088FF] truncate block">
                            {submittedSummary.service || "Standard Freight"}
                          </span>
                        </div>
                      </div>

                      {submittedSummary.preferredRun && submittedSummary.preferredRun !== "Other route / please advise" && (
                        <div className="text-[11px] text-slate-600 bg-sky-50/70 border border-sky-100 rounded-xl px-3 py-2 font-medium flex items-center gap-1.5">
                          <span className="font-bold text-[#071A2E]">Requested Run:</span>
                          <span>{submittedSummary.preferredRun}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* What to Expect Next */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      What happens next
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-sky-50 text-[#0088FF] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-sky-200">
                          1
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Route Review</p>
                          <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">Checking van capacity & run timing.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-sky-50 text-[#0088FF] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-sky-200">
                          2
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Quote & Window</p>
                          <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">We confirm availability and pricing directly.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-sky-50 text-[#0088FF] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-sky-200">
                          3
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Locked In</p>
                          <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">Pickup scheduled upon your approval.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0088FF] hover:bg-[#0077EE] active:scale-95 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Another Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={telLink}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#0088FF]" />
                      <span>Urgent? Call {phone}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>

                  {/* Feedback Error Alert */}
                  {errorMessage && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-rose-800 font-semibold flex items-center gap-2.5">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Row 1: Your Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Your name <span className="text-[#0088FF]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 transition-all ${
                          fieldErrors.fullName ? "border-rose-400 bg-rose-50/20" : "border-slate-300 focus:border-[#0088FF]"
                        }`}
                      />
                      {fieldErrors.fullName && (
                        <p className="text-xs text-rose-600 mt-1 font-medium">{fieldErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Business name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 focus:border-[#0088FF] transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Email address <span className="text-[#0088FF]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 transition-all ${
                        fieldErrors.email ? "border-rose-400 bg-rose-50/20" : "border-slate-300 focus:border-[#0088FF]"
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Row 3: Pickup Town & Delivery Town */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Pickup town / postal code <span className="text-[#0088FF]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. North Bay"
                        value={formData.pickupLocation}
                        onChange={(e) => {
                          setFormData({ ...formData, pickupLocation: e.target.value });
                          if (fieldErrors.pickupLocation) setFieldErrors({ ...fieldErrors, pickupLocation: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 transition-all ${
                          fieldErrors.pickupLocation ? "border-rose-400 bg-rose-50/20" : "border-slate-300 focus:border-[#0088FF]"
                        }`}
                      />
                      {fieldErrors.pickupLocation && (
                        <p className="text-xs text-rose-600 mt-1 font-medium">{fieldErrors.pickupLocation}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Delivery town / postal code <span className="text-[#0088FF]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hearst"
                        value={formData.deliveryLocation}
                        onChange={(e) => {
                          setFormData({ ...formData, deliveryLocation: e.target.value });
                          if (fieldErrors.deliveryLocation) setFieldErrors({ ...fieldErrors, deliveryLocation: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 transition-all ${
                          fieldErrors.deliveryLocation ? "border-rose-400 bg-rose-50/20" : "border-slate-300 focus:border-[#0088FF]"
                        }`}
                      />
                      {fieldErrors.deliveryLocation && (
                        <p className="text-xs text-rose-600 mt-1 font-medium">{fieldErrors.deliveryLocation}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 4: Preferred Date & Delivery Frequency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Preferred date <span className="text-[#0088FF]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => {
                          setFormData({ ...formData, preferredDate: e.target.value });
                          if (fieldErrors.preferredDate) setFieldErrors({ ...fieldErrors, preferredDate: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 transition-all bg-white ${
                          fieldErrors.preferredDate ? "border-rose-400 bg-rose-50/20" : "border-slate-300 focus:border-[#0088FF]"
                        }`}
                      />
                      {fieldErrors.preferredDate && (
                        <p className="text-xs text-rose-600 mt-1 font-medium">{fieldErrors.preferredDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Delivery frequency
                      </label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 focus:border-[#0088FF] transition-all bg-white cursor-pointer"
                      >
                        {FREQUENCY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Service Dropdown (Dynamically fetched from Admin) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-800">
                        Service
                      </label>
                      {servicesLoading && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin text-[#0088FF]" />
                          Syncing services...
                        </span>
                      )}
                    </div>
                    <select
                      value={formData.service}
                      onFocus={handleServicesDropdownOpen}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 focus:border-[#0088FF] transition-all bg-white cursor-pointer"
                    >
                      <option value="">Please select</option>
                      {services.map((svc) => (
                        <option key={svc.id || svc.title} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 6: Package Details */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Package details <span className="text-[#0088FF]">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Contents, number of packages, approximate size and weight, and any special instructions."
                      value={formData.packageDetails}
                      onChange={(e) => {
                        setFormData({ ...formData, packageDetails: e.target.value });
                        if (fieldErrors.packageDetails) setFieldErrors({ ...fieldErrors, packageDetails: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 sm:py-3 rounded-xl border text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 transition-all ${
                        fieldErrors.packageDetails ? "border-rose-400 bg-rose-50/20" : "border-slate-300 focus:border-[#0088FF]"
                      }`}
                    />
                    {fieldErrors.packageDetails && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{fieldErrors.packageDetails}</p>
                    )}
                  </div>

                  {/* Row 7: Preferred North Bay-Hearst run */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Preferred North Bay–Hearst run
                    </label>
                    <select
                      value={formData.preferredRun}
                      onChange={(e) => setFormData({ ...formData, preferredRun: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30 focus:border-[#0088FF] transition-all bg-white cursor-pointer"
                    >
                      {RUN_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 font-normal">
                      Choose a matching preferred date above. Availability and pickup times are confirmed with your quote.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-[#0088FF] hover:bg-[#0077EE] disabled:opacity-70 text-white font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
                    >
                      {submitStatus === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Quote Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Quote Request</span>
                          <span className="text-base leading-none">→</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Disclaimer / Fine Print */}
                  <div className="pt-2 space-y-1.5 text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                    <p>
                      Submit your details securely online. This is a quote request; your booking is confirmed only after we agree on the arrangements.
                    </p>
                    <p>
                      Please don&apos;t include patient details, payment information or other sensitive personal information.{" "}
                      <button
                        type="button"
                        onClick={() => setIsPrivacyModalOpen(true)}
                        className="text-[#0284C7] underline hover:text-[#006ED6] font-medium cursor-pointer"
                      >
                        Privacy & enquiries
                      </button>
                    </p>
                    <p>
                      Requests are processed securely.{" "}
                      <button
                        type="button"
                        onClick={() => setIsPrivacyModalOpen(true)}
                        className="text-[#0284C7] underline hover:text-[#006ED6] font-medium cursor-pointer"
                      >
                        How your information is handled.
                      </button>
                    </p>
                  </div>

                </form>
              )}
            </div>

            {/* Right Column: Information & Details Cards (~40%) */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-7">
              
              {/* North Bay ↔ Hearst Card */}
              <div className="bg-[#EDF6FD] rounded-3xl p-6 sm:p-8 border border-[#CFE5F8] shadow-xs space-y-5">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-[#071A2E] tracking-tight">
                    North Bay ↔ Hearst
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2.5">
                    <span className="font-bold text-[#071A2E]">Stops:</span> North Bay · Temiskaming Shores · Kirkland Lake · Matheson · Timmins · Cochrane · Kapuskasing · Hearst · Longlac. Confirm your stop and timing with us when booking.
                  </p>
                </div>

                <div className="space-y-3 py-4 border-y border-[#D6EAF8] text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-[#071A2E]">Tuesday &amp; Thursday:</span>
                    <span className="text-slate-600 font-medium">North Bay to Hearst</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-[#071A2E]">Wednesday &amp; Friday:</span>
                    <span className="text-slate-600 font-medium">Hearst to North Bay</span>
                  </div>
                </div>

                <div className="pt-1 space-y-1.5">
                  <p className="text-xs text-slate-600 font-medium">
                    Urgent shipment? Call to confirm the next available pickup.
                  </p>
                  <a
                    href={telLink}
                    className="font-black text-2xl sm:text-3xl text-[#0088FF] hover:text-[#0077EE] transition-colors block tracking-tight"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Contact Item 1: Give us a call */}
              <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0088FF] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm sm:text-base text-[#071A2E]">
                    Give us a call
                  </h4>
                  <a
                    href={telLink}
                    className="font-bold text-sm sm:text-base text-[#0088FF] hover:underline block"
                  >
                    {phone}
                  </a>
                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                    Discuss your route or delivery requirements directly.
                  </p>
                </div>
              </div>

              {/* Contact Item 2: Send an email */}
              <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0088FF] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm sm:text-base text-[#071A2E]">
                    Send an email
                  </h4>
                  <a
                    href={mailtoLink}
                    className="font-bold text-xs sm:text-sm text-[#0088FF] hover:underline break-all block"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Contact Item 3: Serving Northern Ontario & GTA */}
              <div className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0088FF] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h4 className="font-bold text-sm sm:text-base text-[#071A2E]">
                    Serving Northern Ontario and the GTA
                  </h4>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    North Bay, Kirkland Lake, Timmins, Cochrane, Kapuskasing, Hearst, Longlac, Parry Sound, Sudbury. We also serve the GTA and surrounding areas, including Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Oshawa, Pickering, Ajax, Whitby, Hamilton, Newmarket.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/service-areas"
                      className="inline-flex items-center gap-1.5 text-[#0284C7] hover:text-[#006ED6] font-bold text-xs sm:text-sm transition-colors group"
                    >
                      <span>View service areas</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Item 4: What happens next? */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 shadow-2xs">
                <h4 className="font-display font-black text-sm sm:text-base text-[#071A2E] mb-1.5">
                  What happens next?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  We review your shipment and confirm the price, availability, pickup details and delivery window with you.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Privacy & Enquiries Modal */}
      <PrivacyEnquiriesModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        phone={phone}
        email={email}
      />
    </>
  );
};
