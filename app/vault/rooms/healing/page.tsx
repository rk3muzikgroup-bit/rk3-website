"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Healing Frequencies
const frequencies = [
  { label: "432 Hz — Heart Alignment", file: "/sounds/frequencies/432hz.mp3", color: "emerald-400" },
  { label: "528 Hz — DNA Repair", file: "/sounds/frequencies/528hz.mp3", color: "yellow-400" },
  { label: "639 Hz — Love & Connection", file: "/sounds/frequencies/639hz.mp3", color: "pink-400" },
  { label: "741 Hz — Intuition & Clarity", file: "/sounds/frequencies/741hz.mp3", color: "indigo-400" },
  { label: "963 Hz — Pineal Awakening", file: "/sounds/frequencies/963hz.mp3", color: "purple-500" },
];

// Button Glow Styles
const colorClasses: Record<string, string> = {
  "emerald-400": "bg-emerald-400 shadow-emerald-400/70",
  "yellow-400": "bg-yellow-400 shadow-yellow-400/70",
  "pink-400": "bg-pink-400 shadow-pink-400/70",
  "indigo-400": "bg-indigo-400 shadow-indigo-400/70",
  "purple-500": "bg-purple-500 shadow-purple-500/70",
};

// Aura Background Overlays
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

  // Smooth fade out + stop
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
          clearInterval(fadeInterval.current!);
          if (callback) callback();
        }
      }, 200);
    } else if (callback) callback();
  };

  // Play selected frequency
  const playFreq = (file: string) => {
    fadeOutAndStop(2000, () => {
      setActiveFreq(file);
      const audio = new Audio(file);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      audioRef.current = audio;
    });
  };

  // Breathing audio effect
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

  // Auto start with 528Hz
  useEffect(() => {
    playFreq("/sounds/frequencies/528hz.mp3");
  }, []);

  const activeOverlay = frequencies.find((f) => f.file === activeFreq)?.color || null;

  const playExitWhoosh = () => {
    const sfx = new Audio("/sounds/vault/closing_long.mp3");
    sfx.volume = 0.9;
    sfx.play();
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      {/* Hollywood intro cinematic */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-black"
      >
        <h1 className="text-4xl font-bold text-yellow-400 tracking-[0.25em] drop-shadow-[0_0_30px_rgba(234,179,8,1)]">
          🎶 INITIATING HEALING FREQUENCIES
        </h1>
      </motion.div>

      {/* Aura Overlay */}
      {activeOverlay && (
        <motion.div
          key={activeOverlay}
          className={`absolute inset-0 z-0 ${overlayClasses[activeOverlay]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, delay: 2 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
      >
        <h1 className="text-5xl font-bold mb-6 drop-shadow-[0_0_40px_rgba(234,179,8,1)]">
          🎶 Healing Frequencies
        </h1>
        <p className="text-lg mb-12 max-w-2xl text-center opacity-80">
          Select a frequency and let the resonance guide your energy.
        </p>

        {/* Frequency Buttons */}
        <div className="grid grid-cols-2 gap-8">
          {frequencies.map((freq) => (
            <motion.button
              key={freq.label}
              onClick={() => playFreq(freq.file)}
              className={`px-6 py-4 rounded-full text-xl ${colorClasses[freq.color]} ${
                activeFreq === freq.file
                  ? "shadow-[0_0_40px_15px_rgba(255,255,255,0.5)]"
                  : "shadow-xl"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
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

        {/* Exit */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playExitWhoosh();
            fadeOutAndStop(1000, () => router.push("/vault/rooms"));
          }}
          className="mt-12 px-10 py-4 bg-gray-800 rounded-2xl text-xl font-semibold shadow-xl hover:shadow-[0_0_25px_rgba(156,163,175,0.9)] transition"
        >
          ⬅ Back to Vault
        </motion.button>
      </motion.div>
    </div>
  );
}
