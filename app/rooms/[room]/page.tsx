"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { roomConfig } from "../../../config/rooms";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useAmbient } from "@/hooks/useAmbient";
import { useVideoVolume } from "@/hooks/useVideoVolume";

export default function RoomPage() {
  const { room } = useParams<{ room: string }>();
  const config = roomConfig[room];
  const playSound = usePlaySound();
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Room not found 🚫</h1>
      </div>
    );
  }

  useEffect(() => {
    useAmbient(config.sound);
    if (config.special) {
      setTimeout(() => playSound(config.special!), 1000);
    }
  }, [config, playSound]);

  useVideoVolume(config.video, videoRef);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        loop
        className="w-full h-full object-cover absolute inset-0 z-0"
        src={config.video}
        onLoadedData={() => videoRef.current?.play().catch(() => {})}
      />

      <div className="relative z-10 text-center">
        <h1 className={`text-5xl font-extrabold mb-4 text-${config.color}-400`}>
          {config.label}
        </h1>
        <p className="text-lg text-gray-300">
          Access Level: <span className="capitalize">{config.access}</span>
        </p>
      </div>

      {/* HUD controls */}
      <div className="relative z-20 flex gap-4 mt-8 justify-center">
        <button
          onClick={() => (window.location.href = "/vault")}
          className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 shadow-md"
        >
          ⬅️ Back to Vault
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md"
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
}
