// components/visuals/Starfield.tsx
"use client";

import { useEffect, useRef } from "react";
import Starfield from "@/components/visuals/Starfield";
import OrbLayer from "@/components/visuals/OrbLayer";
import CockpitHUD from "@/components/cockpit/CockpitHUD";

export default function CockpitPage() {
  return (
    <div className="relative w-full h-full">
      <Starfield />
      <OrbLayer />
      <CockpitHUD />
      {/* cockpit video or UI here */}
    </div>
  );
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // build stars
    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2,
      opacity: 0.3 + Math.random() * 0.7,
      twinkle: Math.random() * 0.02,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();

        // twinkle
        star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
        if (star.opacity < 0.2) star.opacity = 0.2;
        if (star.opacity > 1) star.opacity = 1;
      });

      requestAnimationFrame(draw);
    }

    draw();

    // handle resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
