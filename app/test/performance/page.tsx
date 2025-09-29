"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

/** ===== Types ===== */
type TimelineEvent = {
  type: "sound" | "video";
  id: string;            // sound key (e.g., "vault/door_hum") or video src
  action: "start" | "stop";
  at: number;            // seconds
  loop?: boolean;        // sounds only
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
  const [elapsed, setElapsed] = useState<number>(0); // seconds

  // Audio state
  const [activeSounds, setActiveSounds] = useState<string[]>([]);

  // Video crossfade state (dual layer)
  const [bgA, setBgA] = useState<string | null>(null);
  const [bgB, setBgB] = useState<string | null>(null);
  const [useA, setUseA] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);
  const crossfadeMs = 1200;

  // UI / System
  const [muted, setMuted] = useState<boolean>(true);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [precheckMsg, setPrecheckMsg] = useState<string | null>(null);
  const [safeMode, setSafeMode] = useState<boolean>(false);

  /** ===== Load scenes (supports legacy format) ===== */
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
    const audios = document.querySelectorAll("audio");
    audios.forEach((a) => {
      if ((a as HTMLAudioElement).src.includes(id)) {
        (a as HTMLAudioElement).pause();
        (a as HTMLAudioElement).currentTime = 0;
      }
    });
    setActiveSounds((prev) => prev.filter((s) => s !== id));
  };

  /** ===== Crossfade Video Engine (A/B layers) ===== */
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

  /** ===== Stop All ===== */
  const stopAll = () => {
    document.querySelectorAll("audio").forEach((a) => {
      (a as HTMLAudioElement).pause();
      (a as HTMLAudioElement).currentTime = 0;
    });
    setActiveSounds([]);
    clearVideos();
  };

  /** ===== Asset Pre-Check ===== */
  const headOk = async (url: string) => {
    try { const res = await fetch(url, { method: "HEAD" }); return res.ok; } catch { return false; }
  };
  const validateScene = async (scene: Scene) => {
    const errors: string[] = [];
    const videoStarts = scene.timeline.filter((e) => e.type === "video" && e.action === "start");
    for (const v of videoStarts) if (!(await headOk(v.id))) errors.push(`Missing video: ${v.id}`);
    const soundStarts = scene.timeline.filter((e) => e.type === "sound" && e.action === "start");
    for (const s of soundStarts) {
      const base = `/sounds/${s.id}`;
      const mp3 = await headOk(`${base}.mp3`);
      const wav = mp3 ? true : await headOk(`${base}.wav`);
      if (!mp3 && !wav) errors.push(`Missing sound: ${base}.(mp3|wav)`);
    }
    return { ok: errors.length === 0, errors };
  };

  /** ===== Runner (250ms tick) ===== */
  const startRunner = (scene: Scene) => {
    setElapsed(0);
    const t = setInterval(() => {
      try {
        setElapsed((prev) => {
          const sec = prev + 0.25;                 // 250ms
          const whole = Math.floor(sec);
          scene.timeline.forEach((evt) => {
            if (evt.at === whole && Math.abs(sec - whole) < 0.3) {
              if (evt.type === "sound") {
                if (evt.action === "start") startSound(evt.id, { loop: evt.loop });
                if (evt.action === "stop")  stopSound(evt.id);
              } else {
                if (evt.action === "start") playVideo(evt.id);
                if (evt.action === "stop")  stopVideo(evt.id);
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

  /** ===== Countdown → Precheck → Play ===== */
  const playScene = async (scene: Scene) => {
    setSafeMode(false);
    stopTimeline(); stopAll();
    setPrecheckMsg("Validating assets…");
    const res = await validateScene(scene);
    if (!res.ok) { setPrecheckMsg(`⚠️ Fix before play:\n• ${res.errors.join("\n• ")}`); return; }
    setPrecheckMsg("✅ All assets verified.");
    let c = 3; setCountdown(c);
    const cInt = setInterval(() => {
      c -= 1;
      if (c <= 0) {
        clearInterval(cInt);
        setCountdown(null); setPrecheckMsg(null);
        setPlayingScene(scene); startRunner(scene);
      } else setCountdown(c);
    }, 1000);
  };

  const stopTimeline = () => {
    if (runner) clearInterval(runner);
    setRunner(null); setPlayingScene(null); setElapsed(0); stopAll();
  };

  /** ===== Fullscreen / Mute ===== */
  const toggleFullscreen = async () => {
    const el = stageRef.current || document.documentElement;
    if (!document.fullscreenElement) await el.requestFullscreen?.();
    else await document.exitFullscreen?.();
  };
  const toggleMuted = () => setMuted((m) => !m);
  useEffect(() => {
    document.querySelectorAll("video").forEach((v) => ((v as HTMLVideoElement).muted = muted));
  }, [muted, bgA, bgB]);

  /** ===== Hotkeys ===== */
  const maxHotkeyScenes = 9;
  const playByIndex = (idx: number) => { if (idx >= 0 && idx < scenes.length) { setSelectedIndex(idx); playScene(scenes[idx]); } };
  const nextIndex = useMemo(
    () => (selectedIndex + 1 < scenes.length ? selectedIndex + 1 : null),
    [selectedIndex, scenes.length]
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT","TEXTAREA"].includes(t.tagName)) return;
      if (e.key >= "1" && e.key <= String(maxHotkeyScenes)) { playByIndex(parseInt(e.key,10)-1); return; }
      switch (e.key) {
        case "ArrowRight": e.preventDefault(); if (nextIndex !== null) { setSelectedIndex(nextIndex); playByIndex(nextIndex); } break;
        case "ArrowLeft":  e.preventDefault(); if (selectedIndex-1 >= 0) { const p = selectedIndex-1; setSelectedIndex(p); playByIndex(p);} break;
        case " ":          e.preventDefault(); stopAll(); break;
        case "Enter":      e.preventDefault(); stopTimeline(); break;
        case "f": case "F": e.preventDefault(); toggleFullscreen(); break;
        case "m": case "M": e.preventDefault(); toggleMuted(); break;
        case "h": case "H": e.preventDefault(); setShowHelp((s)=>!s); break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scenes, selectedIndex, nextIndex]);

  /** ===== Global Auto-Recovery ===== */
  useEffect(() => {
    const onError = () => { stopTimeline(); setSafeMode(true); };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onError);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onError);
    };
  }, []);

  /** ===== UI ===== */
  const progress = playingScene && duration > 0 ? clamp(elapsed / duration) : 0;

  return (
    <main ref={stageRef} className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* 🎥 Dual-Layer Crossfade Video Backdrop */}
      <div className="absolute inset-0">
        {!bgA && !bgB && (
          <div className="absolute inset-0 bg-[url('/videos/starfield.gif')] bg-cover opacity-40" />
        )}
        {bgA && (
          <video
            key={`A-${bgA}`}
            src={bgA}
            className="absolute inset-0 w-full h-full object-cover transition-opacity"
            style={{ opacity: useA ? 1 : 0, transitionDuration: `${crossfadeMs}ms` }}
            autoPlay loop muted={muted} preload="auto" playsInline
          />
        )}
        {bgB && (
          <video
            key={`B-${bgB}`}
            src={bgB}
            className="absolute inset-0 w-full h-full object-cover transition-opacity"
            style={{ opacity: useA ? 0 : 1, transitionDuration: `${crossfadeMs}ms` }}
            autoPlay loop muted={muted} preload="auto" playsInline
          />
        )}
      </div>

      {/* Dim layer */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Safe Mode banner */}
      {safeMode && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-lg bg-red-700/90 shadow">
          🔴 Safe Mode Active — media reset to starfield. Review scene & resume.
        </div>
      )}

      {/* Precheck banner */}
      {precheckMsg && (
        <div className="absolute top-3 right-3 z-40 px-4 py-2 rounded-lg bg-white/10 border border-white/20 shadow whitespace-pre-line">
          {precheckMsg}
        </div>
      )}

      {/* HUD */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
        {/* Header */}
        <header className="flex flex-wrap gap-3 justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">🎤 RK3 HollyStudio Live Deck™</h1>
            {muted && <span className="px-2 py-0.5 text-xs rounded bg-yellow-600/80">Muted</span>}
          </div>

          {/* Now / Next HUD */}
          <div className="flex items-center gap-3 text-sm">
            <span className="px-2 py-1 rounded bg-white/10">
              Now: <b>{playingScene?.name ?? "—"}</b>
            </span>
            <span className="px-2 py-1 rounded bg-white/10">
              Next: <b>{nextScene?.name ?? "—"}</b>
            </span>
          </div>

          <div className="flex gap-3">
            <button onClick={toggleFullscreen} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm pointer-events-auto">⛶ Fullscreen (F)</button>
            <button onClick={() => setShowHelp((s)=>!s)} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm pointer-events-auto">❓ Help (H)</button>
            <button onClick={() => setMuted((m)=>!m)} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm pointer-events-auto">{muted ? "🔇 Unmute (M)" : "🔊 Mute (M)"}</button>
          </div>
        </header>

        {/* 🎯 Timeline Preview Map */}
        <section className="pointer-events-auto w-full max-w-5xl mx-auto mt-4">
          <TimelinePreview
            scene={playingScene ?? selectedScene}
            elapsed={playingScene ? elapsed : 0}
            duration={previewDuration}
          />
        </section>

        {/* Center: Scene Grid */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 pointer-events-auto">
          {scenes.length === 0 ? (
            <p className="text-gray-300">No saved scenes yet</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {scenes.map((scene, i) => {
                const hotkey = i < 9 ? ` (${i + 1})` : "";
                const isSel = i === selectedIndex;
                return (
                  <button
                    key={scene.name + i}
                    onClick={() => { setSelectedIndex(i); playScene(scene); }}
                    className={`px-6 py-5 rounded-2xl text-xl font-bold shadow-lg transition
                      ${isSel ? "bg-green-700 hover:bg-green-800 ring-4 ring-green-300" : "bg-blue-700 hover:bg-blue-800"}
                    `}
                  >
                    🎬 {scene.name}{hotkey}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: Controls + Status + Progress */}
        <footer className="flex flex-col gap-4 pointer-events-auto">
          {/* Progress Bar */}
          {playingScene && (
            <div className="w-full max-w-5xl mx-auto">
              <div className="text-xs mb-1 flex justify-between text-gray-300">
                <span>{Math.max(0, Math.floor(elapsed))}s / {duration}s</span>
                <span>{playingScene?.name}</span>
              </div>
              <div className="h-2 bg-white/20 rounded overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${progress * 100}%`, transition: "width 0.2s linear" }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button onClick={stopAll} className="px-6 py-3 bg-red-700 hover:bg-red-800 rounded-xl font-bold text-lg">🔇 Stop All (Space)</button>
            {playingScene && (
              <button onClick={stopTimeline} className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl font-bold text-lg">⏹ Stop Timeline (Enter)</button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-black/55 rounded-lg p-4">
            <div>
              <div className="font-semibold mb-1">🎵 Active Sounds</div>
              <div className="text-gray-200 min-h-[1.5rem]">{activeSounds.length ? activeSounds.join(", ") : "None"}</div>
            </div>
            <div>
              <div className="font-semibold mb-1">🎥 Active Video Layer</div>
              <div className="text-gray-2 00 min-h-[1.5rem]">{useA ? (bgA ?? "None") : (bgB ?? "None")}</div>
            </div>
          </div>
        </footer>
      </div>

      {/* ⏱️ Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="text-7xl md:text-8xl font-extrabold drop-shadow-lg animate-pulse">{countdown}</div>
        </div>
      )}

      {/* 📝 Notes Overlay */}
      {playingScene?.notes && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/60 border border-white/20 rounded-xl px-4 py-2 text-sm max-w-xl w-[90%] text-center">
          {playingScene.notes}
        </div>
      )}

      {/* ❓ Quick Help */}
      {showHelp && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-xl w-full">
            <h2 className="text-xl font-bold mb-4">🎛️ Hotkeys</h2>
            <ul className="space-y-1 text-sm">
              <li><span className="font-semibold">1–9</span>: Play Scene #</li>
              <li><span className="font-semibold">← / →</span>: Previous / Next Scene</li>
              <li><span className="font-semibold">Space</span>: Stop All</li>
              <li><span className="font-semibold">Enter</span>: Stop Timeline</li>
              <li><span className="font-semibold">F</span>: Toggle Fullscreen</li>
              <li><span className="font-semibold">M</span>: Toggle Mute</li>
              <li><span className="font-semibold">H</span>: Toggle Help</li>
            </ul>
            <div className="mt-4 text-right">
              <button onClick={() => setShowHelp(false)} className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md">Close (H)</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/** ===== Timeline Preview Component ===== */
function TimelinePreview({
  scene,
  elapsed,
  duration,
}: {
  scene?: Scene | null;
  elapsed: number;
  duration: number;
}) {
  if (!scene || !scene.timeline.length || duration <= 0) {
    return (
      <div className="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-lg p-3">
        Timeline: no events
      </div>
    );
  }

  const events = [...scene.timeline].sort((a, b) => a.at - b.at);
  const pct = (t: number) => `${clamp(t / duration) * 100}%`;

  const colorFor = (e: TimelineEvent) => {
    if (e.type === "video") return e.action === "start" ? "bg-blue-500" : "bg-blue-300";
    return e.action === "start" ? "bg-green-500" : "bg-red-500";
  };

  const labelFor = (e: TimelineEvent) =>
    `${e.type.toUpperCase()} ${e.action.toUpperCase()} @ ${e.at}s — ${e.id}${e.loop ? " (loop)" : ""}`;

  return (
    <div className="w-full space-y-2">
      {/* Ruler */}
      <div className="relative h-14 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80"
          style={{ left: pct(elapsed) }}
        />
        {/* Ticks */}
        {[...Array(Math.min(12, Math.max(4, Math.ceil(duration / 2))))].map((_, i, arr) => {
          const t = (i / (arr.length - 1)) * duration;
          return (
            <div key={i} className="absolute top-0 h-full" style={{ left: pct(t) }}>
              <div className="w-px h-full bg-white/10" />
              <div className="text-[10px] text-gray-300 absolute -bottom-0.5 -translate-x-1/2">{Math.round(t)}s</div>
            </div>
          );
        })}
        {/* Event markers */}
        {events.map((e, i) => (
          <div
            key={i}
            className={`absolute -translate-x-1/2 bottom-1 px-2 py-1 rounded-md text-[10px] whitespace-nowrap shadow ${colorFor(e)}`}
            title={labelFor(e)}
            style={{ left: pct(e.at) }}
          >
            {e.type === "video" ? "🎥" : e.action === "start" ? "🎵▶" : "🎵⏹"} {e.at}s
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-300">
        <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded bg-green-500 inline-block" /> Sound Start</span>
        <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded bg-red-500 inline-block" /> Sound Stop</span>
        <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded bg-blue-500 inline-block" /> Video Start</span>
        <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded bg-blue-300 inline-block" /> Video Stop</span>
        <span className="inline-flex items-center gap-1 ml-auto"><i className="w-1 h-3 bg-white/80 inline-block" /> Playhead</span>
      </div>
    </div>
  );
}
