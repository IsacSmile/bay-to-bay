"use client";

import React, { useEffect, useRef } from "react";

interface SnowfallEffectProps {
  enabled?: boolean;
}

interface Flake {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedY: number;
  speedX: number;
  step: number;
  stepSize: number;
  layer: "far" | "mid" | "near";
}

export const SnowfallEffect: React.FC<SnowfallEffectProps> = ({
  enabled = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    resizeCanvas();

    const initFlakes = () => {
      flakes = [];
      const isMobile = window.innerWidth < 768;

      // Far Layer (1-2px, 0.15-0.35 opacity, slow speed)
      const farCount = isMobile ? 22 : 45;
      for (let i = 0; i < farCount; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height, // Distributed vertically across full height immediately
          radius: Math.random() * 1.0 + 1.0,
          opacity: Math.random() * 0.2 + 0.15,
          speedY: Math.random() * 0.5 + 0.4,
          speedX: Math.random() * 0.2 - 0.1,
          step: Math.random() * Math.PI * 2,
          stepSize: Math.random() * 0.01 + 0.005,
          layer: "far",
        });
      }

      // Mid Layer (2-4px, 0.35-0.65 opacity, medium speed)
      const midCount = isMobile ? 22 : 45;
      for (let i = 0; i < midCount; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 2.0,
          opacity: Math.random() * 0.3 + 0.35,
          speedY: Math.random() * 0.8 + 0.9,
          speedX: Math.random() * 0.4 - 0.2,
          step: Math.random() * Math.PI * 2,
          stepSize: Math.random() * 0.015 + 0.008,
          layer: "mid",
        });
      }

      // Near Layer (4-7px, 0.55-0.9 opacity, faster speed, soft blur)
      const nearCount = isMobile ? 11 : 20;
      for (let i = 0; i < nearCount; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.8 + 4.0,
          opacity: Math.random() * 0.35 + 0.55,
          speedY: Math.random() * 1.2 + 1.8,
          speedX: Math.random() * 0.6 - 0.3,
          step: Math.random() * Math.PI * 2,
          stepSize: Math.random() * 0.02 + 0.01,
          layer: "near",
        });
      }
    };

    initFlakes();

    const handleResize = () => {
      resizeCanvas();
      initFlakes();
    };

    window.addEventListener("resize", handleResize);

    // Continuous 60fps animation loop using requestAnimationFrame
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        // Update positions with sinusoidal drift
        flake.step += flake.stepSize;
        flake.y += flake.speedY;
        flake.x += Math.sin(flake.step) * (flake.layer === "near" ? 1.0 : flake.layer === "mid" ? 0.6 : 0.3) + flake.speedX;

        // Reset particle to top when reaching bottom
        if (flake.y > height + 15) {
          flake.y = -15;
          flake.x = Math.random() * width;
        }

        // Horizontal wrap around screen edges
        if (flake.x > width + 15) {
          flake.x = -15;
        } else if (flake.x < -15) {
          flake.x = width + 15;
        }

        // Reduce opacity over headline text area (left side) so text remains visually prioritized
        const isOverText = flake.x < width * 0.55 && flake.y > height * 0.15 && flake.y < height * 0.85;
        const renderOpacity = (isOverText && flake.layer === "near") ? flake.opacity * 0.45 : flake.opacity;

        // Render particle
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${renderOpacity})`;

        if (flake.layer === "near") {
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 6;
        } else if (flake.layer === "far") {
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
          ctx.shadowBlur = 2;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.closePath();
      }

      animFrameId = requestAnimationFrame(animate);
    };

    // Start 60fps loop immediately
    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
