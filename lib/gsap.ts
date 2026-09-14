"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

let isRegistered = false;

export function getGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    isRegistered = true;
  }
  return { gsap, ScrollTrigger, MotionPathPlugin };
}

export { gsap, ScrollTrigger, MotionPathPlugin };
