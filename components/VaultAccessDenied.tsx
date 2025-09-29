"use client";
import VaultAccessDenied from "@/components/VaultAccessDenied";
import { usePlaySound } from "@/utils/playSound";
import { useRef } from "react";

export default function VaultAccessDenied() {
  const playSound = usePlaySound();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDenied = () => {
    // 🔊 play sound
    playSound("access_denied");

    // 🎥 play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleDenied}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
      >
        Trigger Access Denied
      </button>

      {/* Hidden or styled video */}
      <video
        ref={videoRef}
        src="/videos/vault/access_denied.mp4"
        className="mt-4 max-w-xl rounded-lg shadow-lg"
      />
    </div>
  );
}
