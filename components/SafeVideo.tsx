"use client";
import { useEffect, useRef } from "react";
import { useVolume } from "@/context/VolumeContext";

export default function SafeVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { muted } = useVolume();

  useEffect(() => {
    if (ref.current) {
      ref.current.muted = muted;
      ref.current.play().catch(() => {});
    }
  }, [muted]);

  return (
    <video
      ref={ref}
      src={src}
      className="h-full w-full object-cover"
      autoPlay
      loop
      playsInline
      muted={muted}
    />
  );
}
