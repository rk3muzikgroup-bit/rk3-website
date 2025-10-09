"use client";
import { useEffect } from "react";
import { useVolume } from "@/context/VolumeContext";
import { videoGains } from "./config/gainMap";

export function useVideoVolume(src: string, ref: React.RefObject<HTMLVideoElement>) {
  const { volume, muted } = useVolume();

  useEffect(() => {
    if (!ref.current) return;

    const baseGain = videoGains[src] ?? 0.5;
    const finalVol = muted ? 0 : Math.max(0, Math.min(1, volume * baseGain));

    ref.current.volume = finalVol;
  }, [src, volume, muted, ref]);
}
