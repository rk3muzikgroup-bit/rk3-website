"use client";
import { useEffect, useRef, useState } from "react";
import { useVolume } from "@/context/VolumeContext";

export default function SafeSound({ src, loop = true }: { src: string; loop?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState(false);
  const { muted } = useVolume();

  // Smooth fade logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const fadeDuration = 1500; // 1.5s Hollywood fade
    const step = 50; // interval step in ms
    const volumeStep = step / fadeDuration;

    let target = muted ? 0 : 1; // fade to mute or full volume
    let vol = audio.volume;

    const fade = setInterval(() => {
      if (muted && vol > target) {
        vol = Math.max(0, vol - volumeStep);
        audio.volume = vol;
      } else if (!muted && vol < target) {
        vol = Math.min(1, vol + volumeStep);
        audio.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, step);

    return () => clearInterval(fade);
  }, [muted]);

  return (
    <audio
      ref={audioRef}
      autoPlay
      loop={loop}
      onError={() => setError(true)}
    >
      <source src={error ? "" : src} type="audio/mp3" />
    </audio>
  );
}
