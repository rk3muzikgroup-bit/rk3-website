"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function SealOfCompletion() {
  const [showEmblem, setShowEmblem] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const router = useRouter();
  const playSound = usePlaySound();

  useEffect(() => {
    // Step 1: Delay, then show emblem
    const emblemTimer = setTimeout(() => {
      setShowEmblem(true);
    }, 2500);

    // Step 2: Show text + stamp sound
    const textTimer = setTimeout(() => {
      setShowText(true);
      playSound("/sounds/vault/portal_thud.mp3", { volume: 0.8 });
    }, 2500 + 3000);

    // Step 3: Fade out everything
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500 + 3000 + 5000);

    // Step 4: Auto-redirect home if no user action after 11s
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 11000);

    return () => {
      clearTimeout(emblemTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(redirectTimer);
    };
  }, [playSound, router]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black
        transition-opacity duration-[3000ms] ease-out
        ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Emblem watermark */}
      <div
        className={`absolute inset-0 flex items-center justify-center transform transition-all duration-[4000ms] ease-out
          ${showEmblem ? "opacity-30 scale-110" : "opacity-0 scale-75"}`}
      >
        <Image
          src="/RKS3_Emblem.png"
          alt="RK3 Emblem"
          width={600}
          height={600}
          className="drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          priority
        />
      </div>

      {/* Seal text */}
      <div
        className={`relative text-center transition-opacity duration-2000 ${
          showText ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-white text-4xl font-bold tracking-widest drop-shadow-lg">
          ✦ SEAL OF COMPLETION ✦
        </h1>
        <p className="text-gray-300 mt-4 text-lg">Street • Soul • Spirit</p>
      </div>
    </div>
  );
}
