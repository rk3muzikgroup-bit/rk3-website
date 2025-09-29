"use client";

import { CockpitHUD } from "@/components/cockpit";
import { useNowPlaying } from "@/context/NowPlayingContext";
import { useState } from "react";
"use client";

import { CockpitHUD } from "@/components/cockpit";
import { useNowPlaying } from "@/context/NowPlayingContext";
import { useState } from "react";
"use client";

import CockpitHUD from "@/components/cockpit/CockpitHUD";

export default function CockpitTestPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold text-emerald-400">
        🚀 Cockpit Test Page
      </h1>
      <CockpitHUD />
    </div>
  );
}
export default function CockpitTestPage() {
  const { setTrack } = useNowPlaying();
  const [selected, setSelected] = useState<string>("");
  const [confirmReset, setConfirmReset] = useState(false);

  const demoTracks = [
    "Yin Flow",
    "Yang Fire",
    "Unified Vibes",
    "Emerald Groove",
  ];

  // Safe Reset Function
  const handleSafeReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 5000); // cancel confirm after 5s
      return;
    }

    // Clear localStorage + states
    localStorage.removeItem("wishCount");
    setTrack(null);
    setSelected("");
    document.querySelectorAll("audio").forEach((a) => {
      a.pause();
      a.currentTime = 0;
      a.muted = false;
    });

    // Reset confirm state
    setConfirmReset(false);
    alert("✅ Safe Reset Complete — Cockpit cleared.");
    window.location.reload(); // reload to re-mount clean
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-8 text-emerald-400">
        🚀 Cockpit Test Page
      </h1>

      {/* Track Selector */}
      <div className="mb-8 flex flex-col gap-3">
        <label className="text-sm text-gray-300">Select a Demo Track:</label>
        <select
          value={selected}
          onChange={(e) => {
            const trackName = e.target.value;
            setSelected(trackName);
            setTrack(trackName);
          }}
          className="bg-black/50 text-white px-4 py-2 rounded-lg border border-emerald-600 focus:outline-none"
        >
          <option value="">-- Choose Track --</option>
          {demoTracks.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Demo Audio */}
      <div className="flex flex-col gap-3 mb-12">
        <p className="text-gray-300 text-sm">
          🎵 Play audio to test visualizer bars:
        </p>
        <audio src="/test.mp3" controls className="w-72" />
      </div>

      {/* Safe Reset Panel */}
      <div className="mb-12 text-center">
        {!confirmReset ? (
          <button
            onClick={handleSafeReset}
            className="px-6 py-2 bg-red-700 hover:bg-red-600 rounded-lg font-bold text-sm"
          >
            🛑 Reset Cockpit (Safe)
          </button>
        ) : (
          <button
            onClick={handleSafeReset}
            className="px-6 py-2 bg-red-500 hover:bg-red-400 rounded-lg font-bold text-sm"
          >
            ⚠️ Confirm Reset (Click Again)
          </button>
        )}
        <p className="text-xs text-gray-400 mt-2">
          {confirmReset
            ? "Click again within 5s to clear Wish Log + states."
            : "Double confirmation required for safety."}
        </p>
      </div>

      <p className="text-gray-400 text-xs">
        ✅ Use <span className="text-gold-400">P, L, S, M, W, H</span> hotkeys to test features.
      </p>

      {/* Cockpit HUD mounted */}
      <CockpitHUD />
    </div>
  );
}

export default function CockpitTestPage() {
  const { setTrack } = useNowPlaying();
  const [selected, setSelected] = useState<string>("");

  const demoTracks = [
    "Yin Flow",
    "Yang Fire",
    "Unified Vibes",
    "Emerald Groove",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-8 text-emerald-400">
        🚀 Cockpit Test Page
      </h1>

      {/* Track Selector */}
      <div className="mb-8 flex flex-col gap-3">
        <label className="text-sm text-gray-300">Select a Demo Track:</label>
        <select
          value={selected}
          onChange={(e) => {
            const trackName = e.target.value;
            setSelected(trackName);
            setTrack(trackName);
          }}
          className="bg-black/50 text-white px-4 py-2 rounded-lg border border-emerald-600 focus:outline-none"
        >
          <option value="">-- Choose Track --</option>
          {demoTracks.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Demo Audio */}
      <div className="flex flex-col gap-3 mb-12">
        <p className="text-gray-300 text-sm">
          🎵 Play audio to test visualizer bars:
        </p>
        <audio
          src="/test.mp3"
          controls
          className="w-72"
        />
      </div>

      <p className="text-gray-400 text-xs">
        ✅ Use <span className="text-gold-400">P, L, S, M, W, H</span> hotkeys to test features.
      </p>

      {/* Cockpit HUD mounted */}
      <CockpitHUD />
    </div>
  );
}
