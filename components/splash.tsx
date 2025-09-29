// replace the current timeout-based logic with this:

"use client";
import { useEffect, useRef } from "react";

export default function Splash() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // If video can't autoplay, fall back to a timed continue (12s)
    const fallback = window.setTimeout(() => {
      if (document.visibilityState === "visible") window.location.href = "/entrance";
    }, 12000);

    const onEnded = () => {
      window.clearTimeout(fallback);
      window.location.href = "/entrance";
    };

    v.addEventListener("ended", onEnded);
    return () => {
      window.clearTimeout(fallback);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  const continueNow = () => (window.location.href = "/entrance");

  return (
    <section className="relative min-h-[92vh] md:min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/rooms/spaceship.mp4"
        poster="/rks3-3doors.png"
        autoPlay
        muted
        playsInline
      />
      <img
        src="/rks3-3doors.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 grid place-items-center p-6">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">Approaching RK3 • Landing…</h1>
          <p className="mt-2 text-sm md:text-base text-white/80">Street • Soul • Spirit</p>
          <button
            onClick={continueNow}
            className="mt-6 inline-block rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm md:text-base hover:bg-white/15"
          >
            Skip to Entrance
          </button>
        </div>
      </div>
    </section>
  );
}
