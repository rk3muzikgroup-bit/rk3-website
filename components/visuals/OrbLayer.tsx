// components/visuals/OrbLayer.tsx
"use client";

import { useEffect, useRef } from "react";

export default function OrbLayer() {
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

    // Orb properties
    const orbs = Array.from({ length: 6 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      opacity: 0.1 + Math.random() * 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      orbs.forEach((orb) => {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${orb.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(200,200,255,0.8)";
        ctx.fill();

        // Move
        orb.x += orb.dx;
        orb.y += orb.dy;

        // Bounce back softly at edges
        if (orb.x < 0 || orb.x > width) orb.dx *= -1;
        if (orb.y < 0 || orb.y > height) orb.dy *= -1;
      });

      requestAnimationFrame(draw);
    }

    draw();

    // Resize listener
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
}
