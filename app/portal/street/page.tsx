"use client";

import { useEffect } from "react";
import { useNowPlaying } from "@/context/NowPlayingContext";

export default function StreetPortal() {
  const { setFile } = useNowPlaying();

  useEffect(() => {
    setFile("/sounds/ride/Street_Ride.mp3");
  }, [setFile]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-2">Street Portal</h1>
      <p className="text-gray-400 mb-4">🚦 Cruising the concrete jungle.</p>
      <audio src="/sounds/ride/Street_Ride.mp3" autoPlay loop />
    </div>
  );
}
