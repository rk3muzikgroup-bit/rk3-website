"use client";

import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultTrigger({
  label,
  sound,
}: {
  label: string;
  sound: string;
}) {
  const playSound = usePlaySound();

  const handleClick = () => {
    playSound(sound);
  };

  return (
    <button
      onClick={handleClick}
      className="px-5 py-3 rounded-xl bg-black/60 hover:bg-emerald-600 text-white font-semibold shadow-lg transition"
    >
      {label}
    </button>
  );
}
