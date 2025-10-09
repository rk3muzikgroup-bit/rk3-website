"use client";

import { useCallback } from "react";

export default function useFailHandler() {
  return useCallback(() => {
    try {
      // 🎵 play the denied blast
      const audio = new Audio("/sounds/vault/denied_blast.mp3");
      audio.volume = 0.8;
      audio.play().catch((err) => console.warn("Playback failed:", err));

      // 🎥 add Hollywood shake
      const body = document.body;
      body.classList.add("fail-shake");

      setTimeout(() => {
        body.classList.remove("fail-shake");
      }, 600); // 🔥 0.6s raw shake
    } catch (error) {
      console.error("useFailHandler error:", error);
    }
  }, []);
}
