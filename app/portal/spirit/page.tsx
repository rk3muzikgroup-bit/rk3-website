"use client";

import { useEffect } from "react";
import { useNowPlaying } from "@/context/NowPlayingContext";

export default function SpiritPortal() {
  const { setFile } = useNowPlaying();

  useEffect(() => {
    setFile("/sounds/ride/Spirit_Ride.mp3");
  }, [setFile]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-indigo-950 text-white">
      <h1 className="text-3xl font-bold mb-2">Spirit Portal</h1>
      <p className="text-gray-300 mb-4">✨ Beyond the veil, pure essence.</p>
      <audio src="/sounds/ride/Spirit_Ride.mp3" autoPlay loop />
    </div>
  );
}
