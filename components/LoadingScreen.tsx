"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake 2s load time (you can adjust or tie to real file loading later)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center text-white">
        <div className="animate-pulse text-2xl mb-6">🌌 RKS3 Loading...</div>
        <video
          autoPlay
          loop
          muted
          className="w-72 opacity-50 mx-auto rounded-2xl shadow-lg"
          src="/videos/starfield_loop.mp4"
        />
      </div>
    </div>
  );
}
