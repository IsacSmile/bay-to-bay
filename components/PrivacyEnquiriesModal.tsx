"use client";

import React, { useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";

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
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-[#071A2E] text-white border border-slate-700/80 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800/80 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-slate-800 pb-4 pr-8">
          <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-1">
            Website information
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-[#38BDF8] shrink-0" />
            <span>Privacy &amp; enquiries</span>
          </h2>
        </div>

        {/* Modal Body Content */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 1: How your delivery enquiry works */}
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg mb-1">
              How your delivery enquiry works.
            </h3>
            <h4 className="font-bold text-[#38BDF8] text-xs sm:text-sm mb-2">
              Information you choose to send
            </h4>
            <p>
              The quote form sends the contact and shipment details you enter through FormSubmit to Bay to Bay Express. FormSubmit processes submissions and states that it retains submissions for 30 days. Its service may process information outside Canada. You can also contact us directly by phone or email.
            </p>
          </div>

          {/* Section 2: Delivery enquiries */}
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg mb-1.5">
              Delivery enquiries
            </h3>
            <p>
              Provide only the contact and shipment information needed to discuss your delivery. Do not include patient information, financial account details or other sensitive personal information in the enquiry form.
            </p>
          </div>

          {/* Section 3: Website storage */}
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg mb-1.5">
              Website storage
            </h3>
            <p>
              This website does not save quote entries in browser storage or include advertising trackers. Loading the interactive map connects to OpenStreetMap to request map tiles. These services and the hosting provider may receive technical information such as your IP address. Optional snowfall runs locally in your browser.
            </p>
          </div>

          {/* Section 4: Questions about your information */}
          <div className="bg-[#04101D] rounded-xl p-4 border border-slate-800/80">
            <h3 className="font-bold text-white text-base sm:text-lg mb-1.5">
              Questions about your information
            </h3>
            <p>
              Contact{" "}
              <a
                href={mailtoLink}
                className="text-[#38BDF8] font-bold underline hover:text-white transition-colors"
              >
                {email}
              </a>{" "}
              or call{" "}
              <a
                href={telLink}
                className="text-[#38BDF8] font-bold underline hover:text-white transition-colors"
              >
                {phone}
              </a>{" "}
              to ask about an enquiry you have sent.
            </p>
          </div>
        </div>

        {/* Modal Footer Action */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#0088FF] hover:bg-[#0077EE] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
