"use client";

import { useRouter } from "next/navigation";
import { PureComponent, useEffect, useRef } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useVideoSrc } from "@/hooks/useVideoSrc";
import CosmicBackground from "@/components/CosmicBackground";

export default function RidePage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const rideSrc = useVideoSrc("Street_Ride"); // swap with Soul_Ride / Spirit_Ride later
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // launch sound
    playSound("/sounds/ride/rocket_whoosh.mp3");

    // warp ripple cue at 45s
    const ripple = setTimeout(() => {
      playSound("/sounds/ride/warp_ripple.mp3");
    }, 45000);

    // vault arrival at 60s
    const timer = setTimeout(() => {
      playSound("/sounds/vault/door_hum.mp3");
      router.push("/vault");
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearTimeout(ripple);
    };
  }, [playSound, router]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* cosmic fx overlay */}
      <CosmicBackground />

      {/* cinematic ride video */}
      <video
        ref={videoRef}
        src={rideSrc}
        autoPlay
        muted
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* fade mask at edges for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}
