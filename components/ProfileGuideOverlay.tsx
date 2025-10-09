"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { VISITOR_GUIDE } from "@/utils/visitorGuide";

export default function ProfileGuideOverlay() {
  const [showGuide, setShowGuide] = useState(false);

  // 🎹 Shortcut: Shift+G
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "g" || e.key === "G")) {
        setShowGuide((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setShowGuide(true)}
        className="absolute top-6 right-6 z-40 px-3 py-2 text-xs font-mono rounded-lg bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white/20"
      >
        📖 Open Guide (Shift+G)
      </button>

      {/* Overlay */}
      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="absolute inset-0 z-50 bg-black/90 text-white p-6 overflow-y-auto"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-xl font-bold">🌌 Visitor Guide</h2>
            {VISITOR_GUIDE.map((section, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <ul className="list-disc list-inside text-sm space-y-1 opacity-80">
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <button
              onClick={() => setShowGuide(false)}
              className="mt-6 px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 transition text-sm"
            >
              ✖ Close Guide
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
