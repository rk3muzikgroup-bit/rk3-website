"use client";
import { useVolume } from "@/context/VolumeContext";
import { Volume2, VolumeX } from "lucide-react";

export default function HUDVolume() {
  const { muted, toggleMute } = useVolume();

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 bg-black/50 text-white p-3 rounded-full shadow-xl z-50"
    >
      {muted ? <VolumeX size={28} /> : <Volume2 size={28} />}
    </button>
  );
}
