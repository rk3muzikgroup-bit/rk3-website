"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CosmicBackground from "@/components/CosmicBackground";

// healing frequencies
const frequencies = [
  { label: "432 Hz — Heart Alignment", file: "/sounds/frequencies/432hz.mp3", color: "emerald-400" },
  { label: "528 Hz — DNA Repair", file: "/sounds/frequencies/528hz.mp3", color: "yellow-400" },
  { label: "639 Hz — Love & Connection", file: "/sounds/frequencies/639hz.mp3", color: "pink-400" },
  { label: "741 Hz — Intuition & Clarity", file: "/sounds/frequencies/741hz.mp3", color: "indigo-400" },
  { label: "963 Hz — Pineal Awakening", file: "/sounds/frequencies/963hz.mp3", color: "purple-500" },
];

// Tailwind-safe button styles
const colorClasses: Record<string, string> = {
  "emerald-400": "bg-emerald-400 shadow-emerald-400/70",
  "yellow-400": "bg-yellow-400 shadow-yellow-400/70",
  "pink-400": "bg-pink-400 shadow-pink-400/70",
  "indigo-400": "bg-indigo-400 shadow-indigo-400/70",
  "purple-500": "bg-purple-500 shadow-purple-500/70",
};

// Aura overlay styles
const overlayClasses: Record<string, string> = {
  "emerald-400": "bg-emerald-400/20",
  "yellow-400": "bg-yellow-400/20",
  "pink-400": "bg-pink-400/20",
  "indigo-400": "bg-indigo-400/20",
  "purple-500": "bg-purple-500/20",
};

export default function HealingRoomPage() {
  const router = useRouter();
  const [activeFreq, setActiveFreq] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);
  const [exiting, setExiting] = useState(false);

  // fade helper (smooth stop)
  const fadeOutAndStop = (duration: number, callback?: () => void) => {
    if (audioRef.current) {
      const steps = duration / 200;
      const step = audioRef.current.volume / steps;
      fadeInterval.current = setInterval(() => {
        if (!audioRef.current) return;
        if (audioRef.current.volume > step) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - step);
        } else {
          audioRef.current.pause();
          audioRef.current = null;
          if (fadeInterval.current) clearInterval(fadeInterval.current);
          if (callback) callback();
        }
      }, 200);
    } else if (callback) {
      callback();
    }
  };

  const playFreq = (file: string) => {
    fadeOutAndStop(2000, () => {
      setActiveFreq(file);
      const audio = new Audio(file);
      audio.loop = true;
      audio.volume = 0.1; // start softer
      audio.play();
      audioRef.current = audio;

      // fade-in effect for new sound
      let vol = 0.1;
      const fadeIn = setInterval(() => {
        if (!audioRef.current) {
          clearInterval(fadeIn);
          return;
        }
        vol = Math.min(0.5, vol + 0.05);
        audioRef.current.volume = vol;
        if (vol >= 0.5) clearInterval(fadeIn);
      }, 400);
    });
  };

  // breathing effect for audio volume
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (audioRef.current && activeFreq) {
      let up = true;
      interval = setInterval(() => {
        if (!audioRef.current) return;
        if (up) {
          audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.02);
          if (audioRef.current.volume >= 1) up = false;
        } else {
          audioRef.current.volume = Math.max(0.4, audioRef.current.volume - 0.02);
          if (audioRef.current.volume <= 0.4) up = true;
        }
      }, 300);
    }
    return () => clearInterval(interval);
  }, [activeFreq]);

  // 🔊 autoplay default (528 Hz)
  useEffect(() => {
    playFreq("/sounds/frequencies/528hz.mp3");
  }, []);

  const activeOverlay = frequencies.find((f) => f.file === activeFreq)?.color || null;

  // exit cinematic
  const handleExit = () => {
    setExiting(true);
    const sfx = new Audio("/sounds/vault/closing_long.mp3");
    sfx.volume = 0.8;
    sfx.play();
    fadeOutAndStop(1200, () => {
      setTimeout(() => router.push("/vault/rooms"), 1800);
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      {/* Aura overlay */}
      {activeOverlay && (
        <motion.div
          key={activeOverlay}
          className={`absolute inset-0 z-0 ${overlayClasses[activeOverlay]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Exit overlay */}
      {exiting && (
        <motion.div
          className="absolute inset-0 bg-black z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-3xl font-bold text-red-500 tracking-widest">
            Returning to Vault...
          </h1>
        </motion.div>
      )}

      {/* Main Content */}
      {!exiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
        >
          <h1 className="text-5xl font-bold mb-6">🎶 Healing Frequencies</h1>
          <p className="text-lg mb-12 max-w-2xl text-center opacity-80">
            Choose a frequency and let the resonance wash over you.
          </p>

          {/* Frequency buttons */}
          <div className="grid grid-cols-2 gap-8">
            {frequencies.map((freq) => (
              <motion.button
                key={freq.label}
                onClick={() => playFreq(freq.file)}
                className={`px-6 py-4 rounded-full text-xl ${colorClasses[freq.color]} ${
                  activeFreq === freq.file
                    ? "shadow-[0_0_40px_15px_rgba(255,255,255,0.6)]"
                    : "shadow-xl"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  activeFreq === freq.file
                    ? { opacity: 1, scale: [1, 1.08, 1] }
                    : { opacity: 1, scale: 1 }
                }
                transition={
                  activeFreq === freq.file
                    ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.5 }
                }
              >
                {freq.label}
              </motion.button>
            ))}
          </div>

          {/* Back button */}
          <button
            onClick={handleExit}
            className="mt-12 px-8 py-4 bg-gray-800 rounded-xl hover:scale-105 transition"
          >
            ⬅ Back to Vault
          </button>
        </motion.div>
      )}
    </div>
  );
}
