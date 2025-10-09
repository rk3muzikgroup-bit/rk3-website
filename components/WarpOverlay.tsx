"use client";

import { motion } from "framer-motion";
import { useWarp } from "@/hooks/useWarp";

export default function CockpitHUD() {
  const { warpTo, overlay } = useWarp();

  return (
    <>
      {/* Bottom-left controls */}
      <div className="absolute bottom-6 left-6 flex gap-3 pointer-events-auto z-50">
        {/* Dashboard Toggle ... */}

        {/* 🚀 Fleet Button */}
        <button
          onClick={() => warpTo("/fleet")}
          className="px-4 py-2 rounded-md bg-indigo-600/70 hover:bg-indigo-500 
                     border border-indigo-400/40 text-sm
                     shadow-[0_0_15px_rgba(99,102,241,0.8)] backdrop-blur-md"
        >
          View Fleet
        </button>
      </div>

      {/* Warp Overlay */}
      {overlay}
    </>
  );
}

export default function WarpOverlay({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      {/* Ripple Flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 10, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={onComplete}
        className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-yellow-400"
      />
    </motion.div>
  );
}
