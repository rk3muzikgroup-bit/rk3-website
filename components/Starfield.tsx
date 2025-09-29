// src/components/Starfield.tsx
"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resize() {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
    }
    resize();
    window.addEventListener("resize", resize);

    const N = 250;
    const stars = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1 + 0.2,
      v: Math.random() * 0.6 + 0.2,
      streak: 0,
      hue: 0,
      trail: 0,
    }));

    let warpActive = false;
    function handleKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "f" && !warpActive) {
        warpActive = true;

        // Sound
        const audio = new Audio("/sounds/ride/rocket_whoosh.mp3");
        audio.volume = 0.8;
        audio.play().catch(() => {});

        // Pick portal scheme
        const schemes: Record<string, number[]> = {
          street: [45],
          soul: [260],
          spirit: [150],
          rainbow: Array.from({ length: 12 }, (_, i) => i * 30),
        };
        const portal =
          localStorage.getItem("activePortal")?.toLowerCase() || "rainbow";
        const palette = schemes[portal] || schemes["rainbow"];

        stars.forEach((s) => {
          s.v *= 20;
          s.streak = 20;
          s.hue = palette[Math.floor(Math.random() * palette.length)];
          s.trail = 1.0;
        });

        // Warp Counter (save to localStorage only)
        let warpCount = parseInt(localStorage.getItem("warpCount") || "0", 10);
        warpCount++;
        localStorage.setItem("warpCount", warpCount.toString());

        setTimeout(() => {
          stars.forEach((s) => {
            s.v /= 20;
            s.streak = 0;
          });
          warpActive = false;
        }, 1500);
      }
    }
    window.addEventListener("keydown", handleKey);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.y += s.v * s.z;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
          s.z = Math.random() * 1 + 0.2;
          s.hue = Math.floor(Math.random() * 360);
        }
        const size = (0.6 + s.z) * 1.5;
        ctx.globalAlpha = 0.5 + s.z * 0.5;
        if (s.streak > 0) {
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${s.hue},100%,70%,${ctx.globalAlpha})`;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y - s.streak * 10);
          ctx.lineWidth = 2;
          ctx.stroke();
          if (s.trail > 0) s.trail *= 0.92;
        } else {
          ctx.fillStyle = "#fff";
          ctx.fillRect(s.x, s.y, size, size);
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}
