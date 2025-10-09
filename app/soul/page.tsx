"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const tracks = [
  { label: "Soulful Flow", file: "/sounds/soul/flow.mp3", color: "rose-400" },
  { label: "Midnight Groove", file: "/sounds/soul/midnight.mp3", color: "amber-400" },
  { label: "Healing Harmony", file: "/sounds/soul/harmony.mp3", color: "violet-400" },
];

// Tailwind-safe button colors
const colorClasses: Record<string, string> = {
  "rose-400": "bg-rose-400 shadow-rose-400/60",
  "amber-400": "bg-amber-400 shadow-amber-400/60",
  "violet-400": "bg-violet-400 shadow-violet-400/60",
};

// Aura overlays
const overlayClasses: Record<string, string> = {
  "rose-400": "bg-rose-400/20",
  "amber-400": "bg-amber-400/20",
  "violet-400": "bg-violet-400/20",
};

export default function SoulRoomPage() {
  const router = useRouter();
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

  // fade helper
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

  const playTrack = (file: string) => {
    // fade old track before starting new one
    fadeOutAndStop(2500, () => {
      setActiveTrack(file);
      const audio = new Audio(file);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      audioRef.current = audio;
    });
  };

  // breathing effect (volume pulse)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (audioRef.current && activeTrack) {
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
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTrack]);

  const activeOverlay =
    tracks.find((t) => t.file === activeTrack)?.color || null;

  const playExitWhoosh = () => {
    const sfx = new Audio("/sounds/vault/closing_long.mp3");
    sfx.volume = 0.7;
    sfx.play();
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
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8"
      >
        <h1 className="text-5xl font-bold mb-6">🌙 Soul Frequencies</h1>
        <p className="text-lg mb-12 max-w-2xl text-center opacity-80">
          Smooth harmonies and warm grooves — let the soul breathe.
        </p>
        <div className="grid grid-cols-2 gap-8">
          {tracks.map((track) => (
            <motion.button
              key={track.label}
              onClick={() => playTrack(track.file)}
              className={`px-6 py-4 rounded-full text-xl ${colorClasses[track.color]} ${
                activeTrack === track.file
                  ? "shadow-[0_0_40px_15px_rgba(255,255,255,0.5)]"
                  : "shadow-xl"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                activeTrack === track.file
                  ? { opacity: 1, scale: [1, 1.05, 1] }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                activeTrack === track.file
                  ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.5 }
              }
            >
              {track.label}
            </motion.button>
          ))}
        </div>
        <button
          onClick={() => {
            playExitWhoosh();
            fadeOutAndStop(1000, () => router.push("/vault/rooms"));
          }}
          className="mt-12 px-8 py-4 bg-gray-800 rounded-xl"
        >
          ⬅ Back to Vault
        </button>
      </motion.div>
    </div>
  );
}
