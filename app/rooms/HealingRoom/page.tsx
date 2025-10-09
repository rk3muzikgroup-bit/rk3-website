"use client";

import CosmicBackground from "@/components/CosmicBackground";
import Orbs from "@/components/Orbs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const frequencies = [
  { label: "432 Hz — Heart Alignment", file: "/sounds/frequencies/432hz.mp3", color: "emerald-400" },
  { label: "528 Hz — DNA Repair", file: "/sounds/frequencies/528hz.mp3", color: "yellow-400" }, // 🌟 default
  { label: "639 Hz — Love & Connection", file: "/sounds/frequencies/639hz.mp3", color: "pink-400" },
  { label: "741 Hz — Intuition & Clarity", file: "/sounds/frequencies/741hz.mp3", color: "indigo-400" },
  { label: "963 Hz — Pineal Awakening", file: "/sounds/frequencies/963hz.mp3", color: "purple-500" },
];

export default function HealingRoomPage() {
  const router = useRouter();
  const [activeFreq, setActiveFreq] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

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
    fadeOutAndStop(2500, () => {
      setActiveFreq(file);
      const audio = new Audio(file);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      audioRef.current = audio;
    });
  };

  useEffect(() => {
    // 🔊 auto-start with 528 Hz
    playFreq("/sounds/frequencies/528hz.mp3");
  }, []);

  const activeColor = frequencies.find((f) => f.file === activeFreq)?.color || "yellow-400";

  const playExitWhoosh = () => {
    const sfx = new Audio("/sounds/vault/closing_long.mp3");
    sfx.volume = 0.8;
    sfx.play();
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />

      {/* 🌟 Orbs breathe with the frequency */}
      <Orbs count={7} color={activeColor} pulse={true} />

      {/* Aura overlay */}
      <motion.div
        key={activeColor}
        className={`absolute inset-0 z-0 bg-${activeColor}/20`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
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

        <div className="grid grid-cols-2 gap-8">
          {frequencies.map((freq) => (
            <motion.button
              key={freq.label}
              onClick={() => playFreq(freq.file)}
              className={`px-6 py-4 rounded-full text-xl shadow-xl bg-${freq.color}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {freq.label}
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
