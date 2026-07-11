"use client";

import { useBreathPhase } from "@/hooks/useBreathPhase";
import type { Chakra } from "@/hooks/useAudioMixer";
import type { BreathPhase } from "@/lib/breathTypes";

const CHAKRA_COLORS: Record<Chakra, string> = {
  root: "bg-red-500",
  sacral: "bg-orange-400",
  solar: "bg-yellow-400",
  heart: "bg-emerald-400",
  throat: "bg-sky-400",
  thirdEye: "bg-indigo-400",
  crown: "bg-purple-400",
};

type Props = {
  elapsedMs: number;
  chakra?: Chakra;
};

export default function BreathVisual({
  elapsedMs,
  chakra = "heart",
}: Props) {
  const phase = useBreathPhase({ elapsedMs }) as BreathPhase;

  const scaleClass =
    phase === "inhale"
      ? "scale-125"
      : phase === "exhale"
      ? "scale-90"
      : "scale-110"; // hold_in | hold_out

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
      <div
        className={[
          "rounded-full opacity-30 transition-all duration-[3000ms] ease-in-out",
          CHAKRA_COLORS[chakra],
          scaleClass,
        ].join(" ")}
        style={{ width: 320, height: 320 }}
        aria-hidden
      />
    </div>
  );
}
