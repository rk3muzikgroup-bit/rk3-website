"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string | null;
  onEnded?: () => void;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  // fadeIn on mount, fadeOut on natural end
  fadeMs?: number;         // default 1500
  className?: string;
  // optional: start fade this many ms *before* natural end (if duration known)
  preEndFadeMs?: number;   // default 0 (use onended)
};

export default function SceneVideo({
  src,
  onEnded,
  autoPlay = true,
  loop = false,
  muted = false,
  fadeMs = 1500,
  className = "",
  preEndFadeMs = 0,
}: Props) {
  const [fade, setFade] = useState<"in" | "none" | "out">("in");
  const vref = useRef<HTMLVideoElement | null>(null);
  const preFadeTimer = useRef<number | null>(null);

  useEffect(() => {
    setFade("in");
    const v = vref.current;
    if (!v) return;

    const oncanplay = () => {
      if (autoPlay) v.play().catch(() => {});
      if (!loop && preEndFadeMs > 0 && v.duration && isFinite(v.duration)) {
        const ms = Math.max(0, (v.duration * 1000) - preEndFadeMs);
        preFadeTimer.current = window.setTimeout(() => setFade("out"), ms);
      }
    };
    const onend = () => {
      setFade("out");
      window.setTimeout(() => onEnded?.(), fadeMs);
    };

    v.addEventListener("canplay", oncanplay);
    v.addEventListener("ended", onend);
    return () => {
      v.removeEventListener("canplay", oncanplay);
      v.removeEventListener("ended", onend);
      if (preFadeTimer.current) window.clearTimeout(preFadeTimer.current);
    };
  }, [src, autoPlay, loop, preEndFadeMs, fadeMs, onEnded]);

  return (
    <div className={`relative w-full h-full`}>
      <video
        ref={vref}
        src={src ?? ""}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-[${fadeMs}ms] ${
          fade === "in" ? "opacity-100" : fade === "out" ? "opacity-0" : "opacity-100"
        } ${className}`}
      />
      {/* black cover to ensure clean fade to black */}
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-[${fadeMs}ms] ${
          fade === "out" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
