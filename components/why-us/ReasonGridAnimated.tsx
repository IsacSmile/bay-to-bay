"use client";

import React, { useEffect, useRef } from "react";
import { ReasonItemData } from "@/lib/prisma";
import { ReasonItem } from "@/components/why-us/ReasonItem";
import { getGSAP } from "@/lib/gsap";

interface ReasonGridAnimatedProps {
  reasons: ReasonItemData[];
}

export const ReasonGridAnimated: React.FC<ReasonGridAnimatedProps> = ({ reasons }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = grid.querySelectorAll(".reason-card-anim");

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(cards, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.09,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          once: true,
        },
      });
    }, grid);

    return () => ctx.revert();
  }, [reasons.length]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 pt-2"
    >
      {reasons.map((item, index) => (
        <ReasonItem
          key={item.id || index}
          index={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          className="reason-card-anim opacity-0"
        />
      ))}
    </div>
  );
};
