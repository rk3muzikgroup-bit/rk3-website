"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useNowPlaying } from "@/context/NowPlayingContext";
import SavedTracksWidget from "@/components/tracks/SavedTracksWidget";
import CockpitEQ from "@/components/cockpit/CockpitEQ";
import VaultWidget from "@/components/vault/VaultWidget";
import { playVaultSound } from "@/utils/vaultSounds";
import { allSpoken } from "@/data/tracks/spoken";

const { currentTrack, nextTrack, prevTrack, saveTrack } = useNowPlaying();

interface AkashicDashboardProps {
  onClose: () => void;
  humOn: boolean;
  shieldsOn: boolean;
  starfieldOn: boolean;
  history: string[];
}
import { allSpoken } from "@/data/tracks/spoken";  // 🚀 Master Mix

export default function AkashicDashboard({
  onClose,
  humOn,
  shieldsOn,
  starfieldOn,
  history,
}: AkashicDashboardProps) {
  const { currentTrack, nextTrack, prevTrack, saveTrack } = useNowPlaying(allSpoken);

export default function AkashicDashboard({
  onClose,
  humOn,
  shieldsOn,
  starfieldOn,
  history,
}: AkashicDashboardProps) {
  const { currentTrack, nextTrack, prevTrack, saveTrack } = useNowPlaying();
  const [activeTab, setActiveTab] = useState<
    "music" | "eq" | "system" | "logs" | "vault"
  >("music");

  return (
    <motion.div
      id="vault-hud"
      className="absolute inset-0 bg-black/85 backdrop-blur-xl text-white p-6 overflow-y-auto transition-opacity"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">
          📖 Akashic Dashboard
        </h1>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md"
        >
          Close
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {["music", "eq", "system", "logs", "vault"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-emerald-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {tab === "music" && "🎵 Music"}
            {tab === "eq" && "🎚 EQ"}
            {tab === "system" && "⚙️ System"}
            {tab === "logs" && "📜 Logs"}
            {tab === "vault" && "🔐 Vault"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "music" && (
        <div className="space-y-6">
          <div className="p-4 bg-black/50 rounded-lg border border-emerald-500/40">
            <h2 className="text-lg font-semibold text-cyan-300 mb-3">
              🎶 Now Playing
            </h2>
            <p className="mb-4">
              {currentTrack
                ? `${currentTrack.title} — ${currentTrack.artist}`
                : "No track currently playing"}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={prevTrack}
                className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition text-sm"
              >
                ⏮ Prev
              </button>
              <button
                onClick={saveTrack}
                className="px-3 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 transition text-sm"
              >
                ⭐ Save
              </button>
              <button
                onClick={nextTrack}
                className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition text-sm"
              >
                ⏭ Next
              </button>
            </div>
          </div>

          <SavedTracksWidget />
        </div>
      )}

      {activeTab === "eq" && (
        <div className="p-4 bg-black/50 rounded-lg border border-purple-500/40">
          <h2 className="text-lg font-semibold text-purple-300 mb-3">
            🎚 Equalizer
          </h2>
          <CockpitEQ />
        </div>
      )}

      {activeTab === "system" && (
        <div className="p-4 bg-black/50 rounded-lg border border-cyan-500/40">
          <h2 className="text-lg font-semibold text-cyan-300 mb-2">
            ⚙️ System Status
          </h2>
          <ul className="space-y-1 text-sm">
            <li>Cockpit Hum: {humOn ? "On ✅" : "Off ❌"}</li>
            <li>Shields: {shieldsOn ? "On ✅" : "Off ❌"}</li>
            <li>Starfield FX: {starfieldOn ? "On ✅" : "Off ❌"}</li>
          </ul>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="p-4 bg-black/50 rounded-lg border border-indigo-500/40">
          <h2 className="text-lg font-semibold text-indigo-300 mb-2">
            📜 System Log
          </h2>
          <ul className="space-y-1 text-xs max-h-60 overflow-y-auto">
            {history.length > 0 ? (
              history.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li className="text-gray-500">No logs yet...</li>
            )}
          </ul>
        </div>
      )}

      {activeTab === "vault" && (
        <div
          id="vault-content"
          className="p-6 bg-black/50 rounded-lg border border-emerald-500/40 space-y-4 transition-all"
        >
          <h2 className="text-xl font-bold text-emerald-300 mb-4">🔐 RK3 Vault</h2>
          <VaultWidget />

          <div className="flex flex-col gap-3 mt-6">
            {[
              { key: "door_close", label: "🚪 Fast Close", color: "bg-red-600 hover:bg-red-700", duration: 13000 },
              { key: "closing_long", label: "🎥 Cinematic Seal", color: "bg-purple-700 hover:bg-purple-800", duration: 60000 },
              { key: "door_hum", label: "🌌 Ambient Hum", color: "bg-green-700 hover:bg-green-800", duration: 8000 },
              { key: "door_rumble", label: "⚡ Door Rumble", color: "bg-yellow-600 hover:bg-yellow-700", duration: 4000 },
            ].map(({ key, label, color, duration }) => (
              <VaultButton
                key={key}
                soundKey={key}
                label={label}
                color={color}
                duration={duration}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* 🔘 Vault Button with distortion + lens warp */
function VaultButton({
  soundKey,
  label,
  color,
  duration,
}: {
  soundKey: string;
  label: string;
  color: string;
  duration: number;
}) {
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    if (playing) return;
    setPlaying(true);
    playVaultSound(soundKey);

    if (soundKey === "closing_long") {
      // Fade HUD
      setTimeout(() => {
        const hud = document.getElementById("vault-hud");
        if (hud) hud.classList.add("opacity-0", "transition-opacity", "duration-[30000]");
      }, 8000);

      // Distortion + lens warp near end
      setTimeout(() => {
        playVaultSound("door_rumble");
        const hud = document.getElementById("vault-hud");
        const content = document.getElementById("vault-content");
        if (hud) hud.classList.add("animate-shake");
        if (content) content.classList.add("distort-blur", "lens-warp");
      }, duration - 6000);

      // Final thud + reset
      setTimeout(() => {
        playVaultSound("portal_thud");
        const hud = document.getElementById("vault-hud");
        const content = document.getElementById("vault-content");
        if (hud) {
          hud.classList.remove("animate-shake");
          hud.classList.add("animate-thud");
        }
        if (content) content.classList.remove("distort-blur", "lens-warp");
        window.location.href = "/world";
      }, duration);
    }

    setTimeout(() => setPlaying(false), duration);
  };

  return (
    <button
      onClick={handleClick}
      disabled={playing}
      className={`px-4 py-2 rounded-md shadow-md transition ${
        playing ? "bg-gray-700 cursor-not-allowed opacity-70" : color
      }`}
    >
      {playing ? "⏳ Playing..." : label}
    </button>
  );
}
