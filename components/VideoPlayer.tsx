"use client";

import React from "react";

type VideoPlayerProps = {
  src: string;
  loop?: boolean;
};

export default function VideoPlayer({ src, loop = true }: VideoPlayerProps) {
  return (
    <video
      src={src}
      autoPlay
      muted
      playsInline
      loop={loop}
      className="absolute top-0 left-0 w-full h-full object-contain bg-black scale-90"
    />
  );
}
