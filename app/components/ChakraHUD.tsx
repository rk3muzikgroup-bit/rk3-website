"use client";

import { useEffect, useState } from "react";
import type { Chakra } from "@/hooks/useAudioMixer";

const CHAKRA_ORDER: Chakra[] = [
  "root",
  "sacral",
  "solar",
  "heart",
  "throat",
  "thirdEye",
  "crown",
];

const CHAKRA_COLORS: Record<Chakra, string> = {
  root: "#ff3b3b",
  sacral: "#ff8c2b",
  solar: "#ffd43b",
  heart: "#3bff9a",
  throat: "#3bc4ff",
  thirdEye: "#7b5cff",
  crown: "#d8b4ff",
};

export default function ChakraHUD({
  activeChakra,
}: {
  activeChakra?: Chakra;
}) {
  const [energy, setEnergy] = useState(0);

  useEffect(() => {
    let raf: number;

    function tick() {
      const v =
        parseFloat(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--sound-energy")
        ) || 0;

      setEnergy(v);
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-2 pointer-events-none">
      {CHAKRA_ORDER.map((chakra, i) => {
        const isActive = chakra === activeChakra;
        const size = 14 + energy * 18;
        const glow = isActive ? 0.9 : 0.35;

        return (
          <div
            key={chakra}
            className="relative rounded-full transition-all duration-300"
            style={{
              width: size,
              height: size,
              border: `2px solid ${CHAKRA_COLORS[chakra]}`,
              boxShadow: `0 0 ${energy * 20}px ${CHAKRA_COLORS[chakra]}`,
              opacity: glow,
            }}
          />
        );
      })}
    </div>
  );
}
