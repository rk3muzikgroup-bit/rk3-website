"use client";

import { useEffect, useRef } from "react";
import { useVolume } from "@/context/VolumeContext";
import CockpitHUD from "@/components/cockpit/CockpitHUD";

export default function PortalPage({ params }: { params: { portal: string } }) {
  const { ambientVolume, muted } = useVolume();
  const videoRef = useRef<HTMLVideoElement>(null);

  // pick video based on portal param
  const getVideoSrc = () => {
    switch (params.portal) {
      case "street":
        return "/videos/starfield_street.mp4"; // 10s
      case "soul":
        return "/videos/starfield_soul.mp4";   // 17s
      case "spirit":
        return "/videos/starfield_spirit.mp4"; // 20s
      default:
        return "/videos/starfield_street.mp4";
    }
  };

  // keep volume normalized
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = muted ? 0 : ambientVolume;
    }
  }, [ambientVolume, muted]);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Starfield video */}
      <video
        ref={videoRef}
        src={getVideoSrc()}
        autoPlay
        loop
        muted={false}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Cockpit HUD overlay */}
      <div className="relative z-10">
        <CockpitHUD />
      </div>
    </main>
  );
}
