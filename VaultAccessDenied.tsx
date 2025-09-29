"use client";
import { usePlaySound } from "@/utils/playSound";

export default function VaultAccessDenied() {
  const playSound = usePlaySound();

  const handleDenied = () => {
    playSound("access_denied");
  };

  return (
    <button
      onClick={handleDenied}
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      Trigger Access Denied
    </button>
  );
}
