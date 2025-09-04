"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type VaultProps = {
  title: string;
  subtitle: string;
  nextPath: string;   // where this vault should lead
  sound?: string;     // optional background sound
};

export default function MasterVault({ title, subtitle, nextPath, sound }: VaultProps) {
  const router = useRouter();
  const [blast, setBlast] = useState(false);

  // Sub-bass wobble blast
  const playBlast = () => {
    const bassCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = bassCtx.createOscillator();
    const gain = bassCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(40, bassCtx.currentTime);

    const lfo = bassCtx.createOscillator();
    const lfoGain = bassCtx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(2, bassCtx.currentTime);
    lfoGain.gain.setValueAtTime(20, bassCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(gain).connect(bassCtx.destination);
    gain.gain.setValueAtTime(0.6, bassCtx.currentTime);

    osc.start();
    lfo.start();

    setTimeout(() => {
      osc.stop();
      lfo.stop();
      bassCtx.close();
    }, 2000);
  };

  // Trigger vault blast + cut-off
  const handleEnter = () => {
    setBlast(true);
    playBlast();
    setTimeout(() => {
      router.push(nextPath);
    }, 2000); // blackout then move
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Cosmic Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Text */}
      <div className="relative z-10 text-center p-6">
        <h1 className="text-6xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-300">{subtitle}</p>
      </div>

      {/* Portal Button */}
      {!blast && (
        <button
          onClick={handleEnter}
          className="relative z-10 mt-8 px-8 py-4 text-lg bg-purple-600 hover:bg-purple-800 rounded-2xl shadow-lg transition-all"
        >
          🚪 Enter the Vault
        </button>
      )}

      {/* Blackout */}
      {blast && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
}
