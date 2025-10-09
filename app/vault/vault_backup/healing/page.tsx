"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultClosingPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const [fadeOut, setFadeOut] = useState(false);

  const label = "HEALING";

  useEffect(() => {
    // play vault closing sound
    playSound("vault/closing_long");

    // fade screen out after 2.5s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);

    // auto-redirect after 11s
    const returnTimer = setTimeout(() => router.push("/"), 11000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(returnTimer);
    };
  }, [router, playSound]);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen bg-black text-white transition-opacity duration-2000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="text-4xl font-bold tracking-widest">
        {label} VAULT SEALED
      </h1>
    </div>
  );
}
