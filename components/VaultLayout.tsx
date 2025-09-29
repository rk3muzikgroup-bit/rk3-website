// src/components/VaultLayout.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

type VaultLayoutProps = {
  children: ReactNode;
};

export default function VaultLayout({ children }: VaultLayoutProps) {
  const pathname = usePathname();
  const section = pathname.split("/").pop() || "";
  const engravedName = section.toUpperCase();

  const playSound = usePlaySound();

  // 🔊 Auto-sync vault sounds
  useEffect(() => {
    if (section === "closing") {
      playSound("/sounds/vault/closing_long.mp3", { volume: 0.7 });
    }
    if (section === "music") {
      playSound("/sounds/vault/door_hum.mp3", { volume: 0.3, loop: true });
    }
    if (section === "avatars") {
      playSound("/sounds/vault/portal_thud.mp3", { volume: 0.6 });
    }
    if (section === "healing") {
      playSound("/sounds/vault/door_rumble.mp3", { volume: 0.4 });
    }
    // Add more vault sections here as you create them
  }, [section, playSound]);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: "url('/RKS3_Emblem.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Engraved Title */}
      <h1
        className="relative z-10 text-6xl font-bold tracking-widest select-none"
        style={{
          textShadow:
            "2px 2px 6px rgba(0,0,0,0.8), -2px -2px 6px rgba(255,215,0,0.4)",
        }}
      >
        {engravedName}
      </h1>

      {/* Vault Content */}
      <div className="relative z-10 mt-8 w-full max-w-5xl p-6">{children}</div>
    </div>
  );
}
import VaultNav from "./VaultNav";

export default function VaultLayout({
  title,
  bgImage,
  sound,
}: {
  title: string;
  bgImage: string;
  sound: string;
}) {
  return (
    <div
      className="relative w-screen h-screen bg-black flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">
        {title}
      </h1>
      <audio src={sound} autoPlay />
      <VaultNav />
    </div>
  );
}
