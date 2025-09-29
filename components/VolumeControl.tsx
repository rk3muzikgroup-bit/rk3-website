"use client";
import { motion } from "framer-motion";
import { useVolume } from "@/context/VolumeContext";

export default function VolumeControl() {
  const { masterVolume, setMasterVolume, muted, toggleMute } = useVolume();

  return (
    <motion.div
      className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-black/50 p-3 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🔇 Toggle Button */}
      <button
        onClick={toggleMute}
        className="px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* 🎚 Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={muted ? 0 : masterVolume}
        onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
        className="w-32 accent-indigo-500"
      />
    </motion.div>
  );
}
