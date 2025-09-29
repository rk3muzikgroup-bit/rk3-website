// components/LoopPlayer.tsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function LoopPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.loop = true;
    a.preload = "auto";
    a.volume = 0;

    const fadeIn = (el: HTMLAudioElement) => {
      let v = 0;
      const step = () => {
        v = Math.min(1, v + 0.05);
        el.volume = v;
        if (v < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const tryPlay = async () => {
      try {
        await a.play();
        fadeIn(a);
        setBlocked(false);
        localStorage.setItem("rk3-audio-ok", "1");
      } catch {
        setBlocked(true);
      }
    };

    // Auto-try if the user enabled sound earlier this session
    const unlockedBefore = localStorage.getItem("rk3-audio-ok") === "1";
    if (unlockedBefore) tryPlay();
    else setBlocked(true);

    // One-time listener: first tap anywhere enables sound
    const onPointerDown = async () => {
      await tryPlay();
      document.removeEventListener("pointerdown", onPointerDown);
    };
    document.addEventListener("pointerdown", onPointerDown, { once: true });

    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [src]);

  const clickEnable = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play();
      // fade-in
      let v = 0;
      const step = () => {
        v = Math.min(1, v + 0.05);
        a.volume = v;
        if (v < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);

      setBlocked(false);
      localStorage.setItem("rk3-audio-ok", "1");
    } catch {}
  };

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src={src}
        playsInline
        controls
        onCanPlay={() => setReady(true)}
        onError={() => setBlocked(true)}
      />
      {blocked && (
        <button
          onClick={clickEnable}
          className="mt-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
        >
          Tap to enable sound
        </button>
      )}
      {!ready && (
        <div className="mt-2 text-sm text-white/70">
          Loading loop… if you don’t hear it, tap “Enable sound”.
        </div>
      )}
    </div>
  );
}
