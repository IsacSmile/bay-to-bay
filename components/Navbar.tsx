"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, ArrowUpRight, Menu, X } from "lucide-react";
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
    <header className="w-full px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5">
      <div className="max-w-[1350px] mx-auto bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(7,26,46,0.1)] relative z-50 transition-all duration-300 rounded-[28px]">
        <div className="px-5 sm:px-8 h-[58px] flex items-center justify-between">
          {/* Brand Logo */}
          <a href="/" onClick={closeMenu} className="flex items-center gap-3 shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-full p-0.5">
            <Image
              src="/bay-to-bay-logo.webp"
              alt="Bay to Bay Express Inc."
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
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-700 uppercase tracking-widest">
            <a href="#services" className="hover:text-brand-blue transition-colors py-1">
              Services
            </a>
            <a href="#routes" className="hover:text-brand-blue transition-colors py-1">
              Routes
            </a>
            <a href="#about" className="hover:text-brand-blue transition-colors py-1">
              About
            </a>
            <a href="#contact" className="hover:text-brand-blue transition-colors py-1">
              Contact
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href={telLink}
              className="hidden lg:flex items-center gap-2 text-xs sm:text-sm font-bold text-[#071A2E] hover:text-brand-blue transition-colors py-1"
            >
              <Phone className="w-3.5 h-3.5 text-brand-blue" />
              <span>{phone}</span>
            </a>

            <Button
              variant="primary"
              size="sm"
              href="#quote"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex text-xs font-extrabold px-5 py-2.5"
            >
              Request a quote
            </Button>

            {/* Compact Mobile Menu Toggle Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden text-[#071A2E] hover:text-[#071A2E] p-2 hover:bg-slate-100 rounded-full transition-colors min-h-0 border-0"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-[#071A2E]" />
              ) : (
                <Menu className="w-5 h-5 text-[#071A2E]" />
              )}
            </Button>
          </div>
        </div>

        {/* Animated Mobile Navigation Drawer */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out border-t border-slate-100 bg-white rounded-b-[28px] ${
            isMenuOpen
              ? "max-h-[calc(100vh-100px)] opacity-100 py-5 px-6 pointer-events-auto overflow-y-auto scrollbar-none"
              : "max-h-0 opacity-0 py-0 px-6 pointer-events-none overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-3.5 font-extrabold text-[#071A2E] text-base max-w-[1350px] mx-auto">
            <a
              href="#services"
              onClick={closeMenu}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors uppercase tracking-wider text-sm"
            >
              Services
            </a>
            <a
              href="#routes"
              onClick={closeMenu}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors uppercase tracking-wider text-sm"
            >
              Routes
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors uppercase tracking-wider text-sm"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="py-2.5 px-3 rounded-xl hover:bg-slate-100 hover:text-brand-blue transition-colors uppercase tracking-wider text-sm"
            >
              Contact
            </a>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-3">
              <a
                href={telLink}
                onClick={closeMenu}
                className="flex items-center gap-2.5 text-base font-extrabold text-[#071A2E] py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <Phone className="w-4 h-4 text-brand-blue" />
                <span>{phone}</span>
              </a>

              <Button
                variant="primary"
                size="md"
                href="#quote"
                fullWidth
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
                onClick={closeMenu}
                className="w-full py-3.5"
              >
                Request a quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Semi-transparent Dim Backdrop Overlay (No blur) */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-[#040C16]/40 z-30 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </header>
  );
};

