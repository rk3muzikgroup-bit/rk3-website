"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function ReturnVaultButton() {
  const router = useRouter();
  const playSound = usePlaySound();

  const handleReturn = () => {
    playSound("/sounds/vault/door_close.mp3", 0.9);
    setTimeout(() => {
      router.push("/vault");
    }, 1500);
  };

  return (
    <button
      onClick={handleReturn}
      className="absolute top-6 left-6 px-4 py-2 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-teal-300 font-mono shadow-md z-20"
    >
      ⬅ Return to Vault
    </button>
  );
}
