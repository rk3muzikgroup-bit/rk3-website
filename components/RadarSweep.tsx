"use client";

import { useEffect, useRef } from "react";

export default function RadarSweep() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const radius = width / 2;
      const centerX = width / 2;
      const centerY = height / 2;

      // Background rings
      ctx.strokeStyle = "rgba(0,255,200,0.2)";
      ctx.lineWidth = 1;
      for (let r = radius / 4; r <= radius; r += radius / 4) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Radar sweep (rotating line)
      const sweepX = centerX + radius * Math.cos(angle);
      const sweepY = centerY + radius * Math.sin(angle);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, sweepX, sweepY, radius);
      gradient.addColorStop(0, "rgba(0,255,200,0.4)");
      gradient.addColorStop(1, "rgba(0,255,200,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + 0.3); // sweep width
      ctx.closePath();
      ctx.fill();

      angle += 0.02;
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={200}
      className="rounded-full bg-transparent"
    />
  );
}
