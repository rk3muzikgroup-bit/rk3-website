"use client";

import { useEffect, useState } from "react";

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

type Result = {
  scene: string;
  ok: boolean;
  errors: string[];
  checked: number;
  passed: number;
};

export default function SceneLinter() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [running, setRunning] = useState(false);

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
    } catch {
      // ignore parse errors
    }
  }, []);

  const headOk = async (url: string) => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      return res.ok;
    } catch {
      return false;
    }
  };

  const runLinter = async () => {
    setRunning(true);
    const res: Result[] = [];

    for (const scene of scenes) {
      const errors: string[] = [];
      let checked = 0;
      let passed = 0;

      const videoStarts = scene.timeline.filter((e) => e.type === "video" && e.action === "start");
      for (const v of videoStarts) {
        checked++;
        if (await headOk(v.id)) {
          passed++;
        } else {
          errors.push(`Missing video: ${v.id}`);
        }
      }

      const soundStarts = scene.timeline.filter((e) => e.type === "sound" && e.action === "start");
      for (const s of soundStarts) {
        checked++;
        const base = `/sounds/${s.id}`;
        const mp3 = await headOk(`${base}.mp3`);
        const wav = mp3 ? true : await headOk(`${base}.wav`);
        if (mp3 || wav) {
          passed++;
        } else {
          errors.push(`Missing sound: ${base}.(mp3|wav)`);
        }
      }

      res.push({
        scene: scene.name,
        ok: errors.length === 0,
        errors,
        checked,
        passed,
      });
    }

    setResults(res);
    setRunning(false);
  };

  return (
    <main className="p-8 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">🔍 RK3 Scene Linter</h1>
      <p className="text-gray-400 mb-6">
        Checks every saved scene for missing sounds/videos.
      </p>

      <button
        onClick={runLinter}
        disabled={running || scenes.length === 0}
        className="px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-xl font-bold"
      >
        {running ? "Checking…" : "Run Linter"}
      </button>

      {results.length > 0 && (
        <div className="mt-8 space-y-4">
          {results.map((r, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                r.ok ? "border-green-600 bg-green-900/30" : "border-red-600 bg-red-900/30"
              }`}
            >
              <h2 className="font-bold text-lg">
                🎬 {r.scene} — {r.ok ? "✅ OK" : "⚠️ Issues"}
              </h2>
              <p className="text-sm text-gray-300">
                {r.passed}/{r.checked} assets verified
              </p>
              {!r.ok && (
                <ul className="list-disc list-inside text-red-400 mt-2 text-sm">
                  {r.errors.map((err, j) => (
                    <li key={j}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
