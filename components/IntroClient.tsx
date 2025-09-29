// components/IntroClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroClient() {
  const vRef = useRef<HTMLVideoElement | null>(null);
  const [black, setBlack] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const v = vRef.current;
    if (!v) return;

    v.muted = true;        // autoplay-safe
    v.playsInline = true;
    v.play().catch(() => setNeedsTap(true));

    const onEnded = () => {
      // fade to black then route
      setBlack(true);
      setTimeout(() => (window.location.href = "/cockpit"), 600);
    };
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, []);

  const enableSound = async () => {
    const v = vRef.current;
    if (!v) return;
    try {
      v.muted = false;
      v.volume = 1;
      await v.play();
      setSoundOn(true);
      setNeedsTap(false);
    } catch {}
  };

  return (
    <main className="relative min-h-[92vh] md:min-h-screen bg-black text-white overflow-hidden">
      <video
        ref={vRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/intro/nasa_zoom.mp4"
        poster="/images/cockpit.jpg"
        preload="auto"
      />
      {/* subtle gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* top UI */}
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <div className="text-sm md:text-base opacity-90">🚀 Launching…</div>
        <div className="flex gap-2">
          {!soundOn && (
            <button
              onClick={enableSound}
              className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs md:text-sm hover:bg-white/15"
            >
              🔊 Sound On
            </button>
          )}
          <button
            onClick={() => {
              setBlack(true);
              setTimeout(() => (window.location.href = "/cockpit"), 600);
            }}
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs md:text-sm hover:bg-white/15"
          >
            Skip
          </button>
        </div>
      </div>

      {/* tap-to-play overlay (if autoplay blocked) */}
      {needsTap && !soundOn && (
        <div className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm">
          <button
            onClick={enableSound}
            className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm hover:bg-white/15"
          >
            Tap to Play with Sound
          </button>
        </div>
      )}

      {/* fade to black */}
      <div className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-600 ${black ? "opacity-100" : "opacity-0"}`} />
    </main>
  );
}
