"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ all imports now clean with @/*
import { useNowPlaying } from "@/context/NowPlayingContext";
import { usePilotBadge } from "@/hooks/usePilotBadge";
import { useAkashicLog } from "@/hooks/useAkashicLog";
import { useCockpitHum } from "@/hooks/useCockpitHum";
import { useCockpitSfx } from "@/hooks/useCockpitSfx";
import { useRideVolume } from "@/hooks/useRideVolume";
import { useRoomAmbient } from "@/hooks/useRoomAmbient";
import { SHORTCUTS } from "@/utils/shortcuts";
import { VISITOR_GUIDE } from "@/utils/visitorGuide";

export default function CockpitPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { track, portal, isPlaying, togglePlay, nextTrack, prevTrack } =
    useNowPlaying();

  const [pilotName, setPilotName] = useState<string | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [freeFloat, setFreeFloat] = useState(false);

  const { saveResonance } = useAkashicLog("rk3");
  const badge = usePilotBadge(pilotName || "");

  const { fadeOut: fadeHumOut, fadeIn: fadeHumIn } = useCockpitHum();
  const { playSfx, fadeOut: fadeSfxOut, fadeIn: fadeSfxIn } = useCockpitSfx();
  const { fadeOut: fadeRideOut, fadeIn: fadeRideIn } = useRideVolume(videoRef);
  const { fadeOut: fadeRoomOut, fadeIn: fadeRoomIn } = useRoomAmbient(portal);

  const overlayActive = showShortcuts || showDebug || showGuide;

  // 🎛️ Keyboard Shortcuts + Esc close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowGuide(false);
        setShowShortcuts(false);
        setShowDebug(false);
        return;
      }

      if (!e.shiftKey) return;

      switch (e.key) {
        case "?":
          setShowShortcuts((prev) => !prev);
          break;
        case "g":
        case "G":
          setShowGuide((prev) => !prev);
          break;
        case "h":
        case "H":
          isPlaying ? fadeHumOut(1200) : fadeHumIn(1200);
          break;
        case "s":
        case "S":
          fadeSfxOut(800);
          fadeSfxIn("vault/door_hum.mp3", 800);
          break;
        case "r":
        case "R":
          fadeRideOut(1200);
          fadeRideIn(1, 1200);
          break;
        case "m":
        case "M":
          fadeRoomOut(1200);
          fadeRoomIn(1200);
          break;
        case "f":
        case "F":
          setFreeFloat((prev) => !prev);
          break;
        case "p":
        case "P":
          playSfx("vault/door_hum.mp3");
          break;
        case "b":
        case "B":
          saveResonance(
            "Blessing triggered",
            "cockpit-blessing",
            "/sounds/vault/door_hum.mp3"
          );
          break;
        case "a":
        case "A":
          saveResonance(
            `${badge?.username || pilotName || "Pilot"} aura sync`,
            "aura-sync",
            ""
          );
          break;
        case "t":
        case "T":
          setShowDebug((prev) => !prev);
          break;
        case "n":
        case "N":
          const portals = ["street", "soul", "spirit", "healing", "vault"];
          const currentIndex = portals.indexOf(portal || "street");
          const nextPortal = portals[(currentIndex + 1) % portals.length];
          router.push(`/${nextPortal}`);
          break;
        case "x":
        case "X":
          sessionStorage.clear();
          localStorage.removeItem("pilotId");
          saveResonance("Cockpit Reset", "reset", "");
          window.location.reload();
          break;
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextTrack();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevTrack();
          break;
        case "v":
        case "V":
          if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
          }
          break;
        case "l":
        case "L":
          console.log("📜 Akashic Log Export:", localStorage);
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [
    isPlaying,
    fadeHumOut,
    fadeHumIn,
    fadeSfxOut,
    fadeSfxIn,
    fadeRideOut,
    fadeRideIn,
    fadeRoomOut,
    fadeRoomIn,
    badge,
    pilotName,
    portal,
    router,
    saveResonance,
    playSfx,
    togglePlay,
    nextTrack,
    prevTrack,
  ]);

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {/* === HUD Toggle + Guide Button === */}
      <div className="absolute top-6 right-6 z-30 flex gap-2">
        <button
          onClick={() => setFreeFloat(!freeFloat)}
          className="px-3 py-2 rounded-lg bg-white/10 border border-white/30 
                     text-xs font-mono tracking-wider backdrop-blur-md hover:bg-white/20"
        >
          {freeFloat ? "🌌 Free Float Mode" : "📐 Snap Back Mode"}
        </button>
        <button
          onClick={() => setShowGuide((prev) => !prev)}
          className="px-3 py-2 rounded-lg bg-yellow-500/20 border border-yellow-400/40 
                     text-xs font-mono tracking-wider hover:bg-yellow-500/30"
        >
          📖 Visitor Guide
        </button>
      </div>

      {/* === Starfield === */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src="/videos/ride/Street_Ride.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      {/* === Dim background overlay when active === */}
      <AnimatePresence>
        {overlayActive && (
          <motion.div
            key="dim-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black z-20"
          />
        )}
      </AnimatePresence>

      {/* === Debug HUD === */}
      <AnimatePresence>
        {showDebug && (
          <motion.div
            key="debug"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-6 z-40 p-3 bg-black/70 border border-white/20 rounded-xl text-xs font-mono space-y-1 backdrop-blur-md"
          >
            <p className="font-bold opacity-80 mb-1">🎛️ Audio Debug</p>
            <p>Hum: {(window as any).__cockpitHum?.volume || 0}</p>
            <p>
              SFX: {(window as any).__cockpitSfx?.audio?.volume || 0}
              {(window as any).__cockpitSfx?.file
                ? ` (${(window as any).__cockpitSfx.file})`
                : ""}
            </p>
            <p>Ride: {(window as any).__rideVideo?.volume || 0}</p>
            <p>Room: {(window as any).__roomAmbient?.volume || 0}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Shortcuts Overlay === */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            key="shortcuts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-6 z-40 bg-black/90 border border-white/20 rounded-xl p-4 backdrop-blur-md shadow-lg w-72"
          >
            <p className="font-bold mb-2 text-sm">⌨️ Keyboard Shortcuts</p>
            <ul className="space-y-1 text-xs font-mono">
              {SHORTCUTS.map(({ combo, action }, i) => (
                <li key={i} className="flex justify-between">
                  <span className="text-yellow-400">{combo}</span>
                  <span className="opacity-80">{action}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Visitor Guide Overlay === */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-12 z-40 bg-black/95 border border-yellow-400/30 rounded-xl p-6 backdrop-blur-lg shadow-xl overflow-y-auto"
          >
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 text-sm font-mono"
            >
              ❌ Close
            </button>

            <h2 className="font-bold text-lg mb-4 text-yellow-400">📖 Visitor Guide</h2>
            {VISITOR_GUIDE.map(({ title, items }, i) => (
              <div key={i} className="mb-4">
                <p className="font-bold text-sm text-yellow-300 mb-2">{title}</p>
                <ul className="space-y-1 text-xs font-mono">
                  {items.map((txt, j) => (
                    <li key={j} className="opacity-80">- {txt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
