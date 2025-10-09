// components/vault/MusicFX.tsx
"use client";

import { useEffect, useRef } from "react";

export default function MusicFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const midY = canvas.height / 2;
      const width = canvas.width;
      const amplitude = 50;
      const frequency = 0.02;

      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y =
          midY +
          Math.sin((x * frequency) + t) * amplitude * Math.sin(t * 0.05);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255, 105, 180, 0.6)`; // hot pink glow
      ctx.lineWidth = 2;
      ctx.stroke();

      t += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
