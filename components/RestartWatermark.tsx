"use client";

import { useRouter } from "next/navigation";

export default function RestartWatermark() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/vault")}
      className="fixed bottom-6 right-6 z-50
                 w-16 h-16 rounded-full
                 border-2 border-white text-white
                 flex items-center justify-center
                 text-xs font-bold tracking-widest
                 animate-pulse
                 bg-black/40 backdrop-blur-sm
                 shadow-[0_0_25px_rgba(255,255,255,0.9)]
                 hover:scale-105 transition-transform"
    >
      RESTART
    </button>
  );
}
