"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AmbientBackground from "@/components/AmbientBackground";
import MiniPlayer from "@/components/audio/MiniPlayer";

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const hideGlobalMiniPlayer = pathname === "/nexus";

  return (
    <div className="relative min-h-screen w-full bg-[#05070b] text-white overflow-x-hidden">
      
      {/* 🌌 Ambient Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AmbientBackground />
      </div>

      {/* 🧱 App Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>

      {/* 🎧 Mini Player — Nexus has its own dedicated audio controls */}
      {!hideGlobalMiniPlayer && (
        <div className="fixed inset-x-0 bottom-0 z-[100] pointer-events-none">
          <MiniPlayer />
        </div>
      )}

    </div>
  );
}
