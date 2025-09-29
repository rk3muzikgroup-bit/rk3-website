"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useNowPlaying } from "@/context/NowPlayingContext";
import CosmicBackground from "@/components/CosmicBackground";

export default function YinYangUnifiedPage() {
  const router = useRouter();
  const playSound = usePlaySound();
  const { setTrack } = useNowPlaying();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    setTrack("Unified Flow — Yin + Yang Together");
    playSound("vault/unlock");
  }, [setTrack, playSound]);

  // Yin + Yang unified flow
  const unifiedTracks = [
    { title: "Moonlight Flow (Yin)", file: "/dump/yinyang/yin/moonlight_flow.mp3" },
    { title: "Inner Peace Meditation (Yin)", file: "/dump/yinyang/yin/inner_peace.mp3" },
    { title: "Street Fire (Yang)", file: "/dump/yinyang/yang/street_fire.mp3" },
    { title: "Hustle Anthem (Yang)", file: "/dump/yinyang/yang/hustle_anthem.mp3" },
    { title: "Balance Flow (Unified)", file: "/dump/yinyang/unified/balance_flow.mp3" },
    { title: "Harmony Anthem (Unified)", file: "/dump/yinyang/unified/harmony_anthem.mp3" },
  ];

  // Helper: pick random index
  const getRandomIndex = (exclude: number | null) => {
    let idx;
    do {
      idx = Math.floor(Math.random() * unifiedTracks.length);
    } while (idx === exclude && unifiedTracks.length > 1);
    return idx;
  };

  // Handle track end
  const handleEnded = (index: number) => {
    if (shuffleEnabled) {
      const nextIndex = getRandomIndex(index);
      setCurrentIndex(nextIndex);
      audioRefs.current[nextIndex]?.play();
      setTrack(unifiedTracks[nextIndex].title);
    } else {
      const nextIndex = index + 1;
      if (nextIndex < unifiedTracks.length) {
        setCurrentIndex(nextIndex);
        audioRefs.current[nextIndex]?.play();
        setTrack(unifiedTracks[nextIndex].title);
      } else if (loopEnabled) {
        setCurrentIndex(0);
        audioRefs.current[0]?.play();
        setTrack(unifiedTracks[0].title);
      } else {
        setCurrentIndex(null);
      }
    }
  };

  // Play all from the top (or random if shuffle on)
  const handlePlayAll = () => {
    if (unifiedTracks.length > 0) {
      const startIndex = shuffleEnabled ? getRandomIndex(null) : 0;
      setCurrentIndex(startIndex);
      setTrack(unifiedTracks[startIndex].title);
      audioRefs.current[startIndex]?.play();
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden p-8">
      {/* Cosmic Dual Gradient */}
      <CosmicBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-black/50 to-yellow-900/40" />

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-5xl font-bold text-emerald-300 drop-shadow-xl">
          ☯ UNIFIED FLOW ☯
        </h1>
        <p className="text-md text-yellow-200">Duality • Balance • One Rhythm</p>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex justify-center gap-6 mb-6">
        <button
          onClick={handlePlayAll}
          className="px-10 py-4 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold shadow-xl transition transform hover:scale-110"
        >
          ▶️ Play All {shuffleEnabled ? "(Shuffle)" : ""}
        </button>
        <button
          onClick={() => setLoopEnabled(!loopEnabled)}
          className={`px-10 py-4 rounded-xl font-bold shadow-xl transition transform hover:scale-110 ${
            loopEnabled
              ? "bg-yellow-600/80 hover:bg-yellow-500 text-white"
              : "bg-gray-700/80 hover:bg-gray-600 text-white"
          }`}
        >
          {loopEnabled ? "🔁 Loop On" : "⏹ Loop Off"}
        </button>
        <button
          onClick={() => setShuffleEnabled(!shuffleEnabled)}
          className={`px-10 py-4 rounded-xl font-bold shadow-xl transition transform hover:scale-110 ${
            shuffleEnabled
              ? "bg-indigo-600/80 hover:bg-indigo-500 text-white"
              : "bg-gray-700/80 hover:bg-gray-600 text-white"
          }`}
        >
          {shuffleEnabled ? "🔀 Shuffle On" : "⏹ Shuffle Off"}
        </button>
      </div>

      {/* Unified Track Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-8">
        {unifiedTracks.map((track, i) => (
          <div
            key={i}
            className={`bg-black/70 p-6 rounded-xl shadow-xl hover:scale-105 transition ${
              currentIndex === i ? "ring-4 ring-emerald-400" : ""
            }`}
          >
            <h2 className="text-lg font-bold text-emerald-200 mb-3">{track.title}</h2>
            <audio
              ref={(el) => (audioRefs.current[i] = el)}
              controls
              src={track.file}
              className="w-full"
              onPlay={() => {
                setTrack(track.title);
                setCurrentIndex(i);
              }}
              onEnded={() => handleEnded(i)}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6">
        <button
          onClick={() => {
            playSound("vault/door_close");
            router.push("/world/yinyang");
          }}
          className="px-8 py-4 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold shadow-lg"
        >
          ⬅ Back to Yin & Yang
        </button>
        <button
          onClick={() => {
            playSound("ride/transition_whoosh");
            router.push("/world");
          }}
          className="px-8 py-4 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold shadow-lg"
        >
          🌍 To World
        </button>
      </div>

      {/* Now Playing HUD */}
      <div className="absolute bottom-4 right-6 z-10 bg-black/70 px-4 py-2 rounded-xl shadow-lg">
        <span className="font-mono text-sm text-emerald-200">
          🎵 Now Playing:{" "}
          <strong>
            {currentIndex !== null
              ? unifiedTracks[currentIndex].title
              : "Unified Flow — Yin + Yang Together"}
          </strong>
        </span>
      </div>
    </main>
  );
}
