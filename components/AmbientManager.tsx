// components/AmbientManager.tsx
import { useEffect, useRef } from "react";

interface AmbientManagerProps {
  soundFile: string;
  volume?: number; // default volume
}

export default function AmbientManager({ soundFile, volume = 0.4 }: AmbientManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(soundFile);
    audio.loop = true;
    audio.volume = 0; // start silent for fade-in
    audioRef.current = audio;

    let fadeInterval: NodeJS.Timeout;

    const fadeIn = () => {
      let vol = 0;
      fadeInterval = setInterval(() => {
        if (vol < volume) {
          vol += 0.01;
          audio.volume = Math.min(vol, volume);
        } else {
          clearInterval(fadeInterval);
        }
      }, 100); // fade over ~4 sec
    };

    audio.play().then(fadeIn).catch(() => {});

    return () => {
      // fade out before stopping
      if (audioRef.current) {
        let vol = audioRef.current.volume;
        const fadeOut = setInterval(() => {
          if (vol > 0) {
            vol -= 0.01;
            audioRef.current!.volume = Math.max(vol, 0);
          } else {
            clearInterval(fadeOut);
            audioRef.current?.pause();
            audioRef.current = null;
          }
        }, 100); // fade over ~4 sec
      }
      clearInterval(fadeInterval);
    };
  }, [soundFile, volume]);

  return null; // This is audio only, no UI
}
