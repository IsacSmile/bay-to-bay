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
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-slate-800 border border-slate-200/90 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-slate-900/20 p-6 sm:p-8 my-auto text-left animate-in zoom-in-95 duration-200 scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0088FF] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#071A2E] tracking-tight">
                Privacy &amp; Enquiries
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                How we handle your delivery information and website privacy.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-4.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">
          
          {/* Card 1: Enquiry Submission */}
          <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4.5 space-y-2">
            <div className="flex items-center gap-2 text-[#071A2E] font-bold text-sm">
              <Lock className="w-4 h-4 text-[#0088FF] shrink-0" />
              <span>How your delivery enquiry is handled</span>
            </div>
            <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
              When you submit a quote request, your contact details and shipment information are securely routed to our dispatch team through FormSubmit. Submissions are retained for up to 30 days solely to arrange and quote your delivery.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 border border-emerald-200/80 text-emerald-700">
                <CheckCircle2 className="w-3 h-3" />
                No advertising trackers
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-50 border border-sky-200/80 text-[#0077EE]">
                <CheckCircle2 className="w-3 h-3" />
                Never sold to third parties
              </span>
            </div>
          </div>

          {/* Card 2: Sensitive Data Notice */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4.5 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Sensitive Information Notice</span>
            </div>
            <p className="text-amber-800/90 text-xs sm:text-[13px] leading-relaxed">
              Please provide only the pickup/destination and cargo specifications needed to discuss your delivery. Do not enter patient health records, banking credentials, or personal identity numbers in the web enquiry form.
            </p>
          </div>

          {/* Card 3: Storage & Technical info */}
          <div className="space-y-1.5 px-1">
            <h3 className="font-bold text-[#071A2E] text-sm">
              Website &amp; Map Data
            </h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
              This website does not store quote entries in local browser storage or track your browsing habits. Our interactive route map requests map tiles directly from OpenStreetMap.
            </p>
          </div>

          {/* Card 4: Questions & Direct Contact */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-[#071A2E] text-sm">
                Questions about your information?
              </h4>
              <p className="text-slate-500 text-xs mt-0.5">
                Contact our privacy and dispatch desk anytime.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={telLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#071A2E] font-bold text-xs border border-slate-200 shadow-2xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#0088FF]" />
                <span>Call {phone}</span>
              </a>
              <a
                href={mailtoLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#071A2E] font-bold text-xs border border-slate-200 shadow-2xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0088FF]" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#071A2E] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
