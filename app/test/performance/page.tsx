"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

/** ===== Types ===== */
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

/** ===== Tiny Utils ===== */
const clamp = (n: number, min = 0, max = 1) => Math.max(min, Math.min(max, n));

/** ===== Component ===== */
export default function PerformanceMode() {
  const playSound = usePlaySound();
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Scenes + selection
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Playback state
  const [playingScene, setPlayingScene] = useState<Scene | null>(null);
  const [runner, setRunner] = useState<NodeJS.Timeout | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);

  // Audio state
  const [activeSounds, setActiveSounds] = useState<string[]>([]);

  // Video crossfade state
  const [bgA, setBgA] = useState<string | null>(null);
  const [bgB, setBgB] = useState<string | null>(null);
  const [useA, setUseA] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);
  const crossfadeMs = 1200;

  // UI/System
  const [muted, setMuted] = useState<boolean>(true);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [precheckMsg, setPrecheckMsg] = useState<string | null>(null);
  const [safeMode, setSafeMode] = useState<boolean>(false);

  /** ===== Load scenes ===== */
  useEffect(() => {
    const saved = localStorage.getItem("rk3-scenes");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      const normalized: Scene[] = parsed.map((s: any) => {
        if (Array.isArray(s.timeline)) return s as Scene;
        const events: TimelineEvent[] = [];
        if (Array.isArray(s.sounds)) {
          s.sounds.forEach((snd: any) =>
            events.push({ type: "sound", id: snd.id, action: "start", at: 0, loop: !!snd.loop })
          );
        }
        if (Array.isArray(s.videos)) {
          s.videos.forEach((vid: string) =>
            events.push({ type: "video", id: vid, action: "start", at: 0 })
          );
        }
        return { name: s.name ?? "Imported Scene", notes: s.notes, timeline: events };
      });
      setScenes(normalized);
      setSelectedIndex(0);
    } catch {}
  }, []);

  /** ===== Derived ===== */
  const selectedScene = useMemo(() => scenes[selectedIndex], [scenes, selectedIndex]);
  const sceneDuration = (scene: Scene | null) =>
    scene && scene.timeline.length ? Math.max(...scene.timeline.map((e) => e.at)) + 1 : 0;
  const duration = useMemo(() => sceneDuration(playingScene), [playingScene]);
  const previewDuration = useMemo(
    () => sceneDuration(playingScene ?? selectedScene ?? null),
    [playingScene, selectedScene]
  );
  const nextIndex = useMemo(
    () => (selectedIndex + 1 < scenes.length ? selectedIndex + 1 : null),
    [selectedIndex, scenes.length]
  );
  const nextScene = nextIndex !== null ? scenes[nextIndex] : null;

  /** ===== Audio controls ===== */
  const startSound = (id: string, opts?: { loop?: boolean }) => {
    playSound(id, opts);
    setActiveSounds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const stopSound = (id: string) => {
    document.querySelectorAll("audio").forEach((a) => {
      if ((a as HTMLAudioElement).src.includes(id)) {
        (a as HTMLAudioElement).pause();
        (a as HTMLAudioElement).currentTime = 0;
      }
    });
    setActiveSounds((prev) => prev.filter((s) => s !== id));
  };

  /** ===== Crossfade video ===== */
  const crossfadeTo = (src: string) => {
    if (!bgA && !bgB) {
      setBgA(src);
      setUseA(true);
      return;
    }
    setIsFading(true);
    if (useA) {
      setBgB(src);
      setTimeout(() => {
        setUseA(false);
        setIsFading(false);
        setBgA(null);
      }, crossfadeMs);
    } else {
      setBgA(src);
      setTimeout(() => {
        setUseA(true);
        setIsFading(false);
        setBgB(null);
      }, crossfadeMs);
    }
  };

  const playVideo = (src: string) => crossfadeTo(src);
  const stopVideo = (src: string) => {
    if ((useA && bgA === src) || (!useA && bgB === src)) {
      setBgA(null); setBgB(null); setIsFading(false); return;
    }
    if (bgA === src) setBgA(null);
    if (bgB === src) setBgB(null);
  };
  const clearVideos = () => { setBgA(null); setBgB(null); setIsFading(false); };

  /** ===== Stop all ===== */
  const stopAll = () => {
    document.querySelectorAll("audio").forEach((a) => {
      (a as HTMLAudioElement).pause();
      (a as HTMLAudioElement).currentTime = 0;
    });
    setActiveSounds([]);
    clearVideos();
  };

  /** ===== Runner ===== */
  const startRunner = (scene: Scene) => {
    setElapsed(0);
    const t = setInterval(() => {
      try {
        setElapsed((prev) => {
          const sec = prev + 0.25;
          const whole = Math.floor(sec);
          scene.timeline.forEach((evt) => {
            if (evt.at === whole && Math.abs(sec - whole) < 0.3) {
              if (evt.type === "sound") {
                if (evt.action === "start") startSound(evt.id, { loop: evt.loop });
                if (evt.action === "stop") stopSound(evt.id);
              } else {
                if (evt.action === "start") playVideo(evt.id);
                if (evt.action === "stop") stopVideo(evt.id);
              }
            }
          });
          const total = sceneDuration(scene);
          if (total > 0 && sec >= total) stopTimeline();
          return sec;
        });
      } catch {
        stopTimeline(); setSafeMode(true);
      }
    }, 250);
    setRunner(t);
  };

  /** ===== Timeline control ===== */
  const playScene = async (scene: Scene) => {
    setSafeMode(false);
    stopTimeline(); stopAll();
    setPlayingScene(scene); startRunner(scene);
  };

  const stopTimeline = () => {
    if (runner) clearInterval(runner);
    setRunner(null); setPlayingScene(null); setElapsed(0); stopAll();
  };

  /** ===== Hotkeys ===== */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < scenes.length) { setSelectedIndex(idx); playScene(scenes[idx]); }
      }
      if (e.key === "ArrowRight" && nextIndex !== null) { setSelectedIndex(nextIndex); playScene(scenes[nextIndex]); }
      if (e.key === " ") stopAll();
      if (e.key === "Enter") stopTimeline();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scenes, selectedIndex, nextIndex]);

  return (
    <main ref={stageRef} className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* HUD & content here… */}
    </main>
  );
}
