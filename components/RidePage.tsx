"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function RidePage({ path, videoSrc }: { path: string; videoSrc: string }) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const warpVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isWarping, setIsWarping] = useState(false);

  // Play rocket hum on mount
  useEffect(() => {
    if (!audioRef.current) return;
    const a = audioRef.current;
    a.loop = true;
    a.volume = 0.3;
    a.play().catch(() => {});
    return () => {
      try {
        a.pause();
        // @ts-ignore
        a.src = "";
      } catch {}
    };
  }, []);

  // Ensure ride video plays
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.autoplay = true;
    v.play().catch(() => {});
  }, []);

  const triggerWarpBack = () => {
    setIsWarping(true);

    // Play swoosh immediately
    const swoosh = new Audio("/sounds/ride/transition_whoosh.mp3");
    swoosh.volume = 0.6;
    swoosh.play().catch(() => {});

    // Delay route until warp video finishes (~1.5s)
    setTimeout(() => {
      router.push("/vault");
    }, 1500);
  };

  return (
    <div className="relative h-[100dvh] w-full bg-black">
      {/* Ride loop video */}
      <video
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isWarping ? "opacity-0" : "opacity-100"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Overlay info */}
      {!isWarping && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            {path.toUpperCase()} RIDE
          </h1>
        </div>
      )}

      {/* Exit button */}
      {!isWarping && (
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={triggerWarpBack}
            className="rounded-lg bg-white/90 px-4 py-2 font-semibold text-black shadow-lg transition hover:scale-105"
          >
            Warp Back to Vault
          </button>
        </div>
      )}

      {/* Warp overlay video */}
      {isWarping && (
        <video
          ref={warpVideoRef}
          src="/videos/ride/warp.mp4"
          className="absolute inset-0 h-full w-full object-cover z-30"
          autoPlay
          playsInline
          muted
        />
      )}

      {/* Rocket hum */}
      <audio ref={audioRef} src="/sounds/ride/rocket_whoosh.mp3" className="hidden" />
    </div>
  );
}
