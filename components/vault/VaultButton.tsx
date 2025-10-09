"use client";

import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultButton() {
  const playSound = usePlaySound();

  const handleClick = () => {
    // plays unlock sound at SFX volume (from VolumeContext)
    playSound("/sounds/vault/unlock.mp3");
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg transition"
    >
      Enter Vault
    </button>
  );
}
