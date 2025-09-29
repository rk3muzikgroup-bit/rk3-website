"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RoomPage({ room, videoSrc }: { room: string; videoSrc: string }) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isWarping, setIsWarping] = useState(true); // warp-in at mount

  // Warp-in on load
  useEffect(() => {
    const swoosh = new Audio("/sounds/ride/transition_whoosh.mp3");
    swoosh.volume = 0.6;
    swoosh.play().catch(() => {});
    const timer = setTimeout(() => setIsWarping(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Ensure room video plays
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.autoplay = true;
    v.play().catch(() => {});
  }, []);

  const handleExit = () => {
    setIsWarping(true);
    const swoosh = new Audio("/sounds/ride/transition_whoosh.mp3");
    swoosh.volume = 0.6;
    swoosh.play().catch(() => {});
    setTimeout(() => {
      router.push("/vault");
    }, 1500);
  };

  // Overlay assets by room
  const overlays: Record<
    string,
    { icon: string; label: string; glowColor: string }
  > = {
    self_love: {
      icon: "/images/icons/heart.png",
      label: "SELF-LOVE ROOM",
      glowColor: "from-pink-400 to-red-500",
    },
    healing: {
      icon: "/images/icons/lotus.png",
      label: "HEALING ROOM",
      glowColor: "from-sky-400 to-cyan-500",
    },
    legacy: {
      icon: "/images/icons/scroll.png",
      label: "LEGACY ROOM",
      glowColor: "from-amber-400 to-yellow-500",
    },
  };

  const overlay = overlays[room];

  return (
    <div className="relative h-[100dvh] w-full bg-black">
      {/* Room loop */}
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

      {/* Overlay content */}
      {!isWarping && overlay && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6">
          {/* Icon with glow */}
          <div
            className={`relative h-28 w-28 rounded-full bg-gradient-to-br ${overlay.glowColor} p-[2px] shadow-lg`}
          >
            <div className="absolute inset-0 animate-rk3Pulse rounded-full bg-gradient-to-br blur-xl opacity-70" />
            <Image
              src={overlay.icon}
              alt={overlay.label}
              width={96}
              height={96}
              className="relative z-10 mx-auto"
            />
          </div>
          {/* Label */}
          <h1 className="text-4xl font-bold text-white drop-shadow-lg uppercase">
            {overlay.label}
          </h1>
        </div>
      )}

      {/* Exit button */}
      {!isWarping && (
        <div className="absolute bottom-6 right-6 z-20">
          <button
            onClick={handleExit}
            className="rounded-lg bg-white/90 px-4 py-2 font-semibold text-black shadow-lg transition hover:scale-105"
          >
            Warp Back to Vault
          </button>
        </div>
      )}

      {/* Warp overlay */}
      {isWarping && (
        <video
          src="/videos/ride/warp.mp4"
          className="absolute inset-0 h-full w-full object-cover z-30"
          autoPlay
          playsInline
          muted
        />
      )}

      {/* Local CSS for glowing pulse */}
      <style jsx>{`
        @keyframes rk3Pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
        .animate-rk3Pulse {
          animation: rk3Pulse 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
