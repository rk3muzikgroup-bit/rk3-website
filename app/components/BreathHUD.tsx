"use client";

import type { BreathPhase } from "@/lib/breathTypes";

type Props = {
  phase?: BreathPhase;
};

const LABELS: Record<BreathPhase, string> = {
  inhale: "Inhale",
  hold_in: "Hold",
  exhale: "Exhale",
  hold_out: "Hold",
};

export default function BreathHUD({ phase }: Props) {
  if (!phase) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
      <div
        className={[
          "w-28 h-28 rounded-full flex items-center justify-center",
          "border border-white/20 text-sm tracking-widest",
          "transition-all duration-500",
          phase === "inhale" && "scale-110 bg-emerald-400/20",
          phase === "exhale" && "scale-90 bg-indigo-400/20",
        ].join(" ")}
      >
        {LABELS[phase]}
      </div>
    </div>
  );
}
