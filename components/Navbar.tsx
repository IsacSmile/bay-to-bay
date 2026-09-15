"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Phone,
  ArrowUpRight,
  Menu,
  X,
  Package,
  MapPin,
  Building2,
  Info,
  HelpCircle,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  phone?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ phone = "705-978-3001" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const telLink = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <header className="w-full px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5 relative">
      {/* Top Navbar Card */}
      <div className="max-w-[1350px] mx-auto relative z-50 bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(7,26,46,0.1)] transition-all duration-300 rounded-[28px]">
        <div className="px-4 sm:px-8 h-[58px] flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-full p-0.5"
          >
            <Image
              src="/bay-to-bay-logo.webp"
              alt="Bay to Bay Express Inc. - Northern Ontario Courier Service"
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
            <div>
              <div className="font-extrabold text-[#071A2E] text-base sm:text-lg leading-tight tracking-tight">
                Bay to Bay
              </div>
              <div className="text-[9px] sm:text-[10px] font-black text-brand-blue uppercase tracking-widest leading-none">
                EXPRESS INC.
              </div>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-7 text-[11px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-widest text-slate-700">
            <a href="#services" className="hover:text-brand-blue transition-colors py-1">
              Services
            </a>
            <a href="#service-areas" className="hover:text-brand-blue transition-colors py-1 whitespace-nowrap">
              Service Area
            </a>
            <a href="#business-solutions" className="hover:text-brand-blue transition-colors py-1 whitespace-nowrap">
              Business Solutions
            </a>
            <a href="#about" className="hover:text-brand-blue transition-colors py-1">
              About
            </a>
            <a href="#faq" className="hover:text-brand-blue transition-colors py-1">
              FAQ
            </a>
            <a href="#quote" className="hover:text-brand-blue transition-colors py-1">
              Contact
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={telLink}
              className="hidden xl:flex items-center gap-2 text-xs sm:text-sm font-bold text-[#071A2E] hover:text-brand-blue transition-colors py-1"
            >
              <Phone className="w-3.5 h-3.5 text-brand-blue" />
              <span>{phone}</span>
            </a>

            <Button
              variant="primary"
              size="sm"
              href="#quote"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex text-xs font-extrabold px-4 sm:px-5 py-2.5"
            >
              Request a quote
            </Button>

            {/* Compact Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full transition-all duration-300 bg-slate-100 text-[#071A2E] hover:bg-slate-200"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"}`}>
                {isMenuOpen ? <X className="w-5 h-5 text-[#071A2E]" /> : <Menu className="w-5 h-5 text-[#071A2E]" />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Redesigned Glassmorphic Mobile Navigation Drawer (Smooth Open & Close Transition) */}
      <div
        className={`md:hidden absolute left-3 right-3 sm:left-6 sm:right-6 top-full mt-2.5 z-50 bg-[#07203B]/95 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.5)] rounded-[28px] p-4 sm:p-5 transition-all duration-300 ease-out origin-top ${
          isMenuOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-2 max-w-[1350px] mx-auto">
          {/* Services Tile */}
          <a
            href="#services"
            onClick={closeMenu}
            className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 flex items-center justify-between transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#25A8E8]/15 border border-[#25A8E8]/30 flex items-center justify-center text-[#25A8E8] shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-wide">Services</div>
                <div className="text-[11px] text-slate-300 font-normal">
                  Delivery solutions &amp; small goods
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#25A8E8] group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Service Area Tile */}
          <a
            href="#service-areas"
            onClick={closeMenu}
            className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 flex items-center justify-between transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#25A8E8]/15 border border-[#25A8E8]/30 flex items-center justify-center text-[#25A8E8] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-wide">Service Area</div>
                <div className="text-[11px] text-slate-300 font-normal">
                  North Bay → Hearst corridor
                </div>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#25A8E8]/20 text-[#25A8E8] px-2 py-0.5 rounded-full border border-[#25A8E8]/30">
              Hwy 11
            </span>
          </a>

          {/* Business Solutions Tile */}
          <a
            href="#business-solutions"
            onClick={closeMenu}
            className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 flex items-center justify-between transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#25A8E8]/15 border border-[#25A8E8]/30 flex items-center justify-center text-[#25A8E8] shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-wide">Business Solutions</div>
                <div className="text-[11px] text-slate-300 font-normal">
                  Logistics partner for Northern Ontario
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#25A8E8] group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* About Tile */}
          <a
            href="#about"
            onClick={closeMenu}
            className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 flex items-center justify-between transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#25A8E8]/15 border border-[#25A8E8]/30 flex items-center justify-center text-[#25A8E8] shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-wide">About</div>
                <div className="text-[11px] text-slate-300 font-normal">
                  About Bay to Bay Express
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#25A8E8] group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* FAQ Tile */}
          <a
            href="#faq"
            onClick={closeMenu}
            className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 flex items-center justify-between transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#25A8E8]/15 border border-[#25A8E8]/30 flex items-center justify-center text-[#25A8E8] shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-wide">FAQ</div>
                <div className="text-[11px] text-slate-300 font-normal">
                  Common questions &amp; answers
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#25A8E8] group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Contact Tile */}
          <a
            href="#quote"
            onClick={closeMenu}
            className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-2xl p-3 flex items-center justify-between transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#25A8E8]/15 border border-[#25A8E8]/30 flex items-center justify-center text-[#25A8E8] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white tracking-wide">Contact</div>
                <div className="text-[11px] text-slate-300 font-normal">
                  Get in touch with our dispatch
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#25A8E8] group-hover:translate-x-0.5 transition-all" />
          </a>

          {/* Divider & Actions */}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            {/* Phone Quick Link */}
            <a
              href={telLink}
              onClick={closeMenu}
              className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-2xl py-2.5 px-4 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#25A8E8]" />
                <span className="text-sm font-extrabold text-white">{phone}</span>
              </div>
              <span className="text-xs font-semibold text-[#25A8E8]">Call now</span>
            </a>

            {/* Main CTA Button */}
            <Button
              variant="primary"
              size="md"
              href="#quote"
              fullWidth
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              onClick={closeMenu}
              className="w-full py-3 text-sm font-bold shadow-lg shadow-[#0878D1]/25"
            >
              Request a quote
            </Button>
          </div>
        </div>
      </div>

      {/* Soft Glass Backdrop Overlay (Smooth Fade) */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-[#040C16]/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />
    </header>
  );
};
