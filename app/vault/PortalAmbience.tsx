"use client";

import { useEffect } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function PortalAmbience({ type }: { type: "street" | "soul" | "spirit" }) {
  const playSound = usePlaySound();

  useEffect(() => {
    let soundPath = "";
    if (type === "street") soundPath = "/sounds/portals/street_ambience.mp3";
    if (type === "soul") soundPath = "/sounds/portals/soul_ambience.mp3";
    if (type === "spirit") soundPath = "/sounds/portals/spirit_ambience.mp3";

    const stop = playSound(soundPath, 0.6, true); // loop ambience at low volume
    return () => {
      if (stop) stop(); // stop when leaving portal
    };
  }, [type, playSound]);

  return null;
}
