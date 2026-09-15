"use client";

import React, { useEffect, useRef } from "react";
import { RouteStopItem } from "@/lib/prisma";
import { getGSAP } from "@/lib/gsap";

interface AnimatedRouteBarProps {
  stops: RouteStopItem[];
  tagline: string;
}

export const AnimatedRouteBar: React.FC<AnimatedRouteBarProps> = ({ stops, tagline }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Desktop Refs
  const desktopStopCircleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopLineFillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile Refs
  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobileStopCircleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sortedStops = [...stops].sort((a, b) => a.order - b.order);
  const numStops = sortedStops.length;

  // Mobile Winding Road Path Math
  const viewBoxWidth = 400;
  const stepY = 76;
  const paddingTop = 36;
  const paddingBottom = 36;
  const totalSvgHeight = paddingTop + Math.max(0, numStops - 1) * stepY + paddingBottom;

  // Precise coordinates to ensure right-aligned circles never clip
  // Left stops at x=75 (18.75%), Right stops at x=310 (77.5%)
  const leftX = 75;
  const rightX = 310;

  // Generate mobile coordinates
  const mobileCoords = sortedStops.map((_, idx) => {
    const isLeft = idx % 2 === 0;
    const x = isLeft ? leftX : rightX;
    const y = paddingTop + idx * stepY;
    return { x, y, isLeft };
  });

  // Generate smooth cubic bezier SVG path string
  let mobilePathD = "";
  if (mobileCoords.length > 0) {
    mobilePathD = `M ${mobileCoords[0].x} ${mobileCoords[0].y}`;
    for (let i = 0; i < mobileCoords.length - 1; i++) {
      const curr = mobileCoords[i];
      const next = mobileCoords[i + 1];
      const midY = curr.y + (next.y - curr.y) / 2;
      mobilePathD += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
    }
  }

  useEffect(() => {
    const { gsap } = getGSAP();
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Desktop elements
    const desktopFills = desktopLineFillRefs.current.filter(Boolean);
    const desktopCircles = desktopStopCircleRefs.current.filter(Boolean);

    // Mobile elements
    const mobilePath = mobilePathRef.current;
    const mobileCircles = mobileStopCircleRefs.current.filter(Boolean);

    // If Reduced Motion requested
    if (prefersReducedMotion) {
      desktopFills.forEach((fill) => {
        if (fill) fill.style.transform = "scaleX(1)";
      });
      if (mobilePath) {
        gsap.set(mobilePath, { strokeDasharray: "none", strokeDashoffset: 0 });
      }
      mobileCircles.forEach((circle) => {
        if (circle) gsap.set(circle, { opacity: 1, scale: 1 });
      });
      return;
    }

    // Set initial desktop state
    desktopFills.forEach((fill) => {
      if (fill) fill.style.transform = "scaleX(0)";
    });

    // Set initial mobile state
    let pathLength = 0;
    if (mobilePath) {
      pathLength = mobilePath.getTotalLength();
      gsap.set(mobilePath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
    }

    const ctx = gsap.context(() => {
      // 1. Desktop Animation Timeline (Play-once on scroll into view)
      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true,
        },
      });

      if (desktopCircles[0]) {
        desktopTl.to(desktopCircles[0], {
          scale: 1.15,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        });
      }

      desktopFills.forEach((fill, idx) => {
        desktopTl.to(fill, {
          scaleX: 1,
          duration: 0.35,
          ease: "power1.inOut",
        });

        const nextCircle = desktopCircles[idx + 1];
        if (nextCircle) {
          desktopTl.to(
            nextCircle,
            {
              scale: 1.2,
              duration: 0.15,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            },
            "-=0.08"
          );
        }
      });

      // 2. Mobile Animation Timeline (Scrubbed Scroll-Linked Draw)
      if (mobilePath) {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });

        // Scrub path draw line from full offset -> 0
        mobileTl.fromTo(
          mobilePath,
          { strokeDashoffset: pathLength },
          { strokeDashoffset: 0, ease: "none" }
        );

        // Synchronize stop node reveals with scrub progress
        if (mobileCircles.length > 0) {
          mobileCircles.forEach((circle, idx) => {
            const progressRatio = idx / Math.max(1, mobileCircles.length - 1);
            mobileTl.fromTo(
              circle,
              { scale: 0.85, opacity: 0.4 },
              { scale: 1, opacity: 1, duration: 0.1, ease: "power1.out" },
              progressRatio
            );
          });
        }
      }
    }, container);

    return () => ctx.revert();
  }, [numStops]);

  return (
    <div ref={containerRef} className="border-y border-slate-200/80 py-6 my-8 sm:my-10">
      
      {/* 1. DESKTOP VIEW (md:flex) — Single horizontal row */}
      <div className="hidden md:flex items-center justify-between gap-4 lg:gap-6">
        {/* Horizontal Chain Container */}
        <div className="relative flex-1 overflow-hidden">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 px-1">
            {sortedStops.map((stop, index) => {
              const isFirst = stop.isStart || index === 0;
              const isLast = stop.isEnd || index === sortedStops.length - 1;
              const autoNumber = String(stop.order || index + 1).padStart(2, "0");

              return (
                <React.Fragment key={stop.id || index}>
                  {/* Stop Node */}
                  <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
                    <div
                      ref={(el) => {
                        desktopStopCircleRefs.current[index] = el;
                      }}
                      className={`rounded-full flex items-center justify-center font-black transition-transform duration-200 shrink-0 select-none ${
                        isFirst
                          ? "w-7 h-7 sm:w-8 sm:h-8 bg-[#071A2E] text-white text-[11px] sm:text-xs shadow-md shadow-[#071A2E]/20 border border-[#071A2E]"
                          : isLast
                          ? "w-7 h-7 sm:w-8 sm:h-8 bg-[#F5A623] text-white text-[11px] sm:text-xs shadow-md shadow-[#F5A623]/30 border border-[#F5A623]"
                          : "w-6 h-6 sm:w-7 sm:h-7 bg-white border-2 border-sky-300 text-brand-blue text-[10px] sm:text-[11px] shadow-2xs"
                      }`}
                    >
                      {autoNumber}
                    </div>

                    <span
                      className={`tracking-tight whitespace-nowrap ${
                        isFirst || isLast
                          ? "font-extrabold text-[#071A2E] text-xs sm:text-sm"
                          : "font-bold text-slate-700 text-xs sm:text-xs"
                      }`}
                    >
                      {stop.name}
                    </span>
                  </div>

                  {/* Connecting Line Segment */}
                  {index < sortedStops.length - 1 && (
                    <div className="flex-1 min-w-[24px] sm:min-w-[36px] md:min-w-[48px] max-w-[80px] h-[3px] bg-slate-200/90 rounded-full relative overflow-hidden mx-1 sm:mx-1.5 shrink">
                      <div
                        ref={(el) => {
                          desktopLineFillRefs.current[index] = el;
                        }}
                        className="absolute inset-0 bg-brand-blue origin-left"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-black tracking-widest text-slate-500 uppercase shrink-0">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
          <span>{tagline}</span>
        </div>
      </div>

      {/* 2. MOBILE VIEW (block md:hidden) — Winding Road Switchback Layout */}
      <div className="block md:hidden">
        <div className="relative w-full max-w-[380px] mx-auto px-4" style={{ height: `${totalSvgHeight}px` }}>
          
          {/* SVG Background Path & Animated Curved Line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${viewBoxWidth} ${totalSvgHeight}`}
            preserveAspectRatio="none"
          >
            {/* Soft Gray Static Track Line */}
            <path
              d={mobilePathD}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />

            {/* Animated Brand Blue Progress Fill Line */}
            <path
              ref={mobilePathRef}
              d={mobilePathD}
              fill="none"
              stroke="#25A8E8"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* HTML Overlay Stop Circles + Name Labels */}
          <div className="absolute inset-0 pointer-events-auto">
            {sortedStops.map((stop, index) => {
              const coord = mobileCoords[index];
              const isFirst = stop.isStart || index === 0;
              const isLast = stop.isEnd || index === sortedStops.length - 1;
              const autoNumber = String(stop.order || index + 1).padStart(2, "0");
              const isLeft = coord.isLeft;

              return (
                <div
                  key={stop.id || index}
                  ref={(el) => {
                    mobileStopCircleRefs.current[index] = el;
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(coord.x / viewBoxWidth) * 100}%`,
                    top: `${(coord.y / totalSvgHeight) * 100}%`,
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Circle Node (Centered exactly at coord.x, coord.y) */}
                    <div
                      className={`rounded-full flex items-center justify-center font-black transition-transform duration-200 shrink-0 select-none ${
                        isFirst
                          ? "w-8 h-8 bg-[#071A2E] text-white text-xs shadow-md shadow-[#071A2E]/20 border border-[#071A2E]"
                          : isLast
                          ? "w-8 h-8 bg-[#F5A623] text-white text-xs shadow-md shadow-[#F5A623]/30 border border-[#F5A623]"
                          : "w-7 h-7 bg-white border-2 border-sky-300 text-brand-blue text-[11px] shadow-2xs"
                      }`}
                    >
                      {autoNumber}
                    </div>

                    {/* Name Label (Positioned relative to circle: right for left-stops, left for right-stops) */}
                    <span
                      className={`absolute top-1/2 -translate-y-1/2 tracking-tight whitespace-nowrap bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs z-10 ${
                        isLeft ? "left-full ml-2.5" : "right-full mr-2.5"
                      } ${
                        isFirst || isLast
                          ? "font-extrabold text-[#071A2E] text-xs"
                          : "font-bold text-slate-700 text-xs"
                      }`}
                    >
                      {stop.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regional Focus Tag on Mobile */}
        <div className="mt-4 pt-3 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-black tracking-widest text-slate-500 uppercase border-t border-slate-200/50">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
          <span>{tagline}</span>
        </div>
      </div>

    </div>
  );
};
