"use client";

export function playUISound(
  src: string,
  volume = 0.18,
  durationMs = 1500
) {
  try {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.currentTime = 0;

    audio.play().catch(() => {});

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, durationMs);
  } catch {}
}
