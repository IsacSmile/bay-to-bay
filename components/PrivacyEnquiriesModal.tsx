"use client";

import React, { useEffect } from "react";
import { X, Shield, Lock, Mail, Phone, CheckCircle2, AlertTriangle } from "lucide-react";

interface PrivacyEnquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone?: string;
  email?: string;
}

export const PrivacyEnquiriesModal: React.FC<PrivacyEnquiriesModalProps> = ({
  isOpen,
  onClose,
  phone = "705-978-3001",
  email = "baytobayexpress@gmail.com",
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const telLink = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const mailtoLink = `mailto:${email}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-[#081728] text-slate-200 border border-slate-700/60 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/70 p-6 sm:p-8 my-auto text-left animate-in zoom-in-95 duration-200 scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Privacy &amp; Enquiries
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How we handle your delivery information and website privacy.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-5 text-xs sm:text-[13px] leading-relaxed text-slate-300">
          
          {/* Card 1: Enquiry Submission */}
          <div className="bg-[#0D2138]/60 border border-slate-700/50 rounded-2xl p-4.5 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Lock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>How your delivery enquiry is handled</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed">
              When you submit a quote request, your contact details and parcel specifications are securely routed to our dispatch team through FormSubmit. Submissions are retained for up to 30 days solely to arrange and quote your shipment.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                No advertising trackers
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-500/10 border border-sky-500/20 text-sky-300">
                <CheckCircle2 className="w-3 h-3" />
                Never sold to third parties
              </span>
            </div>
          </div>

          {/* Card 2: Sensitive Data Notice */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4.5 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-200 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sensitive Information Notice</span>
            </div>
            <p className="text-amber-200/80 text-xs sm:text-[13px] leading-relaxed">
              Please provide only the pickup/drop-off and cargo details necessary to quote your run. Do not enter patient health records, banking credentials, or sensitive personal identity numbers in the web enquiry form.
            </p>
          </div>

          {/* Card 3: Storage & Technical info */}
          <div className="space-y-1.5 px-1">
            <h3 className="font-bold text-white text-sm">
              Website &amp; Map Data
            </h3>
            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
              This site does not store entries in local browser storage or profile your browsing activity. Our interactive route map requests tile data directly from OpenStreetMap.
            </p>
          </div>

          {/* Card 4: Questions & Direct Contact */}
          <div className="bg-[#0D2138]/40 border border-slate-800 rounded-2xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-sm">
                Questions about your data?
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                Contact our privacy and dispatch desk anytime.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={telLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Call {phone}</span>
              </a>
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
