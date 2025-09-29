"use client";

import { useEffect } from "react";
import { useNowPlaying } from "@/context/NowPlayingContext";

export default function SoulPortal() {
  const { setFile } = useNowPlaying();

  useEffect(() => {
    setFile("/sounds/ride/Soul_Ride.mp3");
  }, [setFile]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-purple-900 text-white">
      <h1 className="text-3xl font-bold mb-2">Soul Portal</h1>
      <p className="text-gray-300 mb-4">💜 Floating in high vibration.</p>
      <audio src="/sounds/ride/Soul_Ride.mp3" autoPlay loop />
    </div>
  );
}
