"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RouteStop {
  id: string;
  name: string;
  description: string;
  isOrigin?: boolean;
  isTerminal?: boolean;
}

const ROUTE_STOPS: RouteStop[] = [
  {
    id: "north-bay",
    name: "North Bay",
    description: "Route origin · Ask about pickup and delivery arrangements.",
    isOrigin: true,
  },
  {
    id: "temiskaming-shores",
    name: "Temiskaming Shores",
    description: "Key Highway 11 corridor stop serving Lake Timiskaming communities.",
  },
  {
    id: "kirkland-lake",
    name: "Kirkland Lake",
    description: "Scheduled commercial & medical delivery connecting gold belt hubs.",
  },
  {
    id: "matheson",
    name: "Matheson",
    description: "Central junction connecting Highway 11 and regional access roads.",
  },
  {
    id: "timmins",
    name: "Timmins",
    description: "Major regional distribution & commercial delivery terminal.",
  },
  {
    id: "cochrane",
    name: "Cochrane",
    description: "Northern gateway hub connecting the railhead and Highway 11 route.",
  },
  {
    id: "kapuskasing",
    name: "Kapuskasing",
    description: "Key industrial and community commercial delivery center.",
  },
  {
    id: "hearst",
    name: "Hearst",
    description: "Primary route terminal for scheduled northbound runs.",
    isTerminal: true,
  },
  {
    id: "longlac",
    name: "Longlac",
    description: "Extended northern stop serving regional businesses beyond Hearst.",
  },
];

const SCHEDULE_RUNS = [
  {
    day: "EVERY TUESDAY",
    route: "North Bay → Hearst",
    type: "Northbound delivery",
    action: "Enquire for Tuesday →",
    isReturn: false,
  },
  {
    day: "EVERY WEDNESDAY",
    route: "Hearst → North Bay",
    type: "Return delivery",
    action: "Enquire for Wednesday →",
    isReturn: true,
  },
  {
    day: "EVERY THURSDAY",
    route: "North Bay → Hearst",
    type: "Northbound delivery",
    action: "Enquire for Thursday →",
    isReturn: false,
  },
  {
    day: "EVERY FRIDAY",
    route: "Hearst → North Bay",
    type: "Return delivery",
    action: "Enquire for Friday →",
    isReturn: true,
  },
];

interface TwiceWeeklyRouteProps {
  phone?: string;
}

