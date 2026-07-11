"use client";

import { useAudioEnergy } from "@/hooks/useAudioEnergy";

export default function SoundReactiveGlow() {
  const { energyRef } = useAudioEnergy();

  const intensity = Math.min(Math.max(energyRef.current ?? 0, 0), 1);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-300"
      style={{
        background: `radial-gradient(
          circle at center,
          rgba(99,102,241,${0.25 * intensity}),
          transparent 60%
        )`,
      }}
    />
  );
}
