"use client";

import { RefObject, useEffect } from "react";
import { useVolume } from "@/context/VolumeContext";

/**
 * Hook to normalize video volume based on global volume context
 * @param src path to video file
 * @param ref ref to <video> element
 */
export function useVideoVolume(src: string, ref: RefObject<HTMLVideoElement>) {
  const { videoVolume } = useVolume();

  useEffect(() => {
    const video = ref.current;
    if (video) {
      video.volume = videoVolume; // 🔊 apply normalized volume
    }
  }, [src, ref, videoVolume]);
}