export const TwiceWeeklyRoute: React.FC<TwiceWeeklyRouteProps> = ({
  phone = "705-978-3001",
}) => {
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [vanLeft, setVanLeft] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Calculate and update van position centered above current active stop
  const updatePosition = (index: number) => {
    const stopEl = stopRefs.current[index];
    const trackEl = trackRef.current;
    if (stopEl && trackEl) {
      const trackRect = trackEl.getBoundingClientRect();
      const stopRect = stopEl.getBoundingClientRect();
      if (trackRect.width > 0 && stopRect.width > 0) {
        const center = stopRect.left - trackRect.left + stopRect.width / 2;
        if (center > 0) {
          setVanLeft(center);
          return;
        }
      }

      // Fallback if getBoundingClientRect has 0 width
      if (stopEl.offsetLeft > 0) {
        setVanLeft(stopEl.offsetLeft + stopEl.offsetWidth / 2 + 16);
      }
    }
  };

  useEffect(() => {
    updatePosition(activeStopIndex);

    const t1 = setTimeout(() => updatePosition(activeStopIndex), 50);
    const t2 = setTimeout(() => updatePosition(activeStopIndex), 150);
    const t3 = setTimeout(() => updatePosition(activeStopIndex), 400);

    const handleResize = () => updatePosition(activeStopIndex);
    window.addEventListener("resize", handleResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      observer = new ResizeObserver(() => {
        updatePosition(activeStopIndex);
      });
      observer.observe(trackRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, [activeStopIndex]);

  // Center active stop into view horizontally if on smaller screens
  const centerStopInView = (index: number) => {
    const stopEl = stopRefs.current[index];
    const scrollContainer = scrollContainerRef.current;
    if (stopEl && scrollContainer) {
      const containerWidth = scrollContainer.offsetWidth;
      const targetScroll = stopEl.offsetLeft + stopEl.offsetWidth / 2 - containerWidth / 2;
      scrollContainer.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  };

  const handleStopClick = (index: number) => {
    setActiveStopIndex(index);
    updatePosition(index);
    centerStopInView(index);
  };

  // Auto-play infinite loop animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStopIndex((prev) => {
        const next = (prev + 1) % ROUTE_STOPS.length;
        updatePosition(next);
        centerStopInView(next);
        return next;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  const activeStop = ROUTE_STOPS[activeStopIndex];
  const telLink = `tel:${phone.replace(/[^0-9]/g, "")}`;

  return (
    <section id="route" className="w-full bg-[#062E57] py-14 sm:py-18 lg:py-22 text-white overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-8 mb-8 sm:mb-10">
          <div>
            <span className="text-[#38BDF8] text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase block mb-2">
              OUR SPECIAL TWICE-WEEKLY ROUTE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-tight">
              North Bay ↔ Hearst
            </h2>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed max-w-md lg:text-left">
            Two northbound runs each week, with return service the following day.
            Plan time-sensitive deliveries in either direction.
          </p>
        </div>

        {/* 2. Main Interactive White Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl text-[#071A2E]">
          
          {/* Header row of card */}
          <div className="pb-8 sm:pb-10 border-b border-slate-100">
            <div>
              <span className="text-[#059669] text-xs font-black tracking-widest uppercase block mb-1">
                STOPS ALONG THE WAY
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#071A2E] tracking-tight">
                Connecting communities, all the way to Longlac.
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-normal mt-1">
                Select a stop to plan your delivery. On smaller screens, swipe to see the full route.
              </p>
            </div>
          </div>

          {/* 3. Interactive Route Timeline */}
          <div className="py-6 sm:py-8">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto py-2 scrollbar-none"
            >
              <div
                ref={trackRef}
                className="min-w-[760px] lg:min-w-0 relative px-4 pt-14 sm:pt-16 pb-2"
              >
                {/* Smooth Moving Van Indicator */}
                <div
                  className="absolute top-1 sm:top-2 z-30 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    left:
                      vanLeft !== null
                        ? `${vanLeft}px`
                        : `calc(40px + ${(activeStopIndex / (ROUTE_STOPS.length - 1)) * 100}% - ${(activeStopIndex / (ROUTE_STOPS.length - 1)) * 80}px)`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <picture>
                    <source srcSet="/route-van.webp" type="image/webp" />
                    <img
                      src="/route-van.png"
                      alt="Bay to Bay Express Delivery Van"
                      draggable={false}
                      className="w-20 sm:w-24 md:w-28 h-auto drop-shadow-md select-none object-contain pointer-events-none"
                    />
                  </picture>
                </div>

                {/* Timeline stops & connecting line */}
                <div className="relative">
                  {/* Dashed Connecting Line behind nodes */}
                  <div
                    className="absolute top-[9px] sm:top-[10px] left-6 right-6 h-[2px] border-t-2 border-dashed border-[#BAE6FD]"
                    aria-hidden="true"
                  />

                  {/* 9 Stops Grid/Flex */}
                  <div className="relative flex items-start justify-between z-10">
                    {ROUTE_STOPS.map((stop, index) => {
                      const isActive = index === activeStopIndex;

                      return (
                        <button
                          key={stop.id}
                          ref={(el) => {
                          stopRefs.current[index] = el;
                        }}
                        type="button"
                        onClick={() => handleStopClick(index)}
                        className="group flex flex-col items-center relative focus:outline-none cursor-pointer max-w-[85px] sm:max-w-[95px] text-center"
                      >
                        {/* Stop Node Circle */}
                        <div
                          className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                            isActive
                              ? "bg-[#059669] ring-4 ring-[#10B981]/30 border-2 border-white scale-110 shadow-xs"
                              : "bg-white border-2 border-[#0284C7] group-hover:border-[#007EF4] group-hover:scale-110"
                          }`}
                        >
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          )}
                        </div>

                        {/* Stop Label */}
                        <span
                          className={`mt-2.5 text-xs sm:text-[13px] transition-colors leading-tight block ${
                            isActive
                              ? "font-bold text-[#059669]"
                              : "font-semibold text-slate-700 group-hover:text-[#007EF4]"
                          }`}
                        >
                          {stop.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

          {/* 4. Featured Stop Info Card */}
          <div className="bg-[#EDF7F3] border border-[#D1ECE0] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300">
            <div>
              <span className="text-[#059669] text-[11px] font-black tracking-widest uppercase block mb-1">
                FEATURED STOP
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-[#071A2E] tracking-tight">
                {activeStop.name}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm font-normal mt-1">
                {activeStop.description}
              </p>
            </div>

            <Link
              href="/contact"
              className="bg-[#007EF4] hover:bg-[#006ED6] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 transition-all inline-flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-center"
            >
              <span>Enquire about this stop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Disclaimer Note */}
          <p className="text-slate-400 text-[11px] sm:text-xs font-normal mt-4 leading-normal">
            Stop sequence illustration, not live vehicle tracking. Longlac is an additional stop beyond Hearst. Pickup and delivery times are confirmed when booking.
          </p>

        </div>

        {/* 5. 4 Schedule Runs Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-6 sm:mt-8">
          {SCHEDULE_RUNS.map((run, index) => {
            const isReturn = run.isReturn;

            return (
              <div
                key={index}
                className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg ${
                  isReturn
                    ? "bg-[#EDF7F3] border border-[#D1ECE0]"
                    : "bg-white border border-slate-200/50"
                }`}
              >
                <span className="text-[#059669] text-[10px] font-black tracking-widest uppercase block mb-1.5">
                  {run.day}
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#071A2E] tracking-tight leading-snug">
                  {run.route}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm font-normal mt-1 mb-4">
                  {run.type}
                </p>
                <Link
                  href="/contact"
                  className="text-[#007EF4] hover:text-[#006ED6] text-xs sm:text-sm font-bold inline-flex items-center gap-1 group transition-colors"
                >
                  <span>{run.action}</span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* 6. Bottom Call CTA Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mt-8 sm:mt-10 pt-4">
          <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl">
            For urgent medicine, sample and document enquiries, call to confirm the next available pickup, handling requirements and delivery window. Pickup cutoffs and availability are confirmed when booking.
          </p>

          <a
            href={telLink}
            className="bg-[#007EF4] hover:bg-[#006ED6] text-white font-extrabold text-sm sm:text-base px-6 sm:px-7 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all inline-flex items-center justify-center gap-2 shrink-0 self-start md:self-center whitespace-nowrap"
          >
            <span>Call {phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
