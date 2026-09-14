"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { RouteStopItem } from "@/lib/prisma";
import { getGSAP } from "@/lib/gsap";

interface RouteMapProps {
  stops: RouteStopItem[];
  badgeText?: string;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  stops,
  badgeText = "Scheduled regional route",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const vanRef = useRef<SVGGElement>(null);

  const sortedStops = [...stops].sort((a, b) => a.order - b.order);
  const firstStop = sortedStops[0];
  const lastStop = sortedStops[sortedStops.length - 1];

  // SVG viewBox is 1000 x 750 (4:3 aspect ratio locked container)
  // Coordinates precisely mapped to x_percent/y_percent:
  // 01 North Bay:      24%, 88% -> (240, 660)
  // 02 Kirkland Lake:  35%, 78% -> (350, 585)
  // 03 Timmins:        46%, 68% -> (460, 510)
  // 04 Cochrane:       55%, 58% -> (550, 435)
  // 05 Kapuskasing:    65%, 46% -> (650, 345)
  // 06 Hearst:         74%, 35% -> (740, 263)
  // 07 Longlac:        85%, 26% -> (850, 195)
  //
  // Exactly ONE single unbroken cubic-bezier curve passing through all 7 stops:
  const pathData =
    "M 240 660 C 275 635, 315 610, 350 585 C 385 560, 425 535, 460 510 C 490 485, 520 460, 550 435 C 585 405, 615 375, 650 345 C 680 315, 710 288, 740 263 C 775 238, 815 218, 850 195";

  useEffect(() => {
    const { gsap } = getGSAP();
    const path = mainPathRef.current;
    const van = vanRef.current;
    const container = containerRef.current;

    if (!path || !van || !container) return;

    const length = path.getTotalLength();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
      gsap.set(van, {
        opacity: 1,
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 0,
        },
      });
      return;
    }

    // Set initial stroke dash setup for line-draw animation
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    gsap.set(van, { opacity: 0 });

    const ctx = gsap.context(() => {
      // Step 1: Draw route path on scroll into view
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          once: true,
        },
      });

      // Step 2: Animated Delivery Van loop starts concurrently on scroll
      const vanTl = gsap.timeline({
        repeat: -1,
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          once: true,
        },
      });

      vanTl
        .set(van, { opacity: 1 })
        .to(van, {
          motionPath: {
            path: path,
            align: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
          duration: 11,
          ease: "sine.inOut",
        })
        .to(van, { opacity: 0, duration: 0.4 });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-[#071F3B] select-none group"
    >
      {/* Background Image */}
      <Image
        src="/bay-to-bay-route.webp"
        alt="Northern Ontario Highway 11 Service Area Route Map"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover object-center scale-[1.01] transition-transform duration-700 group-hover:scale-105"
      />

      {/* Soft Vignette Frame */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#04101D]/60 via-transparent to-[#04101D]/30 pointer-events-none z-10" />

      {/* Top-Left Badge */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 inline-flex items-center gap-1.5 sm:gap-2 bg-[#071A2E]/85 backdrop-blur-md border border-white/20 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white shadow-lg">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-orange animate-pulse shadow-xs shadow-brand-orange shrink-0" />
        <span>{badgeText}</span>
      </div>

      {/* Bottom-Right Route Range Pill */}
      <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md border border-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-extrabold text-[#071A2E] shadow-xl">
        <span>{firstStop?.name || "North Bay"}</span>
        <span className="text-brand-blue font-black mx-0.5">→</span>
        <span>{lastStop?.name || "Longlac"}</span>
      </div>

      {/* SVG Animated Route & Delivery Van Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 1000 750"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#25A8E8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="1" />
          </linearGradient>

          <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* EXACTLY ONE Main Drawn Animated Route Line */}
        <path
          ref={mainPathRef}
          d={pathData}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glowFilter)"
        />

        {/* Animated Delivery Van Graphic */}
        <g ref={vanRef} style={{ opacity: 0 }}>
          {/* Headlight beam forward glow */}
          <polygon
            points="16,-4 36,-10 36,8 16,3"
            fill="#FEF08A"
            opacity="0.45"
            filter="url(#glowFilter)"
          />

          {/* Van Shadow / Underglow */}
          <ellipse cx="0" cy="9" rx="18" ry="4" fill="#04101D" opacity="0.6" />

          {/* Main Van Body */}
          <rect
            x="-18"
            y="-10"
            width="34"
            height="18"
            rx="3"
            fill="#071A2E"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />

          {/* Cabin Windshield */}
          <path
            d="M 6 -9 L 13 -3 L 15 0 L 15 7 L 6 7 Z"
            fill="#25A8E8"
            opacity="0.95"
          />
          <path d="M 7 -7 L 12 -3 L 7 -3 Z" fill="#BAE6FD" />

          {/* Brand Accent Stripe */}
          <rect x="-16" y="0" width="22" height="3" fill="#FF7A00" rx="1" />

          {/* Express Box Graphic */}
          <rect x="-13" y="-7" width="6" height="5" fill="#FF7A00" rx="1" />

          {/* Wheels */}
          <circle cx="-10" cy="8" r="3.5" fill="#04101D" stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="9" cy="8" r="3.5" fill="#04101D" stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="-10" cy="8" r="1.2" fill="#38BDF8" />
          <circle cx="9" cy="8" r="1.2" fill="#38BDF8" />
        </g>
      </svg>

      {/* 7 Numbered Route Stop Pins (Percent-based Positioning & Collision Prevention) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {sortedStops.map((stop, idx) => {
          const x = stop.xPercent ?? 50;
          const y = stop.yPercent ?? 50;

          // Smart label placement strategy to prevent text collision across waypoints:
          // Odd stops (Timmins, Kapuskasing, Longlac) render label to the LEFT (flex-row-reverse).
          // Even stops (North Bay, Kirkland Lake, Cochrane, Hearst) render label to the RIGHT (flex-row).
          const isLeftLabel = idx === 2 || idx === 4 || idx === 6;

          // For Stop 01 (North Bay), hide text on mobile (sm:) to prevent overlap with the bottom route pill badge
          const isNorthBay = idx === 0;

          return (
            <div
              key={stop.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2 group/pin ${
                isLeftLabel ? "flex-row-reverse" : "flex-row"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Circular Number Badge */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-[#071A2E] text-white border-1.5 sm:border-2 border-white flex items-center justify-center text-[9px] sm:text-[11px] font-black shadow-md shrink-0 transition-transform duration-300 group-hover/pin:scale-110">
                {stop.stopNumber}
              </div>

              {/* Stop Name Label */}
              <span
                className={`text-[9px] sm:text-[11px] md:text-xs font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap bg-[#071A2E]/70 backdrop-blur-xs px-1.5 py-0.5 rounded-md border border-white/10 ${
                  isLeftLabel ? "mr-0.5 sm:mr-1" : "ml-0.5 sm:ml-1"
                }`}
              >
                {stop.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

