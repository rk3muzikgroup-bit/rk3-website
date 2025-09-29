"use client";

import { useState, useEffect } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

type TimelineEvent = {
  type: "sound" | "video";
  id: string;
  action: "start" | "stop";
  at: number;
  loop?: boolean;
};

type Scene = {
  name: string;
  timeline: TimelineEvent[];
  notes?: string;
};

export default function PerformanceMode() {
  const playSound = usePlaySound();
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [playingScene, setPlayingScene] = useState<Scene | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const [activeSounds, setActiveSounds] = useState<string[]>([]);
  const [activeVideos, setActiveVideos] = useState<string[]>([]);

  // Load saved scenes
  useEffect(() => {
    const saved = localStorage.getItem("rk3-scenes");
    if (saved) setScenes(JSON.parse(saved));
  }, []);

  // 🎵 Sound handlers
  const startSound = (id: string, opts?: { loop?: boolean }) => {
    playSound(id, opts);
    setActiveSounds((prev) => [...prev, id]);
  };
  const stopSound = (id: string) => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((a) => {
      if ((a as HTMLAudioElement).src.includes(id)) {
        (a as HTMLAudioElement).pause();
        (a as HTMLAudioElement).currentTime = 0;
      }
    });
    setActiveSounds((prev) => prev.filter((s) => s !== id));
  };

  // 🎥 Video handlers
  const playVideo = (src: string) => {
    if (!activeVideos.includes(src)) {
      setActiveVideos((prev) => [...prev, src]);
    }
  };
  const stopVideo = (src: string) => {
    setActiveVideos((prev) => prev.filter((v) => v !== src));
  };

  const stopAll = () => {
    setActiveSounds([]);
    setActiveVideos([]);
    const audios = document.querySelectorAll("audio");
    audios.forEach((a) => {
      (a as HTMLAudioElement).pause();
      (a as HTMLAudioElement).currentTime = 0;
    });
  };

  // 🎬 Play scene timeline
  const playScene = (scene: Scene) => {
    stopAll();
    setPlayingScene(scene);

    let start = Date.now();

    const runner = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);

      scene.timeline.forEach((event) => {
        if (event.at === elapsed) {
          if (event.type === "sound") {
            if (event.action === "start") startSound(event.id, { loop: event.loop });
            if (event.action === "stop") stopSound(event.id);
          } else if (event.type === "video") {
            if (event.action === "start") playVideo(event.id);
            if (event.action === "stop") stopVideo(event.id);
          }
        }
      });
    }, 1000);

    setTimer(runner);
  };

  const stopScenePlayback = () => {
    if (timer) clearInterval(timer);
    stopAll();
    setPlayingScene(null);
  };

  return (
    <main className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 🎥 Fullscreen Video Backdrop */}
      {activeVideos.length > 0 ? (
        <video
          src={activeVideos[activeVideos.length - 1]} // last video = main backdrop
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
      ) : (
        <div className="absolute inset-0 bg-[url('/videos/starfield.gif')] bg-cover opacity-50" />
      )}

      {/* 🎛 Overlay Controls */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-8">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            🎤 RK3 HollyStudio Live Deck™
          </h1>
          {playingScene && (
            <span className="text-sm text-gray-300">
              Now Playing: {playingScene.name}
            </span>
          )}
        </header>

        {/* Center: Scenes */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {scenes.length === 0 ? (
            <p className="text-gray-400">No saved scenes yet</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {scenes.map((scene, i) => (
                <button
                  key={i}
                  onClick={() => playScene(scene)}
                  className="px-6 py-4 bg-blue-700 hover:bg-blue-800 rounded-xl text-xl font-bold shadow-lg"
                >
                  🎬 {scene.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Controls + Dashboard */}
        <footer className="flex flex-col gap-4">
          <div className="flex gap-4 justify-center">
            <button
              onClick={stopAll}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 rounded-xl font-bold text-lg"
            >
              🔇 Stop All
            </button>
            {playingScene && (
              <button
                onClick={stopScenePlayback}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl font-bold text-lg"
              >
                ⏹ Stop Timeline
              </button>
            )}
          </div>
          <div className="bg-black/60 rounded-lg p-4 text-sm">
            <p>🎵 Active Sounds: {activeSounds.join(", ") || "None"}</p>
            <p>🎥 Active Video: {activeVideos.slice(-1)[0] || "None"}</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
