"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function EnterVaultButton() {
  const router = useRouter();
  const playSound = usePlaySound();

  const handleEnterVault = async () => {
    playSound("/sounds/vault/unlock.mp3", 1);
    setTimeout(() => {
      router.push("/vault");
    }, 2000); // wait for sound
  };

  return (
    <button
      onClick={handleEnterVault}
      className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono shadow-lg z-20"
    >
      ENTER VAULT
    </button>
  );
}
