"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultOpeningPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const [fadeIn, setFadeIn] = useState(false);

  const label = "HEALING";

  useEffect(() => {
    // play vault unlock sound
    playSound("vault/unlock");

    // fade screen in after 1s
    const fadeTimer = setTimeout(() => setFadeIn(true), 1000);

    // auto-redirect into Healing Room after 6s
    const goTimer = setTimeout(() => router.push("/vault/rooms/healing"), 6000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goTimer);
    };
  }, [router, playSound]);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen bg-black text-white transition-opacity duration-2000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-4xl font-bold tracking-widest text-emerald-300 drop-shadow-[0_0_20px_rgba(0,255,200,0.9)]">
        {label} VAULT OPENED
      </h1>
    </div>
  );
}
