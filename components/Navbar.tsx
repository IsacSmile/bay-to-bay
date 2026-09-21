"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Package,
  MapPin,
  Building2,
  Info,
  HelpCircle,
  Mail,
  Phone,
  ArrowUpRight,
  Trees,
} from "lucide-react";

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

  const menuItems = [
    {
      title: "Services",
      subtitle: "Delivery solutions & small goods",
      href: "#services",
      icon: Package,
      hasArrow: true,
    },
    {
      title: "Service Area",
      subtitle: "North Bay → Hearst corridor",
      href: "#service-areas",
      icon: MapPin,
      badge: "HWY 11",
    },
    {
      title: "Business Solutions",
      subtitle: "Logistics partner for Northern Ontario",
      href: "#business-solutions",
      icon: Building2,
      hasArrow: true,
    },
    {
      title: "About",
      subtitle: "About Bay to Bay Express",
      href: "#about",
      icon: Info,
      hasArrow: true,
    },
    {
      title: "FAQ",
      subtitle: "Common questions & answers",
      href: "#faq",
      icon: HelpCircle,
      hasArrow: true,
    },
    {
      title: "Contact",
      subtitle: "Get in touch with our dispatch",
      href: "#quote",
      icon: Mail,
      hasArrow: true,
    },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Wordmark */}
        <a
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-3 shrink-0 group focus:outline-none"
        >
          {/* Logo Mark: Two Pine Trees + Blue Wave Graphic */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center">
            {/* 2 Pine Trees SVG */}
            <svg
              className="w-8 h-8 text-[#059669]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Left Tree */}
              <path d="M7 2L2 10H5L1 17H7V22H9V17H15L11 10H14L9 2H7Z" />
              {/* Right Tree */}
              <path d="M15 5L11 12H13.5L10 18H15V22H17V18H21L17.5 12H20L15 5Z" opacity="0.9" />
            </svg>
            {/* Blue Wave graphic underneath */}
            <svg
              className="absolute -bottom-1 left-0 w-full h-3 text-[#0088FF]"
              viewBox="0 0 40 12"
              fill="currentColor"
            >
              <path d="M0 6C10 1 20 11 30 5C35 2 38 4 40 6V12H0V6Z" />
            </svg>
          </div>

          {/* Wordmark */}
          <div className="flex flex-col">
            <span className="font-extrabold text-[#071A2E] text-lg sm:text-xl leading-tight tracking-tight flex items-center gap-1">
              <span>Bay to Bay</span>
              <span className="text-[#0088FF] text-xs font-black tracking-widest uppercase">EXPRESS INC.</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-[0.18em] leading-none mt-0.5">
              NORTHERN ONTARIO COURIER
            </span>
          </div>
        </a>

        {/* Center: Navigation Link Set (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
          <a
            href="/"
            className="text-[#0088FF] font-extrabold border-b-2 border-[#0088FF] pb-1"
          >
            Home
          </a>
          <a
            href="#services"
            className="hover:text-[#0088FF] transition-colors py-1"
          >
            Services
          </a>
          <a
            href="#service-areas"
            className="hover:text-[#0088FF] transition-colors py-1 whitespace-nowrap"
          >
            Service Areas
          </a>
          <a
            href="#about"
            className="hover:text-[#0088FF] transition-colors py-1"
          >
            About
          </a>
          <a
            href="#quote"
            className="hover:text-[#0088FF] transition-colors py-1"
          >
            Contact
          </a>
        </nav>

        {/* Right: Actions + Corner Tagline Block */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Primary CTA Button */}
          <a
            href="#quote"
            className="hidden sm:inline-flex bg-[#0088FF] hover:bg-[#0077EE] text-white font-extrabold text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors items-center gap-1.5"
          >
            <span>Request a Quote</span>
          </a>

          {/* Rightmost Corner Tagline Block (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 pl-5 border-l border-slate-200">
            <Trees className="w-5 h-5 text-[#059669] shrink-0" />
            <div className="flex flex-col text-[9px] font-black tracking-widest text-slate-600 uppercase leading-[1.1]">
              <span>PEOPLE</span>
              <span>BUSINESSES</span>
              <span>COMMUNITIES</span>
              <span className="text-[#0088FF]">FURTHER TOGETHER</span>
            </div>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-[#071A2E] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Modal Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#040C1A]/90 backdrop-blur-md p-3 sm:p-4 flex flex-col items-center justify-start overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-md space-y-3 my-auto py-2">
            
            {/* Top White Pill Capsule Header */}
            <div className="w-full bg-[#F4F6F8] rounded-full px-5 py-3 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-2.5">
                {/* Logo Wave Icon */}
                <svg
                  className="w-7 h-7 text-[#0088FF]"
                  viewBox="0 0 40 24"
                  fill="currentColor"
                >
                  <path d="M0 12C10 2 20 22 30 10C35 4 38 8 40 12C30 22 20 2 10 14C5 20 2 16 0 12Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[#071A2E] text-lg leading-none tracking-tight">
                    Bay to Bay
                  </span>
                  <span className="text-[9px] font-black text-[#0088FF] tracking-widest uppercase mt-0.5">
                    EXPRESS INC.
                  </span>
                </div>
              </div>

              {/* Close Button Circle */}
              <button
                type="button"
                onClick={closeMenu}
                className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Dark Navy Card Container */}
            <div className="w-full bg-[#0B1E36] border border-[#183457] rounded-[28px] p-3.5 sm:p-4 space-y-2.5 shadow-2xl">
              
              {/* Navigation Item Cards */}
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={closeMenu}
                    className="w-full bg-[#132740] hover:bg-[#183150] border border-[#1F3D64]/80 rounded-2xl p-3.5 px-4 flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Circle Icon Container */}
                      <div className="w-10 h-10 rounded-full bg-[#183458] border border-sky-500/20 flex items-center justify-center text-[#38BDF8] shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Text Stack */}
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-base tracking-tight leading-tight">
                          {item.title}
                        </span>
                        <span className="text-slate-400 text-xs font-medium mt-0.5">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Right Arrow or Badge */}
                    {item.badge ? (
                      <span className="bg-[#12426E] border border-sky-500/40 text-sky-300 font-bold text-[11px] px-2.5 py-1 rounded-full tracking-wider shrink-0">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors shrink-0" />
                    )}
                  </a>
                );
              })}

              {/* Direct Call Button Card */}
              <div className="w-full bg-[#132740] border border-[#1F3D64]/80 rounded-2xl p-3.5 px-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#183458] border border-sky-500/20 flex items-center justify-center text-[#38BDF8] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white text-base tracking-tight">
                    {phone}
                  </span>
                </div>
                <a
                  href={`tel:${phone}`}
                  className="text-[#38BDF8] hover:text-sky-300 font-bold text-sm tracking-tight hover:underline transition-colors"
                >
                  Call now
                </a>
              </div>

              {/* Primary CTA Button */}
              <a
                href="#quote"
                onClick={closeMenu}
                className="w-full py-3.5 bg-[#007DF2] hover:bg-[#0070DC] active:scale-[0.99] text-white font-extrabold text-base rounded-full flex items-center justify-center gap-2.5 shadow-lg shadow-sky-950/50 transition-all cursor-pointer mt-1"
              >
                <span>Request a quote</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>

            </div>

          </div>
        </div>
      )}
    </header>
  );
};
