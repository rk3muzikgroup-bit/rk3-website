"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import usePlaySound from "@/hooks/usePlaySound";

export default function VaultClosing() {
  const router = useRouter();

  // sounds
  const playClosingLong = usePlaySound("vault/closing_long");
  const playDoorClose = usePlaySound("vault/door_close");
  const playDenied = usePlaySound("vault/denied_blast");

  const [failed, setFailed] = useState(false);
  const [activeAudios, setActiveAudios] = useState<HTMLAudioElement[]>([]);
  const [shake, setShake] = useState(false);

  // helper: play & track audio
  const playTracked = (file: string, volume = 0.7) => {
    const audio = new Audio(`/sounds/${file}.mp3`);
    audio.volume = volume;
    audio.play().catch((err) => console.warn("Audio playback failed:", err));
    setActiveAudios((prev) => [...prev, audio]);
    return audio;
  };

  useEffect(() => {
    if (failed) return; // don’t run if fail triggered

    // play main closing sequence
    const closing = playTracked("vault/closing_long");
    const door = setTimeout(() => playTracked("vault/door_close", 0.8), 1000);

    // redirect after 13s
    const redirect = setTimeout(() => {
      router.push("/"); // back home
    }, 13000);

    return () => {
      closing.pause();
      closing.currentTime = 0;
      clearTimeout(door);
      clearTimeout(redirect);
    };
  }, [failed, router]);

  const handleFail = () => {
    // stop all active audios
    activeAudios.forEach((a) => {
      a.pause();
      a.currentTime = 0;
    });
    setActiveAudios([]);
    setFailed(true);

    // 🔴 play fail blast
    playDenied();

    // 💥 trigger shake animation
    setShake(true);
    setTimeout(() => setShake(false), 600); // reset after 600ms
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-black text-white transition 
      ${shake ? "animate-shake" : ""}`}
    >
      <h1 className="text-3xl font-bold mb-4">Vault Closing...</h1>
      <video
        src="/videos/vault_closing.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full max-w-3xl rounded-lg shadow-lg"
      />
      <button
        onClick={handleFail}
        className="mt-6 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
      >
        Trigger Fail Test
      </button>
    </div>
  );
}
