"use client";

import { videoLevels, VideoName } from "@/utils/videoLevels";

export function useVideoSrc(name: VideoName): string {
  return videoLevels[name];
}
