"use client";

import { useVolume } from "@/context/VolumeContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function HUDVolume() {
  const { sfxVolume, ambientVolume, muted, setSfxVolume, setAmbientVolume, toggleMute } =
    useVolume();

  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-2xl bg-black/60 hover:bg-black/80 text-white shadow-lg"
      >
        {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>

      {/* Panel */}
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-black/80 p-4 rounded-2xl shadow-xl space-y-3 w-56 backdrop-blur-md border border-white/10"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Mute</span>
            <button
              onClick={toggleMute}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                muted ? "bg-red-500/80 text-white" : "bg-green-500/80 text-white"
              }`}
            >
              {muted ? "Muted" : "On"}
            </button>
          </div>

          <div>
            <label className="text-sm text-gray-300">SFX</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
              className="w-full accent-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Ambient</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={ambientVolume}
              onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
              className="w-full accent-emerald-400"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
