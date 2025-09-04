// components/PortalButton.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalButton({
  label = "Enter",
  nextPath = "/",
}: {
  label?: string;
  nextPath?: string;
}) {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const playBlast = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Cinematic boom
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(60, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 1.2);
    gain.gain.setValueAtTime(0.8, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.2);

    // Sub-bass wobble
    const bass = ctx.createOscillator();
    bass.type = "sawtooth";
    bass.frequency.setValueAtTime(40, ctx.currentTime);
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(6, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(20, ctx.currentTime);
    lfo.connect(lfoGain).connect(bass.frequency);

    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(0.7, ctx.currentTime);
    bassGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    bass.connect(bassGain).connect(ctx.destination);
    bass.start();
    lfo.start();
    bass.stop(ctx.currentTime + 1.5);
    lfo.stop(ctx.currentTime + 1.5);

    // Shimmer tail (high airy sparkle)
    const shimmer = ctx.createOscillator();
    shimmer.type = "triangle";
    shimmer.frequency.setValueAtTime(800, ctx.currentTime);
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.2, ctx.currentTime);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
    shimmer.connect(shimmerGain).connect(ctx.destination);
    shimmer.start();
    shimmer.stop(ctx.currentTime + 2.0);
  };

  const handleClick = () => {
    setActive(true);
    playBlast();
    setTimeout(() => {
      router.push(nextPath);
    }, 1000); // let FX play fully
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Particle burst */}
      {active && (
        <motion.div
          className="absolute w-64 h-64 rounded-full border-4 border-purple-400"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      )}

      {/* Swirl warp */}
      {active && (
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 blur-2xl"
          initial={{ scale: 0, rotate: 0, opacity: 0.8 }}
          animate={{ scale: 3, rotate: 720, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      )}

      {/* Button core */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        disabled={active}
        className="relative z-10 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition"
      >
        {label}
      </motion.button>
    </div>
  );
}
