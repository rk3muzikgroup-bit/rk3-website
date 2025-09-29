// app/intro/IntroClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function IntroClient() {
  const vRef = useRef<HTMLVideoElement | null>(null);
  const [black, setBlack] = useState(false);
  const search = useSearchParams();

  // Controls (override with query params)
  const fadeEnabled = (search?.get("fade") ?? "1") !== "0"; // /intro?fade=0 disables overlay fade
  const leadMs = clampMs(parseInt(search?.get("lead") || "700", 10), 100, 4000); // start fade before end
  const extraTailMs = clampMs(parseInt(search?.get("tail") || "200", 10), 0, 2000); // buffer after duration

  useEffect(() => {
    const v = vRef.current;
    if (!v) return;

    let fadeTimer: number | undefined;
    let routeTimer: number | undefined;

    const routeOut = () => {
      if (!black && fadeEnabled) setBlack(true);
      window.setTimeout(() => (window.location.href = "/cockpit"), 800);
    };

    const schedule = () => {
      const durMs =
        isFinite(v.duration) && v.duration > 0 ? Math.round(v.duration * 1000) : 7000;
      if (fadeEnabled) {
        const fadeAt = Math.max(0, durMs - leadMs);
        window.clearTimeout(fadeTimer);
        fadeTimer = window.setTimeout(() => setBlack(true), fadeAt);
      }
      window.clearTimeout(routeTimer);
      routeTimer = window.setTimeout(routeOut, durMs + extraTailMs);
    };

    schedule();

    const onEnded = () => routeOut();
    const onError = () => routeOut();
    const onLoadedMeta = () => schedule();

    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onError);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(routeTimer);
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeEnabled, leadMs, extraTailMs]);

  const skip = () => {
    if (fadeEnabled) setBlack(true);
    setTimeout(() => (window.location.href = "/cockpit"), 800);
  };

  return (
    <section className="relative min-h-[92vh] md:min-h-screen overflow-hidden bg-black">
      <video
        ref={vRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/intro/nasa_zoom.mp4"
        poster="/rks3-3doors.png"
        autoPlay
        muted
        playsInline
      />
      <img
        src="/rks3-3doors.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-10"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <button
        onClick={skip}
        className="absolute bottom-4 right-4 z-20 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
      >
        Skip
      </button>

      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-700 ${
          black ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}

function clampMs(v: number, min: number, max: number) {
  if (Number.isNaN(v)) return min;
  return Math.max(min, Math.min(max, v));
}
