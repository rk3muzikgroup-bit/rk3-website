"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useVideoSrc } from "@/utils/usePlayVideo";

export default function WarpPage() {
  const router = useRouter();
  const videoSrc = useVideoSrc("warp");

  // ⏩ As soon as warp video ends → jump straight to Vault
  const handleVideoEnd = () => {
    router.push("/vault/door_open");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        className="w-full h-auto rounded-2xl shadow-lg"
        onEnded={handleVideoEnd}
      />
      <p className="mt-4 text-lg">⚡ Warp Sequence</p>
    </div>
  );
}
