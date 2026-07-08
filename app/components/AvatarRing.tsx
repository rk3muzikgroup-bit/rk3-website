"use client";

import { chakraColor } from "@/lib/avatar";
import type { Chakra } from "@/hooks/useAudioMixer";

type Props = {
  name: string;
  chakra?: Chakra;
  size?: number;
};

export default function AvatarRing({
  name,
  chakra,
  size = 72,
}: Props) {
  const color = chakraColor(chakra);
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center rounded-full"
    >
      {/* ✨ Aura ring */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0 animate-pulse"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 4}
          stroke={color}
          strokeWidth={3}
          fill="none"
          opacity={0.85}
        />
      </svg>

      {/* 🧍 Avatar core */}
      <div
        className="flex items-center justify-center rounded-full text-lg font-bold text-black"
        style={{
          width: size - 16,
          height: size - 16,
          background: color,
        }}
        aria-label={`Avatar for ${name}`}
      >
        {initial}
      </div>
    </div>
  );
}
