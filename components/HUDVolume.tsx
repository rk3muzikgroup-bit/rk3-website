"use client";

import { useVolume } from "@/context/VolumeContext";
import { Volume2, VolumeX } from "lucide-react";

export default function HUDVolume() {
  const { muted, toggleMute } = useVolume();

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 p-3 bg-black/50 rounded-full shadow-lg hover:bg-black/70 transition"
      aria-label="Toggle volume"
    >
      {muted ? (
        <VolumeX className="w-6 h-6 text-white" />
      ) : (
        <Volume2 className="w-6 h-6 text-white" />
      )}
    </button>
  );
}
