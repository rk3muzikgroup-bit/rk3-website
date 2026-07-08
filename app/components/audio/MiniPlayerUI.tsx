"use client";

import { motion } from "framer-motion";
import { useAudioPlayer } from "@/context/AudioPlayerContext";

export default function MiniPlayer() {
  const {
    isPlaying,
    toggle,
    stop,
    setVolume,
    volume,
    currentTitle,
    hasPlayed,
  } = useAudioPlayer();

  // Do not render until something has played
  if (!hasPlayed) return null;

  return (
    <div
      className="
        fixed
        inset-x-0
        bottom-[140px]   /* ⬅️ moved DOWN ~1 inch */
        z-[9999]
        flex
        justify-center
        pointer-events-none
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="pointer-events-auto"
      >
        <div
          className="
            w-[480px]
            h-[96px]
            rounded-full
            bg-black/80
            backdrop-blur-2xl
            border
            border-cyan-400/30
            px-6
            flex
            items-center
            gap-5
            shadow-[0_0_40px_rgba(34,211,238,0.15)]
          "
        >
          {/* ARC CORE */}
          <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse" />

          {/* TITLE */}
          <div className="flex-1 text-center overflow-hidden">
            <div className="text-[10px] tracking-[0.35em] uppercase text-cyan-300/60">
              RK3 • SYSTEM
            </div>
            <div className="text-sm text-white truncate">
              {currentTitle ?? "Soul Session Active"}
            </div>
          </div>

          {/* PLAY / PAUSE */}
          <button
            onClick={toggle}
            className="
              w-12
              h-12
              rounded-full
              border
              border-cyan-400/40
              bg-cyan-500/10
              text-cyan-200
              hover:bg-cyan-500/20
              transition
            "
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>

          {/* STOP */}
          <button
            onClick={stop}
            className="
              w-10
              h-10
              rounded-full
              border
              border-red-400/40
              bg-red-500/10
              text-red-300
              hover:bg-red-500/20
              transition
            "
          >
            ■
          </button>

          {/* VOLUME */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 accent-cyan-400"
          />
        </div>
      </motion.div>
    </div>
  );
}
