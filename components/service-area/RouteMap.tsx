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
  const glowDotRef = useRef<SVGCircleElement>(null);

  const sortedStops = [...stops].sort((a, b) => a.order - b.order);
  const firstStop = sortedStops[0];
  const lastStop = sortedStops[sortedStops.length - 1];

  // SVG viewBox is 1000 x 750 (4:3 aspect ratio)
  // Coordinates mapping percentage to viewBox (x * 10, y * 7.5)
  // 01 North Bay: 51.5%, 75.5% -> (515, 566)
  // 02 Kirkland Lake: 58.0%, 62.5% -> (580, 468)
  // 03 Timmins: 64.0%, 51.0% -> (640, 3825)
  // 04 Cochrane: 70.8%, 41.5% -> (708, 311)
  // 05 Kapuskasing: 77.0%, 32.5% -> (770, 244)
  // 06 Hearst: 84.8%, 21.5% -> (848, 161)
  // 07 Longlac: 89.5%, 50.5% -> (895, 378)
  const pathData =
    "M 515 566 C 540 520, 560 485, 580 468 C 605 425, 620 395, 640 382 C 665 352, 685 328, 708 311 C 732 282, 750 258, 770 244 C 798 212, 825 182, 848 161 C 868 230, 882 310, 895 378";

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGSAP();
    const path = mainPathRef.current;
    const dot = glowDotRef.current;
    const container = containerRef.current;

    if (!path || !container) return;

    const length = path.getTotalLength();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 });
      if (dot) gsap.set(dot, { opacity: 0 });
      return;
    }

    // Set initial stroke dash setup
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    if (dot) {
      gsap.set(dot, { opacity: 0 });
    }

    const ctx = gsap.context(() => {
      // Step 1: Draw route path on scroll into view
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          once: true,
        },
        onComplete: () => {
          // Step 2: Continuous traveling glow dot loop along the route
          if (!dot) return;

          const dotObj = { progress: 0 };
          gsap.set(dot, { opacity: 1 });

          gsap.to(dotObj, {
            progress: 1,
            duration: 4.5,
            ease: "none",
            repeat: -1,
            onUpdate: () => {
              const pt = path.getPointAtLength(dotObj.progress * length);
              gsap.set(dot, { cx: pt.x, cy: pt.y });
            },
          });
        },
      });
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
      <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 inline-flex items-center gap-2 bg-[#071A2E]/85 backdrop-blur-md border border-white/20 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-white shadow-lg">
        <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shadow-xs shadow-brand-orange shrink-0" />
        <span>{badgeText}</span>
      </div>

      {/* Bottom-Left Route Range Pill (Dynamically Derived from first & last stop) */}
      <div className="absolute bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 z-20 inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-extrabold text-[#071A2E] shadow-xl">
        <span>{firstStop?.name || "North Bay"}</span>
        <span className="text-brand-blue font-black mx-0.5">→</span>
        <span>{lastStop?.name || "Hearst"}</span>
      </div>

      {/* SVG Animated Route Overlay */}
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

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Faint Outer Glow Path */}
        <path
          d={pathData}
          fill="none"
          stroke="#25A8E8"
          strokeWidth="8"
          strokeOpacity="0.25"
          filter="url(#glowFilter)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Main Drawn Animated Line */}
        <path
          ref={mainPathRef}
          d={pathData}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Traveling Ambient Glow Dot */}
        <circle
          ref={glowDotRef}
          r="5.5"
          fill="#FFFFFF"
          stroke="#25A8E8"
          strokeWidth="2.5"
          filter="url(#glowFilter)"
          style={{ opacity: 0 }}
        />
      </svg>

      {/* 7 Numbered Route Stop Pins (Percent-based Positioning) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {sortedStops.map((stop) => {
          const x = stop.xPercent ?? 50;
          const y = stop.yPercent ?? 50;
          const isEnd = stop.isEnd;

          return (
            <div
              key={stop.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2 group/pin"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Circular Number Badge */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-[#071A2E] text-white border-1.5 sm:border-2 border-white flex items-center justify-center text-[9px] sm:text-[11px] font-black shadow-md shrink-0 transition-transform duration-300 group-hover/pin:scale-110">
                {stop.stopNumber}
              </div>

              {/* Stop Name Label */}
              <span
                className={`text-[9px] sm:text-[11px] md:text-xs font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap ${
                  isEnd ? "order-first mr-1 sm:mr-1.5" : "order-last ml-0.5 sm:ml-1"
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
