"use client";

import { useEffect } from "react";
import { useOverlay } from "@/context/OverlayContext";

export default function ConfessionsRoom() {
  const { showOverlay } = useOverlay();

  useEffect(() => {
    showOverlay("denied", 2000, true); // ❌ raw truth vibe
  }, [showOverlay]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        src="/videos/rooms/confessions_loop.mp4"
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-4xl font-bold text-red-400 drop-shadow-md mb-6">
          ❌ Confessions Room
        </h1>
        <p className="text-gray-300 mb-8">
          Release & Delete — a place to let go of your burdens.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <button className="px-6 py-3 bg-red-700 rounded-lg hover:bg-red-600">
            Write Confession
          </button>
          <button className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600">
            Release Ritual
          </button>
        </div>
      </div>
    </div>
  );
}
