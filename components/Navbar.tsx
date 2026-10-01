"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

interface NavbarProps {
  phone?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ phone = "705-978-3001" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isServices = pathname === "/services";
  const isServiceAreas = pathname === "/service-areas" || pathname === "/services-areas";
  const isAbout = pathname === "/about" || pathname === "/about-us";
  const isContact = pathname === "/contact";

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key press or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/", isActive: pathname === "/" },
    { label: "Services", href: "/services", isActive: isServices },
    { label: "Service Areas", href: "/service-areas", isActive: isServiceAreas },
    { label: "About", href: "/about", isActive: isAbout },
    { label: "Contact", href: "/contact", isActive: isContact },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Wordmark */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center shrink-0 group focus:outline-none py-1"
        >
          <Image
            src="/approved-logo.png"
            alt="Bay to Bay Express Inc. Northern Ontario Courier"
            width={288}
            height={58}
            className="h-12 sm:h-[58px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Center: Navigation Link Set (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.isActive
                  ? "text-[#0088FF] font-medium border-b-2 border-[#0088FF] pb-1"
                  : "hover:text-[#0088FF] transition-colors py-1"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions + Hamburger */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Primary CTA Button (Desktop & Tablet) */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex bg-[#0088FF] hover:bg-[#0077EE] text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors items-center gap-1.5"
          >
            <span>Request a Quote</span>
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-[#071A2E] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Simple Clean Mobile Menu Dropdown Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            onClick={closeMenu}
            className="fixed inset-0 top-20 bg-slate-950/40 backdrop-blur-2xs z-40 lg:hidden"
            aria-hidden="true"
          />

          {/* Floating Dropdown Panel */}
          <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-slate-200 shadow-2xl px-4 sm:px-6 pt-3 pb-6 space-y-3 z-50 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`px-3.5 py-3 rounded-xl text-base font-medium transition-colors ${
                    link.isActive
                      ? "text-[#0088FF] bg-sky-50 font-medium"
                      : "text-slate-800 hover:text-[#0088FF] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-[#0088FF] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0088FF]" />
                <span>{phone}</span>
              </a>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="w-full py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Request a Quote</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
