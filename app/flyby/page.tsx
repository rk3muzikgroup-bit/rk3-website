"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useVolume } from "@/context/VolumeContext";

export default function FlybyPage() {
  const router = useRouter();
  const { ambientVolume, muted } = useVolume();
  const audioRef = useRef<HTMLAudioElement>(null);

  // normalize rocket audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : ambientVolume * 0.9;
    }
  }, [ambientVolume, muted]);

  // after docking, fade to cockpit
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/cockpit");
    }, 7600); // 7.5s video + slight buffer
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* NASA cinematic flyby + docking */}
      <video
        src="/videos/nasa_flyby.mp4"
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Rocket whoosh sound */}
      <audio ref={audioRef} autoPlay>
        <source src="/sounds/ride/rocket_whoosh.mp3" type="audio/mpeg" />
      </audio>

      {/* Optional cinematic overlay text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-widest drop-shadow-lg animate-pulse">
          🚀 APPROACHING DOCK
        </h1>
      </div>

      {/* Fade to black at end before cockpit */}
      <div className="absolute inset-0 bg-black opacity-0 animate-[fadeout_1s_ease-in-out_6.5s_forwards]" />
    </main>
  );
}
