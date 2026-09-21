"use client";

import React, { useState, useEffect } from "react";
import { Trees, Menu, X, ArrowRight } from "lucide-react";

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
            <span className="font-extrabold text-[#071A2E] text-lg sm:text-xl leading-tight tracking-tight">
              Bay to Bay Express Inc.
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-6 shadow-xl space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-bold text-slate-800">
            <a
              href="/"
              onClick={closeMenu}
              className="text-[#0088FF] font-extrabold py-1"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={closeMenu}
              className="hover:text-[#0088FF] py-1"
            >
              Services
            </a>
            <a
              href="#service-areas"
              onClick={closeMenu}
              className="hover:text-[#0088FF] py-1"
            >
              Service Areas
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="hover:text-[#0088FF] py-1"
            >
              About
            </a>
            <a
              href="#quote"
              onClick={closeMenu}
              className="hover:text-[#0088FF] py-1"
            >
              Contact
            </a>
          </nav>
          <div className="pt-2">
            <a
              href="#quote"
              onClick={closeMenu}
              className="w-full bg-[#0088FF] hover:bg-[#0077EE] text-white font-extrabold text-sm py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
