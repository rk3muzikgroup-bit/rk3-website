"use client";

import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

/**
 * useExitCinematic
 * Plays the closing SFX, fades out, then redirects user.
 *
 * @param fadeDuration - how long to wait before routing (ms)
 */
export function useExitCinematic(fadeDuration: number = 2500) {
  const router = useRouter();
  const playSound = usePlaySound();

  const triggerExit = (target: string = "/vault/rooms") => {
    // 🔊 play cinematic closing whoosh
    playSound("vault/closing_long", { volume: 0.8 });

    // ⏳ delay navigation to let the SFX breathe
    setTimeout(() => {
      router.push(target);
    }, fadeDuration);
  };

  return { triggerExit };
}
