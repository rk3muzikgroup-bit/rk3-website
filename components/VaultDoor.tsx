"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type SoundMap = {
  [key: string]: HTMLAudioElement | null;
};

export default function VaultDoor() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState<"none" | "green" | "red">("none");
  const soundsRef = useRef<SoundMap>({});

  // preload sounds from /public/sounds/vault/*
  useEffect(() => {
    const paths = {
      code: "/sounds/vault/code-entry.mp3",
      lock: "/sounds/vault/lock-release.mp3",
      granted: "/sounds/vault/access-granted.mp3",
      ride: "/sounds/vault/door-ride.mp3",
      denied: "/sounds/vault/access-denied.mp3",
      blast: "/sounds/vault/blast.mp3",
    };

    const make = (src: string) => {
      const a = new Audio(src);
      a.preload = "auto";
      return a;
    };

    soundsRef.current = {
      code: make(paths.code),
      lock: make(paths.lock),
      granted: make(paths.granted),
      ride: make(paths.ride),
      denied: make(paths.denied),
      blast: make(paths.blast),
    };

    return () => {
      Object.values(soundsRef.current).forEach((a) => {
        if (a) {
          a.pause();
          a.src = "";
        }
      });
      soundsRef.current = {};
    };
  }, []);

  const play = (name: keyof SoundMap) => {
    const a = soundsRef.current[name];
    if (!a) return;
    try {
      a.currentTime = 0;
      void a.play();
    } catch {}
  };

  const runDenied = () => {
    if (busy) return;
    setBusy(true);
    setFlash("red");
    play("denied");
    setTimeout(() => play("blast"), 400);
    setTimeout(() => {
      setFlash("none");
      setBusy(false);
    }, 1400);
  };

  const runGranted = () => {
    if (busy) return;
    setBusy(true);
    setFlash("green");
    play("code");
    setTimeout(() => play("lock"), 300);
    setTimeout(() => play("granted"), 650);
    setTimeout(() => play("ride"), 1100);
    setTimeout(() => router.push("/final-room"), 2600);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Flash overlay */}
      {flash !== "none" && (
        <div
          className={`pointer-events-none absolute inset-0 rounded-3xl mix-blend-screen transition
          ${flash === "green" ? "bg-green-400/20" : "bg-red-500/25"}`}
          style={{ boxShadow: flash !== "none" ? "0 0 140px 40px currentColor" : undefined }}
        />
      )}

      <div
        className={`w-[420px] h-[160px] rounded-3xl border border-white/15 bg-white/5 backdrop-blur
        flex items-center justify-center gap-4 px-6 ${busy ? "opacity-80" : "hover:bg-white/10"} transition`}
      >
        <button
          disabled={busy}
          onClick={runGranted}
          className="px-6 py-3 rounded-full ring-1 ring-emerald-300/30 text-emerald-200/90 hover:bg-emerald-300/10 active:scale-[0.98] transition"
        >
          Access Granted
        </button>

        <button
          disabled={busy}
          onClick={runDenied}
          className="px-6 py-3 rounded-full ring-1 ring-red-300/30 text-red-200/90 hover:bg-red-300/10 active:scale-[0.98] transition"
        >
          Access Denied
        </button>
      </div>
    </div>
  );
}
