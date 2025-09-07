// components/VideoBackground.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Fit = "cover" | "contain";

export default function VideoBackground({
  src,
  poster,
  fit = "cover",
  className = "",
  overlay = true,
  gradient = true,
  blurOverlay = false,
  preload = "metadata",
  loop = true,
  onEnded,
}: {
  src: string;              // /videos/...
  poster?: string;          // optional poster image
  fit?: Fit;                // object-fit style
  className?: string;       // extra classes
  overlay?: boolean;        // dim overlay
  gradient?: boolean;       // vignette gradient
  blurOverlay?: boolean;    // subtle blur on top
  preload?: "none" | "metadata" | "auto";
  loop?: boolean;
  onEnded?: () => void;     // callback when video ends (if loop=false)
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tryPlay = async () => {
      try {
        await el.play();
      } catch {
        setNeedsTap(true); // iOS autoplay fallback
      }
    };
    tryPlay();
  }, [src]);

  const style = fit === "cover" ? "object-cover" : "object-contain";

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <video
        ref={ref}
        className={`h-full w-full ${style}`}
        src={src}
        poster={poster}
        muted
        playsInline
        autoPlay
        loop={loop}
        preload={preload}
        onEnded={onEnded}
      />
      {overlay && <div className="absolute inset-0 bg-black/30" />}
      {gradient && <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />}
      {blurOverlay && <div className="absolute inset-0 backdrop-blur-[2px]" />}

      {/* Mobile autoplay fallback */}
      <AnimatePresence>
        {needsTap && (
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setNeedsTap(false); ref.current?.play(); }}
            className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-black/60 text-white"
          >
            <span className="rounded-2xl border border-white/20 px-5 py-3 bg-white/5">
              Tap to Start Background
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
