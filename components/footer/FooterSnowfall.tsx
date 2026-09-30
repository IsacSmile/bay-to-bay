"use client";

import React, { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedY: number;
  speedX: number;
  step: number;
  stepSize: number;
  isCrystal: boolean;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

export const FooterSnowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = false;
    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];

    const colors = [
      "rgba(255, 255, 255,",
      "rgba(224, 242, 254,", // pale ice blue
      "rgba(186, 230, 253,", // soft sky tint
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 400;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const initFlakes = () => {
      flakes = [];
      const count = window.innerWidth < 768 ? 22 : 45;

      for (let i = 0; i < count; i++) {
        const isCrystal = Math.random() < 0.25;
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        const opacity = isCrystal ? Math.random() * 0.35 + 0.3 : Math.random() * 0.45 + 0.2;

        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isCrystal ? Math.random() * 2.5 + 2.5 : Math.random() * 1.6 + 1.0,
          opacity,
          speedY: Math.random() * 0.45 + 0.25, // Gentle slow fall
          speedX: (Math.random() - 0.5) * 0.2, // Gentle horizontal breeze
          step: Math.random() * Math.PI * 2,
          stepSize: Math.random() * 0.01 + 0.004,
          isCrystal,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          color: `${colorPrefix} ${opacity})`,
        });
      }
    };

    initFlakes();

    const drawCrystal = (f: Flake) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.strokeStyle = f.color;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      const r = f.radius;
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(cos * r, sin * r);
        ctx.stroke();

        // Little branch
        const bDist = r * 0.6;
        const bLen = r * 0.3;
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

      ctx.restore();
    };

    const drawDot = (f: Flake) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = f.color;
      ctx.shadowColor = "rgba(224, 242, 254, 0.4)";
      ctx.shadowBlur = f.radius > 1.8 ? 3 : 1;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.step += f.stepSize;
        f.rotation += f.rotationSpeed;
        f.y += f.speedY;
        f.x += Math.sin(f.step) * 0.35 + f.speedX;

        // Reset if past bottom
        if (f.y > height + 10) {
          f.y = -10;
          f.x = Math.random() * width;
        }

        // Wrap horizontal edges
        if (f.x > width + 10) {
          f.x = -10;
        } else if (f.x < -10) {
          f.x = width + 10;
        }

        if (f.isCrystal) {
          drawCrystal(f);
        } else {
          drawDot(f);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    // Use IntersectionObserver to pause animation when footer is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(animate);
          } else {
            isVisible = false;
            cancelAnimationFrame(animId);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    const handleResize = () => {
      resize();
      initFlakes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-70"
      aria-hidden="true"
    />
  );
};
