"use client";

import { createContext, useContext, useState, ReactNode, useRef } from "react";
import { useAudioBus } from "@/hooks/useAudioBus";
import ScreenFade from "@/components/ScreenFade";   // fade/pulse/strobe/cosmic
import OverlayHud from "@/components/OverlayHud";   // HUD glitch text

type OverlayState = {
  text: string;
  color: string;
  visible: boolean;
};

type OverlayContextType = {
  overlay: OverlayState;
  showOverlay: (preset: string, durationMs?: number, priority?: boolean) => void;
  showChain: (
    steps: { preset: string; duration?: number }[],
    priority?: boolean
  ) => void;
};

// 🎨 Presets: each has HUD text, color, stinger/loop, fade color, and effect mode
const PRESETS: Record<
  string,
  {
    text: string;
    color: string;
    stinger?: string;
    loop?: string;
    fade?: string;
    mode?: "fade" | "pulse" | "doublePulse" | "strobe" | "cosmic";
  }
> = {
  granted: {
    text: "ACCESS GRANTED",
    color: "text-green-400",
    stinger: "/sounds/vault/unlock.mp3",
    loop: "/sounds/vault/door_hum.mp3",
    fade: "bg-green-700/80",
    mode: "fade", // ✅ smooth green fade
  },
  denied: {
    text: "ACCESS DENIED",
    color: "text-red-500",
    stinger: "/sounds/vault/denied_blast.mp3",
    fade: "bg-red-800/80",
    mode: "doublePulse", // 🚨 double flash
  },
  launch: {
    text: "🚀 PREPARING FOR LAUNCH",
    color: "text-white",
    stinger: "/sounds/ride/warp_speed.mp3",
    fade: "bg-white/80",
    mode: "strobe", // ⚡ warp strobe flashes
  },
  street: {
    text: "STREET MODE",
    color: "text-indigo-400",
    stinger: "/sounds/ride/street_engine.mp3",
    loop: "/sounds/ride/street_music_loop.mp3",
    fade: "bg-indigo-800/80",
    mode: "fade",
  },
  soul: {
    text: "SOUL MODE",
    color: "text-emerald-400",
    stinger: "/sounds/ride/soul_engine.mp3",
    loop: "/sounds/ride/soul_music_loop.mp3",
    fade: "bg-emerald-800/80",
    mode: "fade",
  },
  spirit: {
    text: "SPIRIT MODE",
    color: "text-yellow-400",
    stinger: "/sounds/ride/spirit_engine.mp3",
    loop: "/sounds/ride/spirit_music_loop.mp3",
    fade: "bg-purple-800/80",
    mode: "cosmic", // 🌌 gradient shimmer
  },
  closing: {
    text: "VAULT CLOSING...",
    color: "text-gray-300",
    loop: "/sounds/vault/closing_long.mp3",
    fade: "bg-black",
    mode: "fade",
  },
};

// 🎞️ Prebuilt chains (can still mix/match)
const CHAINS: Record<string, { preset: string; duration: number }[]> = {
  launch_sequence: [
    { preset: "launch", duration: 3000 },
    { preset: "street", duration: 2500 },
    { preset: "granted", duration: 2500 },
  ],
  spirit_sequence: [
    { preset: "spirit", duration: 3000 },
    { preset: "granted", duration: 2500 },
  ],
  closing_sequence: [{ preset: "closing", duration: 5000 }],
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<OverlayState>({
    text: "",
    color: "text-white",
    visible: false,
  });

  const { crossfadeTo } = useAudioBus();
  const queue = useRef<{ preset: string; duration: number }[]>([]);
  const busy = useRef(false);

  // 🔥 fade/pulse/strobe states
  const [fadeKey, setFadeKey] = useState<number>(0);
  const [fadeColor, setFadeColor] = useState<string>("bg-black");
  const [fadeMode, setFadeMode] = useState<
    "fade" | "pulse" | "doublePulse" | "strobe" | "cosmic"
  >("fade");

  // 🔎 Debug logs
  const log = (msg: string) => {
    console.log(`[Overlay] ${msg}`);
    if (typeof window !== "undefined") {
      const el = document.getElementById("overlay-debug");
      if (el) el.innerText = msg;
    }
  };

  const runNext = () => {
    if (busy.current) return;
    if (queue.current.length === 0) return;

    const { preset, duration } = queue.current.shift()!;
    const match = PRESETS[preset] || { text: preset, color: "text-white" };

    // 🎬 trigger fade effect
    setFadeColor(match.fade || "bg-black");
    setFadeMode(match.mode || "fade");
    setFadeKey((k) => k + 1);

    setOverlay({ text: match.text, color: match.color, visible: true });
    busy.current = true;
    log(`▶ ${match.text}`);

    // 🔊 stinger
    if (match.stinger) {
      const sfx = new Audio(match.stinger);
      sfx.volume = 0.9;
      sfx.play().catch(() => {});
    }

    // 🎵 loop crossfade
    if (match.loop) {
      crossfadeTo(match.loop, 2.0, 0.8);
    }

    // hide & free
    setTimeout(() => {
      setOverlay((prev) => ({ ...prev, visible: false }));
      busy.current = false;
      setTimeout(runNext, 300);
    }, duration);
  };

  const showOverlay = (
    preset: string,
    durationMs = 2000,
    priority = false
  ) => {
    if (CHAINS[preset]) {
      const chain = CHAINS[preset];
      if (priority) {
        queue.current = [];
        busy.current = false;
      }
      queue.current.push(...chain);
      runNext();
      return;
    }

    if (priority) {
      queue.current = [];
      busy.current = false;
      queue.current.push({ preset, duration: durationMs });
      runNext();
    } else {
      queue.current.push({ preset, duration: durationMs });
      runNext();
    }
  };

  const showChain = (
    steps: { preset: string; duration?: number }[],
    priority = false
  ) => {
    if (priority) {
      queue.current = [];
      busy.current = false;
    }
    steps.forEach(({ preset, duration }) => {
      queue.current.push({ preset, duration: duration ?? 2000 });
    });
    runNext();
  };

  return (
    <OverlayContext.Provider value={{ overlay, showOverlay, showChain }}>
      {children}
      <OverlayHud />
      <ScreenFade
        trigger={fadeKey}
        duration={800}
        color={fadeColor}
        mode={fadeMode}
      />
      <div
        id="overlay-debug"
        className="fixed bottom-2 left-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded"
      />
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used inside OverlayProvider");
  return ctx;
}
