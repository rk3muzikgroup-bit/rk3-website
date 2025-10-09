"use client";

import { useVolume } from "@/context/VolumeContext";
import { useEffect } from "react";

export function useVideoVolume(
  videoRef: React.RefObject<HTMLVideoElement>,
  type: "ride" | "room" | "cockpit" | "ambient" = "ride"
) {
  const { ambientVolume, muted } = useVolume();

  // baseline gains (Hollywood normalization map)
  const baseGains: Record<string, number> = {
    ride: 0.5,
    room: 0.35,
    cockpit: 0.4,
    ambient: 0.25, // default mid of 0.2–0.3
  };

  useEffect(() => {
    if (videoRef.current) {
      if (muted) {
        videoRef.current.volume = 0;
      } else {
        // ambient videos scale with slider
        if (type === "ambient") {
          videoRef.current.volume = ambientVolume;
        } else {
          videoRef.current.volume = baseGains[type];
        }
      }
    }
  }, [videoRef, type, ambientVolume, muted]);
}
