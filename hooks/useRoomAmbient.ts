"use client";

import { useEffect, useRef } from "react";
import { useVolume, baselineGain } from "@/context/VolumeContext";

export function useRideVolume(videoRef: React.RefObject<HTMLVideoElement>) {
  const { ambientVolume, muted } = useVolume(); // ride tied to ambient for control
  const internalRef = useRef<HTMLVideoElement | null>(null);

  // sync the videoRef passed in
  useEffect(() => {
    if (videoRef.current) {
      internalRef.current = videoRef.current;

      // 🎚️ baseline set with Hollywood gain map
      const vol = muted ? 0 : ambientVolume * baselineGain.ride;
      videoRef.current.volume = vol;

      // ⭐ expose globally for Debug HUD
      if (typeof window !== "undefined") {
        (window as any).__rideVideo = {
          video: videoRef.current,
          volume: vol,
          file: videoRef.current.currentSrc || "/videos/ride/Street_Ride.mp4",
        };
      }
    }
  }, [videoRef]);

  // keep volume synced when context changes
  useEffect(() => {
    if (internalRef.current) {
      const vol = muted ? 0 : ambientVolume * baselineGain.ride;
      internalRef.current.volume = vol;

      if (typeof window !== "undefined") {
        (window as any).__rideVideo = {
          video: internalRef.current,
          volume: vol,
          file: internalRef.current.currentSrc || "/videos/ride/Street_Ride.mp4",
        };
      }
    }
  }, [ambientVolume, muted]);

  // fade helpers
  function fadeOut(duration = 1500) {
    if (!internalRef.current) return;
    const start = internalRef.current.volume;
    const steps = 30;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (internalRef.current) {
        const newVol = start * (1 - step / steps);
        internalRef.current.volume = newVol;

        if (typeof window !== "undefined") {
          (window as any).__rideVideo.volume = newVol;
        }
      }
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
  }

  function fadeIn(targetVol: number = ambientVolume * baselineGain.ride, duration = 1500) {
    if (!internalRef.current) return;
    internalRef.current.volume = 0;

    const steps = 30;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const newVol = muted ? 0 : targetVol * (step / steps);
      if (internalRef.current) {
        internalRef.current.volume = newVol;

        if (typeof window !== "undefined") {
          (window as any).__rideVideo.volume = newVol;
        }
      }
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
  }

  return { fadeOut, fadeIn };
}
