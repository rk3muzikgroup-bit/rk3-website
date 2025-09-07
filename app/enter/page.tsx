"use client";

// File: app/enter/page.tsx
// Spaceship dash intro → 1.5s black → /portal
// Plays once per visitor via localStorage ("rk3_seen_intro").
// Assets: /public/videos/ship_dash.mp4

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function EnterGate() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [showBlack, setShowBlack] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  // If already seen, go straight to portal
  useEffect(() => {
    const seen = typeof window !== "undefined" && window.localStorage.getItem("rk3_seen_intro");
    if (seen === "true") {
      router.replace("/portal");
    } else {
      setReady(true);
    }
  }, [router]);

  useEffect(() => {
    if (!ready || !videoRef.current) return;

    const el = videoRef.current;
    const tryPlay = async () => {
      try {
        await el.play();
      } catch {
        setNeedsTap(true); // mobile autoplay fallback
      }
    };
    tryPlay();

    const onEnded = () => {
      setShowBlack(true);
      setTimeout(() => {
        window.localStorage.setItem("rk3_seen_intro", "true");
        router.replace("/portal");
      }, 1500);
    };

    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [ready, router]);

  const skip = () => {
    window.localStorage.setItem("rk3_seen_intro", "true");
    router.replace("/portal");
  };

  return (
    <div className="relative h-svh w-screen bg-black text-white overflow-hidden">
      {/* Video layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/ship_dash.mp4"
        muted
        playsInline
        autoPlay
      />

      {/* Tap-to-start (mobile) */}
      <AnimatePresence>
        {needsTap && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm text-white"
            onClick={() => {
              setNeedsTap(false);
              videoRef.current?.play();
            }}
          >
            <span className="rounded-2xl border border-white/20 px-5 py-3 bg-white/5">Tap to Start</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip control */}
      <button
        onClick={skip}
        className="absolute bottom-5 right-5 rounded-xl bg-white/5 border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
      >
        Skip (S)
      </button>

      {/* Blackout fade */}
      <AnimatePresence>
        {showBlack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-black"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
