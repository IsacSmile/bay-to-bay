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
  type: "crystal" | "dot";
  color: string;
  rotation: number;
  rotationSpeed: number;
  layer: "far" | "mid" | "near";
}

const SNOW_COLORS = [
  "#00A8FF", // Vibrant sky blue
  "#38BDF8", // Bright cyan sky
  "#7DD3FC", // Light icy blue
  "#BAE6FD", // Soft ice blue
  "#E0F2FE", // Pale icy white-blue
  "#FFFFFF", // Pure white
];

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

      // Total count across layers
      const farCount = isMobile ? 18 : 35;
      const midCount = isMobile ? 18 : 35;
      const nearCount = isMobile ? 10 : 20;

      // Helper to generate a flake
      const createFlake = (layer: "far" | "mid" | "near"): Flake => {
        const isCrystal = Math.random() < 0.42; // ~42% detailed snowflake stars, 58% dots
        const color = SNOW_COLORS[Math.floor(Math.random() * SNOW_COLORS.length)];

        let radius = 2;
        let opacity = 0.5;
        let speedY = 1;

        if (layer === "far") {
          radius = isCrystal ? Math.random() * 2.5 + 3.0 : Math.random() * 1.0 + 1.2;
          opacity = Math.random() * 0.25 + 0.25;
          speedY = Math.random() * 0.4 + 0.4;
        } else if (layer === "mid") {
          radius = isCrystal ? Math.random() * 3.5 + 5.0 : Math.random() * 1.8 + 2.2;
          opacity = Math.random() * 0.35 + 0.45;
          speedY = Math.random() * 0.7 + 0.8;
        } else {
          radius = isCrystal ? Math.random() * 4.5 + 7.5 : Math.random() * 2.5 + 3.5;
          opacity = Math.random() * 0.3 + 0.65;
          speedY = Math.random() * 1.1 + 1.4;
        }

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          opacity,
          speedY,
          speedX: Math.random() * 0.3 - 0.15,
          step: Math.random() * Math.PI * 2,
          stepSize: Math.random() * 0.015 + 0.005,
          type: isCrystal ? "crystal" : "dot",
          color,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() * 0.015 - 0.0075),
          layer,
        };
      };

      for (let i = 0; i < farCount; i++) flakes.push(createFlake("far"));
      for (let i = 0; i < midCount; i++) flakes.push(createFlake("mid"));
      for (let i = 0; i < nearCount; i++) flakes.push(createFlake("near"));
    };

    initFlakes();

    const handleResize = () => {
      resizeCanvas();
      initFlakes();
    };

    window.addEventListener("resize", handleResize);

    // Draw 6-spoke detailed crystalline star snowflake matching image reference
    const drawSnowflakeCrystal = (
      f: Flake,
      renderOpacity: number
    ) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.strokeStyle = f.color;
      ctx.fillStyle = f.color;
      ctx.globalAlpha = renderOpacity;
      ctx.lineWidth = Math.max(1.1, f.radius * 0.16);
      ctx.lineCap = "round";

      const r = f.radius;

      // 6 radial spokes
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Main line from center to tip
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(cos * r, sin * r);
        ctx.stroke();

        // Branch V ticks at 58% distance along arm
        const bDist = r * 0.58;
        const bLen = r * 0.32;
        const bx = cos * bDist;
        const by = sin * bDist;

        const bAngle1 = angle + Math.PI / 4;
        const bAngle2 = angle - Math.PI / 4;

        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(bAngle1) * bLen, by + Math.sin(bAngle1) * bLen);
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(bAngle2) * bLen, by + Math.sin(bAngle2) * bLen);
        ctx.stroke();
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(1.2, r * 0.18), 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw smooth circular dot particle
    const drawSnowflakeDot = (
      f: Flake,
      renderOpacity: number
    ) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = f.color;
      ctx.globalAlpha = renderOpacity;

      if (f.layer === "near") {
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 8;
      } else if (f.layer === "mid") {
        ctx.shadowColor = f.color;
        ctx.shadowBlur = 4;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fill();
      ctx.restore();
    };

    // Continuous 60fps animation loop using requestAnimationFrame
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        // Update positions with sinusoidal drift & spin
        flake.step += flake.stepSize;
        flake.rotation += flake.rotationSpeed;
        flake.y += flake.speedY;
        flake.x += Math.sin(flake.step) * (flake.layer === "near" ? 0.9 : flake.layer === "mid" ? 0.5 : 0.25) + flake.speedX;

        // Reset particle to top when reaching bottom
        if (flake.y > height + 20) {
          flake.y = -20;
          flake.x = Math.random() * width;
        }

        // Horizontal wrap around screen edges
        if (flake.x > width + 20) {
          flake.x = -20;
        } else if (flake.x < -20) {
          flake.x = width + 20;
        }

        // Soften opacity slightly over dense left text blocks
        const isOverText = flake.x < width * 0.5 && flake.y > height * 0.15 && flake.y < height * 0.85;
        const renderOpacity = (isOverText && flake.layer === "near") ? flake.opacity * 0.5 : flake.opacity;

        // Render crystal star vs smooth circular dot
        if (flake.type === "crystal") {
          drawSnowflakeCrystal(flake, renderOpacity);
        } else {
          drawSnowflakeDot(flake, renderOpacity);
        }
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
