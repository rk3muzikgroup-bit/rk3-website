"use client";

import HUDFade from "./ui/HUDFade";
import type { Recommendation } from "@/lib/recommendations";

type Props = {
  rec: Recommendation | null;
  onLaunch: (id: string, type: "session" | "program") => void;
  disabled?: boolean;
};

export default function RecommendationHUD({
  rec,
  onLaunch,
  disabled = false,
}: Props) {
  if (!rec) return null;

  function handleLaunch() {
    if (disabled || !rec) return;
    onLaunch(rec.id, rec.type);
  }

  return (
    <HUDFade show={true} delay={300}>
      <div
        className={`fixed top-1/2 left-6 z-50 w-72 -translate-y-1/2
          bg-black/80 backdrop-blur-xl border border-white/10
          rounded-xl p-4 transition-opacity
          ${disabled ? "opacity-40 pointer-events-none" : ""}
        `}
      >
        <div className="text-sm tracking-widest uppercase mb-2 opacity-70">
          Suggested Next
        </div>

        <div className="text-xs opacity-70 mb-3">
          {rec.reason}
        </div>

        <button
          onClick={handleLaunch}
          aria-label={`Launch recommended ${rec.type}`}
          className="w-full bg-indigo-500/90 hover:bg-indigo-500 text-black text-sm py-2 rounded transition"
        >
          When you’re ready
        </button>
      </div>
    </HUDFade>
  );
}
