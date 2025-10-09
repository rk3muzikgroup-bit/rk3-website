"use client";

import { useEffect, useState } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

export function useCockpitHum() {
  const playSound = usePlaySound();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    playSound("vault/door_hum", { loop: true, volume: 0.4 });
  }, [isPlaying, playSound]);

  const startHum = () => setIsPlaying(true);
  const stopHum = () => setIsPlaying(false);

  return { startHum, stopHum, isPlaying };
}
