"use client";
import { useState, useEffect, useRef } from "react";

interface VaultDoorProps {
  onFinish: () => void;
}

export default function VaultDoor({ onFinish }: VaultDoorProps) {
  const [done, setDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      video.onended = () => {
        setDone(true);
        onFinish();
      };
    }
  }, [onFinish]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/videos/vault/doors_open.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted
      />
      {/* Skip Button */}
      <button
        onClick={() => {
          setDone(true);
          onFinish();
        }}
        className="
          absolute top-6 right-6 px-4 py-2 
          bg-black/70 text-white rounded-lg 
          border border-gray-500 
          hover:bg-black/90 transition
        "
      >
        Skip
      </button>
    </div>
  );
}
