"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IndigoNebula from "@/app/backgrounds/IndigoNebula";
import EmeraldGoldVeil from "@/app/backgrounds/EmeraldGoldVeil";
import CelestialDustField from "@/app/backgrounds/CelestialDustField";
import VoidHorizon from "@/app/backgrounds/VoidHorizon";

type CosmicType = "indigo" | "emerald" | "dust" | "void";
const sequence: CosmicType[] = ["indigo", "emerald", "dust", "void"];

export default function CosmicBackgroundsHUD({
  cycle = false,
  duration = 20000,
  autoHideControls = true,
  fadeOutDelay = 4000,
  fadeSpeed = 0.5,
}: {
  cycle?: boolean;
  duration?: number;
  autoHideControls?: boolean;
  fadeOutDelay?: number;
  fadeSpeed?: number;
}) {
  const [index, setIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(cycle);
  const [showControls, setShowControls] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [countdown, setCountdown] = useState(Math.floor(duration / 1000));

  // cycle handling
  useEffect(() => {
    if (!isCycling) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sequence.length);
      setCountdown(Math.floor(duration / 1000)); // reset timer
    }, duration);
    return () => clearInterval(interval);
  }, [isCycling, duration]);

  // countdown handling
  useEffect(() => {
    if (!isCycling) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : Math.floor(duration / 1000)));
    }, 1000);
    return () => clearInterval(timer);
  }, [isCycling, duration, index]);

  // auto hide controls
  useEffect(() => {
    if (!autoHideControls) return;

    const handleInteraction = () => {
      setShowControls(true);
      setLastInteraction(Date.now());
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    const interval = setInterval(() => {
      if (Date.now() - lastInteraction > fadeOutDelay) {
        setShowControls(false);
      }
    }, 500);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      clearInterval(interval);
    };
  }, [lastInteraction, autoHideControls, fadeOutDelay]);

  const activeType = sequence[index];

  const renderBackground = (t: CosmicType) => {
    switch (t) {
      case "indigo":
        return <IndigoNebula />;
      case "emerald":
        return <EmeraldGoldVeil />;
      case "dust":
        return <CelestialDustField />;
      case "void":
        return <VoidHorizon />;
      default:
        return <VoidHorizon />;
    }
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % sequence.length);
    setCountdown(Math.floor(duration / 1000)); // reset timer
  };
  const prev = () => {
    setIndex((prev) => (prev - 1 + sequence.length) % sequence.length);
    setCountdown(Math.floor(duration / 1000));
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          {renderBackground(activeType)}
        </motion.div>
      </AnimatePresence>

      {/* VIP Cockpit HUD */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: fadeSpeed }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg text-white"
          >
            {/* Status Display */}
            <div className="text-sm opacity-80">
              {sequence[index].toUpperCase()} • {isCycling ? "Auto-Cycle On" : "Manual Mode"}
            </div>

            {/* Countdown Timer (subtle) */}
            {isCycling && (
              <div className="text-xs opacity-60">
                Next in {countdown}s
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-4">
              <button onClick={prev} className="hover:text-indigo-300">◀️ Prev</button>
              <button onClick={() => setIsCycling(!isCycling)} className="hover:text-yellow-300">
                {isCycling ? "⏸ Pause" : "▶️ Play"}
              </button>
              <button onClick={next} className="hover:text-emerald-300">Next ▶️</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
