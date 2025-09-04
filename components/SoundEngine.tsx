// components/SoundEngine.tsx
import { useEffect, useRef } from "react";

export default function SoundEngine({
  src,
  play,
  loop = false,
}: {
  src: string;
  play: boolean;
  loop?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (!play && audioRef.current) {
      audioRef.current.pause();
    }
  }, [play]);

  return <audio ref={audioRef} src={src} preload="auto" loop={loop} />;
}
