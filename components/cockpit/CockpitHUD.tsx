"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AkashicDashboard from "@/components/cockpit/AkashicDashboard";
import Odometer from "@/components/cockpit/Odometer";
import { useNowPlaying } from "@/context/NowPlayingContext";

export default function CockpitHUD() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [humOn, setHumOn] = useState(true);
  const [shieldsOn, setShieldsOn] = useState(true);
  const [starfieldOn, setStarfieldOn] = useState(true);
  const [lightsOn, setLightsOn] = useState(false);
  const [radarOn, setRadarOn] = useState(false);
  const [commsOn, setCommsOn] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { currentTrack, nextTrack, prevTrack, saveTrack, savedTracks } = useNowPlaying();

  // Cockpit hum
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.loop = true;
      if (humOn) {
        audioRef.current.play().catch(() => {
          console.warn("User interaction needed to start cockpit hum.");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [humOn]);

  // History logger
  const logEvent = (msg: string) => {
    const timestamp = new Date().toLocaleString();
    setHistory((prev) => [`[${timestamp}] ${msg}`, ...prev]);
  };

  // System Pulse State Logic
  const getPulseColor = () => {
    if (!commsOn) return "bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.9)]";
    if (!shieldsOn) return "bg-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.9)]";
    return "bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.9)]";
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start p-4 text-white pointer-events-none">
      {/* hidden cockpit hum */}
      <audio ref={audioRef} src="/sounds/cockpit/hum.mp3" />

      {/* HUD Header */}
      <div className="flex w-full justify-between items-center pointer-events-auto">
        <h1 className="text-2xl font-bold drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
          🛸 RK3 Cockpit HUD
        </h1>
        {!showDashboard && (
          <button
            onClick={() => setShowDashboard(true)}
            className="px-4 py-2 rounded-md bg-emerald-600/70 hover:bg-emerald-600 
                       border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.7)] 
                       backdrop-blur-md transition pointer-events-auto"
          >
            Open Dashboard
          </button>
        )}
      </div>

      {/* Cockpit Info */}
      <div className="mt-8 text-center space-y-4 pointer-events-auto">
        <p className="text-lg text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
          🎵 Now Playing:{" "}
          <span className="text-white">
            {currentTrack ? `${currentTrack.title} — ${currentTrack.artist}` : "No Track"}
          </span>
        </p>

        {/* Track Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              prevTrack();
              logEvent("Previous Track selected");
            }}
            className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition text-sm"
          >
            ⏮ Prev
          </button>

          <button
            onClick={() => {
              saveTrack();
              logEvent("Track saved to profile");
            }}
            className="px-3 py-2 rounded-md bg-yellow-500 hover:bg-yellow-400 transition text-sm"
          >
            ⭐ Save
          </button>

          <button
            onClick={() => {
              nextTrack();
              logEvent("Next Track selected");
            }}
            className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition text-sm"
          >
            ⏭ Next
          </button>
        </div>

        <Odometer start={465978478} speed={120} />

        {/* Saved Tracks List */}
        {savedTracks.length > 0 && (
          <div className="mt-6 text-left max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-emerald-300 mb-2">
              ⭐ Saved Tracks
            </h2>
            <ul className="space-y-1 text-sm">
              {savedTracks.map((track, idx) => (
                <li
                  key={idx}
                  className="bg-black/40 rounded-md px-3 py-2 border border-emerald-600/30"
                >
                  {track.title} — <span className="opacity-75">{track.artist}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Cockpit Controls */}
      <div className="absolute bottom-20 left-6 flex flex-col space-y-3 pointer-events-auto">
        {/* Ambient Hum */}
        <div className="flex items-center space-x-2">
          <label className="text-sm opacity-80">Cockpit Hum</label>
          <button
            onClick={() => {
              setHumOn(!humOn);
              logEvent(`Ambient System ${!humOn ? "enabled" : "disabled"}`);
            }}
            className={`px-3 py-1 rounded-md transition ${
              humOn ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {humOn ? "On" : "Off"}
          </button>
        </div>

        {/* Shields */}
        <div className="flex items-center space-x-2">
          <label className="text-sm opacity-80">Shields</label>
          <button
            onClick={() => {
              setShieldsOn(!shieldsOn);
              logEvent(`Shields ${!shieldsOn ? "activated" : "deactivated"}`);
            }}
            className={`px-3 py-1 rounded-md transition ${
              shieldsOn ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {shieldsOn ? "On" : "Off"}
          </button>
        </div>

        {/* Starfield */}
        <div className="flex items-center space-x-2">
          <label className="text-sm opacity-80">Starfield FX</label>
          <button
            onClick={() => {
              setStarfieldOn(!starfieldOn);
              logEvent(`Starfield FX ${!starfieldOn ? "enabled" : "disabled"}`);
            }}
            className={`px-3 py-1 rounded-md transition ${
              starfieldOn ? "bg-cyan-600 hover:bg-cyan-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {starfieldOn ? "On" : "Off"}
          </button>
        </div>

        {/* Cockpit Lights */}
        <div className="flex items-center space-x-2">
          <label className="text-sm opacity-80">Cockpit Lights</label>
          <button
            onClick={() => {
              setLightsOn(!lightsOn);
              logEvent(`Cockpit Lights ${!lightsOn ? "enabled" : "disabled"}`);
            }}
            className={`px-3 py-1 rounded-md transition ${
              lightsOn ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {lightsOn ? "On" : "Off"}
          </button>
        </div>

        {/* Radar */}
        <div className="flex items-center space-x-2">
          <label className="text-sm opacity-80">Radar Mode</label>
          <button
            onClick={() => {
              setRadarOn(!radarOn);
              logEvent(`Radar Mode ${!radarOn ? "activated" : "deactivated"}`);
            }}
            className={`px-3 py-1 rounded-md transition ${
              radarOn ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {radarOn ? "On" : "Off"}
          </button>
        </div>

        {/* Comms */}
        <div className="flex items-center space-x-2">
          <label className="text-sm opacity-80">Comms Link</label>
          <button
            onClick={() => {
              setCommsOn(!commsOn);
              logEvent(`Comms Link ${!commsOn ? "opened" : "closed"}`);
              if (!commsOn) {
                const audio = new Audio("/sounds/cockpit/comms_static.mp3");
                audio.volume = 0.5;
                audio.play();
              }
            }}
            className={`px-3 py-1 rounded-md transition ${
              commsOn ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {commsOn ? "On" : "Off"}
          </button>
        </div>
      </div>

      {/* 🚀 System Pulse Orb */}
      <motion.div
        className={`absolute bottom-4 right-6 w-5 h-5 rounded-full ${getPulseColor()}`}
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute inset-0 rounded-full blur-md opacity-40"></span>
      </motion.div>

      {/* 🚨 Radar Sweep Effect */}
      <AnimatePresence>
        {radarOn && (
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-[400px] h-[400px] rounded-full border-2 border-pink-500/60"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                background: "conic-gradient(rgba(236,72,153,0.4), transparent 60%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚨 Lights Glow Overlay */}
      <AnimatePresence>
        {lightsOn && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(250,204,21,0.25) 0%, rgba(16,185,129,0.3) 50%, transparent 80%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
