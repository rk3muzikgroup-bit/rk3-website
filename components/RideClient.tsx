// components/RideClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type HlsType from "hls.js";

type Accent = "street" | "soul" | "spirit";

const STYLE: Record<Accent, { grad: string; label: string; hint: string; aura?: boolean }> = {
  street: { grad: "from-orange-500/30 via-rose-500/15 to-transparent", label: "text-orange-200", hint: "Grounded • Kinetic • Grit" },
  soul:   { grad: "from-amber-400/30 via-yellow-300/15 to-transparent", label: "text-amber-200",  hint: "Warm • Golden • Human" },
  spirit: { grad: "from-indigo-400/30 via-violet-500/15 to-transparent", label: "text-indigo-200", hint: "Indigo • Airy • Elevate", aura: true },
};

export default function RideClient({
  accent,
  videoSrc,
  posterSrc,
  hlsSrc,                // optional
  fallbackMs = 65000,
  nextHref = "/vault",
}: {
  accent: Accent;
  videoSrc: string;
  posterSrc: string;
  hlsSrc?: string;
  fallbackMs?: number;
  nextHref?: string;
}) {
  const vRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<any>(null);
  const [black, setBlack] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = vRef.current;
    if (!v) return;

    const attach = async () => {
      if (hlsSrc) {
        try {
          const head = await fetch(hlsSrc, { method: "HEAD" });
          if (head.ok) {
            if (v.canPlayType("application/vnd.apple.mpegURL")) {
              v.src = hlsSrc;
            } else {
              const { default: Hls } = (await import("hls.js")) as { default: typeof HlsType };
              if (Hls.isSupported()) {
                const h = new Hls({ maxBufferLength: 20, maxMaxBufferLength: 60 });
                hlsRef.current = h;
                h.attachMedia(v);
                h.on(Hls.Events.MEDIA_ATTACHED, () => h.loadSource(hlsSrc));
                h.on(Hls.Events.ERROR, (_, data) => {
                  if (data.fatal) {
                    try { h.destroy(); } catch {}
                    hlsRef.current = null;
                    v.src = videoSrc; // fallback to MP4
                    v.play().catch(() => setNeedsTap(true));
                  }
                });
              } else {
                v.src = videoSrc;
              }
            }
          } else {
            v.src = videoSrc;
          }
        } catch {
          v.src = videoSrc;
        }
      } else {
        v.src = videoSrc;
      }

      v.muted = true;       // autoplay-safe
      v.playsInline = true;
      v.preload = "auto";
      v.play().catch(() => setNeedsTap(true));
    };

    attach();

    return () => {
      try { hlsRef.current?.destroy?.(); } catch {}
      hlsRef.current = null;
    };
  }, [hlsSrc, videoSrc]);

  // timers + end
  useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    let fadeTimer: number | undefined;
    let routeTimer: number | undefined;

    const schedule = () => {
      const dur = isFinite(v.duration) && v.duration > 0 ? v.duration * 1000 : fallbackMs;
      clearTimeout(fadeTimer); clearTimeout(routeTimer);
      fadeTimer = window.setTimeout(() => setBlack(true), Math.max(0, dur - 900));
      routeTimer = window.setTimeout(() => {
        setBlack(true);
        setTimeout(() => (window.location.href = nextHref), 700);
      }, dur + 200);
    };

    const onLoaded = () => { setReady(true); schedule(); };
    const onEnded  = () => {
      setBlack(true);
      setTimeout(() => (window.location.href = nextHref), 600);
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("ended", onEnded);
    return () => {
      clearTimeout(fadeTimer); clearTimeout(routeTimer);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("ended", onEnded);
    };
  }, [fallbackMs, nextHref]);

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

  // unmute if user taps video
  useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    const onPointer = () => { if (!soundOn) enableSound(); };
    v.addEventListener("pointerdown", onPointer);
    return () => v.removeEventListener("pointerdown", onPointer);
  }, [soundOn]);

  const s = STYLE[accent];

  return (
    <main className="relative min-h-[92vh] md:min-h-screen overflow-hidden bg-black text-white">
      <video ref={vRef} className="absolute inset-0 h-full w-full object-cover" poster={posterSrc} />
      <img src={posterSrc} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" aria-hidden />
      <div className={`absolute inset-0 bg-gradient-to-t ${s.grad}`} />
      {s.aura && <div className="pointer-events-none absolute inset-0" />}

      {/* top controls */}
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <div className={`text-sm md:text-base font-semibold ${s.label}`}>Entering {accent.toUpperCase()} • {s.hint}</div>
        <div className="flex items-center gap-2">
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
              setTimeout(() => (window.location.href = nextHref), 700);
            }}
            className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs md:text-sm hover:bg-white/15"
          >
            Skip to Vault
          </button>
        </div>
      </div>

      {/* prompt if autoplay blocked */}
      {needsTap && !soundOn && (
        <div className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm">
          <button
            onClick={enableSound}
            className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm hover:bg-white/15"
          >
            Tap to Play with Sound
          </button>
          <div className="mt-3 text-xs text-white/75">Autoplay with sound is blocked — tap once to unmute.</div>
        </div>
      )}

      {/* fade to black */}
      <div className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-700 ${black ? "opacity-100" : "opacity-0"}`} />
    </main>
  );
}
