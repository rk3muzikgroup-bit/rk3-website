// components/CockpitRide.tsx
"use client";

/**
 * RK3 Cockpit Ride (stable build)
 * - Parallax tilt
 * - Warp flash + audio fade + route → /vault
 * - Tap-to-start fallback
 * - Optional brandMask to cover steering-wheel emblem (temporary)
 */

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HUDToolbar } from "./RK3FuturisticUI"; // make sure RK3FuturisticUI.tsx also has "use client"

export type RideTheme = "street" | "soul" | "spirit";

type Props = {
  theme: RideTheme;
  windowVideoSrc: string;      // outside visuals (mp4)
  audioSrc: string;            // 28–30 min track (mp3)
  cockpitPngSrc: string;       // transparent PNG overlay
  cockpitFit?: "cover" | "contain"; // default "contain"
  cockpitScale?: number;       // default 1.0
  cockpitOffsetY?: number;     // px (positive = down)
  brandMaskEnabled?: boolean;  // cover steering-wheel logo (temporary)
  brandMaskOpacity?: number;   // 0..1 (default 0.9)
  brandMaskSize?: number;      // px diameter (default 140)
  brandMaskOffsetY?: number;   // px from bottom (default 36)
};

const THEME_TINT: Record<RideTheme, string> = {
  street: "bg-cyan-500/12",
  soul: "bg-amber-400/12",
  spirit: "bg-indigo-500/12",
};

export default function CockpitRide({
  theme,
  windowVideoSrc,
  audioSrc,
  cockpitPngSrc,
  cockpitFit = "contain",
  cockpitScale = 1,
  cockpitOffsetY = 0,
  brandMaskEnabled = false,
  brandMaskOpacity = 0.9,
  brandMaskSize = 140,
  brandMaskOffsetY = 36,
}: Props) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [muted, setMuted] = useState(false);
  const [warpFlash, setWarpFlash] = useState(false);
  const [showTap, setShowTap] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 }); // degrees

  // Try autoplay; show tap overlay if blocked
  useEffect(() => {
    const tryPlay = async () => {
      try {
        await videoRef.current?.play();
        if (!muted) {
          if (audioRef.current) audioRef.current.volume = 1;
          await audioRef.current?.play();
        }
      } catch {
        setShowTap(true);
      }
    };
    tryPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowVideoSrc, audioSrc]);

  const beginPlayback = async () => {
    setShowTap(false);
    try {
      await videoRef.current?.play();
      if (!muted) {
        if (audioRef.current) audioRef.current.volume = 1;
        await audioRef.current?.play();
      }
    } catch {}
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w") doWarp();
      if (k === "m") setMuted((m) => !m);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mouse → Parallax tilt
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rx = (e.clientX - (r.left + r.width / 2)) / r.width;  // -0.5..0.5
    const ry = (e.clientY - (r.top + r.height / 2)) / r.height; // -0.5..0.5
    setTilt({ x: ry * 6, y: -rx * 6 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // Warp → flash + audio fade + route
  const doWarp = () => {
    setWarpFlash(true);
    const el = audioRef.current;
    if (el) {
      let v = el.volume ?? 1;
      const step = 50; // ms
      const dec = v / (350 / step);
      const t = window.setInterval(() => {
        v = Math.max(0, v - dec);
        el.volume = v;
        if (v <= 0.001) {
          window.clearInterval(t);
          el.pause();
        }
      }, step);
    }
    window.setTimeout(() => router.push("/vault"), 450);
  };

  return (
    <div
      className="relative h-svh w-screen bg-black text-white overflow-hidden"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      {/* Subtle theme tint + vignette */}
      <div className={`pointer-events-none absolute inset-0 ${THEME_TINT[theme]}`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Window visuals */}
      <motion.video
        ref={videoRef}
        src={windowVideoSrc}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        autoPlay
        loop
        animate={{ rotateX: tilt.x * 0.2, rotateY: tilt.y * 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 14 }}
      />

      {/* Cockpit overlay (bottom-centered) */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center select-none">
        <motion.img
          src={cockpitPngSrc}
          alt="Cockpit"
          draggable={false}
          className={cockpitFit === "cover" ? "h-full w-full object-cover" : "max-h-full w-auto object-contain"}
          style={{
            transform: `translateY(${cockpitOffsetY}px) scale(${cockpitScale})`,
            transformOrigin: "center bottom",
          }}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.6 }}
        />
      </div>

      {/* Optional brand mask (temporary) */}
      {brandMaskEnabled && (
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: brandMaskOffsetY,
            width: brandMaskSize,
            height: brandMaskSize,
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.85), rgba(0,0,0,0.98) 60%, rgba(0,0,0,1) 100%)",
            filter: "blur(6px)",
            opacity: brandMaskOpacity,
            borderRadius: "9999px",
          }}
          aria-hidden
        />
      )}

      {/* Audio layer */}
      <audio ref={audioRef} src={audioSrc} loop autoPlay muted={muted} />

      {/* HUD Toolbar */}
      <HUDToolbar
        onWarp={doWarp}
        onMap={() => alert("Map coming soon")}
        onLock={() => alert("Locked In")}
        pathLabel={theme.toUpperCase()}
        accent={theme}
      />

      {/* Tap-to-start */}
      <AnimatePresence>
        {showTap && (
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={beginPlayback}
            className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <span className="rounded-2xl border border-white/20 px-5 py-3 bg-white/5">Tap to Start Ride</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Warp flash */}
      <AnimatePresence>
        {warpFlash && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
