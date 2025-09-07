// src/components/Backgrounds.tsx
"use client";
import React, { useEffect, useRef } from "react";

/** Fullscreen starfield (GPU-friendly canvas) */
export function StarfieldBG({
  density = 220,   // number of stars
  speed = 32,      // pixels/sec base speed
  className = "",
}: {
  density?: number;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let running = true;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = 0, h = 0;

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const stars: { x: number; y: number; z: number; p: number }[] = [];
    function resetStar(s: any, yRand = true) {
      s.x = Math.random() * w;
      s.y = yRand ? Math.random() * h : -8 - Math.random() * 40;
      s.z = 0.4 + Math.random() * 0.9; // depth (size/speed)
      s.p = Math.random() * Math.PI * 2; // phase (twinkle)
    }

    function seed() {
      stars.length = 0;
      for (let i = 0; i < density; i++) {
        const s: any = { x: 0, y: 0, z: 1, p: 0 };
        resetStar(s, true);
        stars.push(s);
      }
    }

    resize();
    seed();
    window.addEventListener("resize", resize);

    let last = performance.now();
    function tick(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000); // clamp delta
      last = now;

      ctx.clearRect(0, 0, w, h);
      // Subtle space haze
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(40, 60, 90, 0.12)");
      g.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y += (speed * s.z) * dt;
        if (s.y > h + 20) resetStar(s, false);

        // twinkle
        const tw = 0.6 + 0.4 * Math.sin(now * 0.003 + s.p);
        const r = Math.max(0.4, 1.1 * s.z);
        ctx.globalAlpha = tw;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, speed]);

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <canvas ref={ref} className="h-full w-full block" />
    </div>
  );
}

/** Looping video background (put a nebula/space clip in /public/videos/) */
export function NebulaVideoBG({
  src = "/videos/nebula_loop.mp4",
  className = "",
}: {
  src?: string;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <video
        className="h-full w-full object-cover"
        src={src}
        muted
        playsInline
        autoPlay
        loop
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}

/** Soft animated gradient (pure CSS) */
export function AnimatedGradientBG({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 animate-rk3-gradient" />
      <style jsx global>{`
        @keyframes rk3Gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rk3-gradient {
          background: radial-gradient(1200px 600px at 10% 10%, rgba(99,102,241,0.18), transparent 60%),
                      radial-gradient(1000px 500px at 90% 20%, rgba(20,184,166,0.15), transparent 60%),
                      radial-gradient(1200px 600px at 50% 90%, rgba(245,158,11,0.12), transparent 60%),
                      #000;
          background-size: 200% 200%;
          animation: rk3Gradient 16s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
