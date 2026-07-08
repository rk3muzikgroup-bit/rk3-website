"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rks3:bootComplete";

const LINES = [
  "Initializing RK3 Command Base…",
  "Loading Street • Soul • Spirit modules…",
  "Syncing cinematic layers…",
  "Linking navigation matrix…",
  "System ready.",
];

export default function BootSequence() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [index, setIndex] = useState(0);

  /* ───────── MOUNT + CHECK ───────── */
  useEffect(() => {
    setMounted(true);

    try {
      const completed =
        localStorage.getItem(STORAGE_KEY) === "true";
      if (completed) setDone(true);
    } catch {
      // storage unavailable → show boot once
    }
  }, []);

  /* ───────── STEP THROUGH BOOT ───────── */
  useEffect(() => {
    if (!mounted || done) return;

    const t = setTimeout(() => {
      if (index < LINES.length - 1) {
        setIndex(v => v + 1);
      } else {
        try {
          localStorage.setItem(STORAGE_KEY, "true");
        } catch {
          // ignore storage failures
        }
        setDone(true);
      }
    }, index === LINES.length - 1 ? 700 : 550);

    return () => clearTimeout(t);
  }, [mounted, done, index]);

  if (!mounted || done) return null;

  return (
    <div className="fixed inset-0 z-[95] bg-black/95 backdrop-blur-md flex items-center justify-center">
      <div className="w-full max-w-xl px-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 glow-border">
          <p className="text-xs tracking-[0.35em] uppercase opacity-70">
            System Boot
          </p>

          <div className="mt-4 space-y-2 font-mono text-sm leading-6">
            {LINES.slice(0, index + 1).map((line, i) => (
              <div key={i} className="opacity-90 fade-in">
                {line}
              </div>
            ))}
          </div>

          <div className="mt-6 h-[2px] w-full overflow-hidden rounded bg-white/10">
            <div
              className="h-full bg-white/40"
              style={{
                width: `${
                  ((index + 1) / LINES.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
