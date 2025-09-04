// components/VaultAudioPlayer.tsx
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  nextSrc?: string; // optional next track for crossfade
};

export default function VaultAudioPlayer({ src, nextSrc }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nextAudioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const fadeDuration = 3; // seconds

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.volume = 1;

    audio.play().then(() => setPlaying(true));

    if (nextSrc) {
      const nextAudio = new Audio(nextSrc);
      nextAudio.volume = 0;
      nextAudioRef.current = nextAudio;

      // crossfade near the end
      audio.addEventListener("timeupdate", () => {
        if (audio.duration - audio.currentTime <= fadeDuration && !nextAudio.paused) {
          // start next track
          nextAudio.play();

          // fade out current
          const fadeOut = setInterval(() => {
            if (audio.volume > 0.05) {
              audio.volume -= 0.05;
            } else {
              clearInterval(fadeOut);
              audio.pause();
            }
          }, 200);

          // fade in next
          const fadeIn = setInterval(() => {
            if (nextAudio.volume < 0.95) {
              nextAudio.volume += 0.05;
            } else {
              clearInterval(fadeIn);
              nextAudio.volume = 1;
            }
          }, 200);
        }
      });
    }

    return () => {
      audio.pause();
      if (nextAudioRef.current) nextAudioRef.current.pause();
    };
  }, [src, nextSrc]);

  return (
    <div className="text-center">
      <p className="text-white">🎬 Hollywood RK3 Audio Player</p>
      {playing ? "Now Playing..." : "Loading..."}
    </div>
  );
}
