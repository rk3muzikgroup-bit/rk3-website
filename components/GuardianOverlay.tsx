"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import GuardianParticles from "./GuardianParticles";

type Props = {
  avatar: string;
  style: "street" | "soul" | "spirit";
  duration?: number;
};

export default function GuardianOverlay({ avatar, style, duration = 5000 }: Props) {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    let intro = "";
    let ambient = "";

    if (style === "street") {
      intro = "/sounds/guardians/rk3-intro.mp3";
      ambient = "/sounds/guardians/rk3-ambient.mp3";
    }
    if (style === "soul") {
      intro = "/sounds/guardians/isis-intro.mp3";
      ambient = "/sounds/guardians/isis-ambient.mp3";
    }
    if (style === "spirit") {
      intro = "/sounds/guardians/observer-intro.mp3";
      ambient = "/sounds/guardians/observer-ambient.mp3";
    }

    if (intro) {
      const introAudio = new Audio(intro);
      introAudio.volume = 0.9;
      introAudio.play().catch(() => {});
    }

    let ambientAudio: HTMLAudioElement | null = null;
    if (ambient) {
      ambientAudio = new Audio(ambient);
      ambientAudio.volume = 0.4;
      ambientAudio.loop = true;
      ambientAudio.play().catch(() => {});
    }

    const timer = setTimeout(() => {
      setFadeOut(true);

      // trigger burst flash right as fade starts
      setBurst(true);
      setTimeout(() => setBurst(false), 500);

      if (ambientAudio) {
        const fadeInterval = setInterval(() => {
          if (ambientAudio!.volume > 0.05) {
            ambientAudio!.volume -= 0.05;
          } else {
            ambientAudio!.pause();
            clearInterval(fadeInterval);
          }
        }, 100);
      }

      setTimeout(() => setShow(false), 2500);
    }, duration);

    return () => {
      clearTimeout(timer);
      if (ambientAudio) ambientAudio.pause();
    };
  }, [style, duration]);

  const auraColors: Record<string, string> = {
    street: "from-red-600/60 via-gray-900/70 to-black/0",
    soul: "from-purple-500/60 via-pink-500/50 to-transparent",
    spirit: "from-blue-500/60 via-cyan-400/50 to-transparent",
  };

  const burstColors: Record<string, string> = {
    street: "bg-red-500/80",
    soul: "bg-purple-400/80",
    spirit: "bg-blue-400/80",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center z-50"
        >
          {/* Particles */}
          <GuardianParticles style={style} fadeOut={fadeOut} />

          {/* Aura pulse */}
          <motion.div
            animate={
              fadeOut
                ? { scale: [1.2, 1], opacity: [0.7, 0] }
                : { scale: [1, 1.1, 1.2, 1], opacity: [0.7, 1, 0.7] }
            }
            transition={{
              duration: fadeOut ? 2.5 : 6,
              repeat: fadeOut ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className={`absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-b ${auraColors[style]} blur-3xl`}
          />

          {/* Burst Flash (energy collapse) */}
          {burst && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute w-40 h-40 sm:w-64 sm:h-64 rounded-full ${burstColors[style]} blur-2xl`}
            />
          )}

          {/* Avatar text */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={fadeOut ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: fadeOut ? 2.5 : 2 }}
            className="relative text-center"
          >
            <h2 className="text-4xl sm:text-6xl font-bold tracking-widest drop-shadow-lg">
              {avatar}
            </h2>
            <p className="mt-4 text-base sm:text-xl italic opacity-80">
              Guardian of {style}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
