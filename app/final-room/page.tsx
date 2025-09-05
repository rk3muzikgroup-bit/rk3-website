"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function FinalRoomPage() {
  const router = useRouter();
  const closeRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Prepare sound
    const a = new Audio("/sounds/vault/door-close.mp3");
    a.preload = "auto";
    a.volume = 0.9;
    closeRef.current = a;

    // Try to auto-close the vault door shortly after arrival
    const t = setTimeout(() => {
      a.currentTime = 0;
      a.play().catch(() => {
        // Autoplay might be blocked; it's fine (user actions will work)
      });
    }, 350);

    return () => {
      clearTimeout(t);
      try {
        a.pause();
        // @ts-ignore
        a.src = "";
      } catch {}
    };
  }, []);

  const backToVault = async () => {
    try {
      if (closeRef.current) {
        closeRef.current.currentTime = 0;
        await closeRef.current.play().catch(() => {});
      }
    } catch {}
    // Give a brief moment for the hit to register, then route
    setTimeout(() => router.push("/vault"), 300);
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">🚪 The Final Room</h1>
        <p className="mt-3 text-white/70">
          Access confirmed. The vault door has closed behind you.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={backToVault}
            className="rounded-xl bg-white/10 px-5 py-3 text-sm ring-1 ring-white/10 hover:bg-white/15"
          >
            ⬅︎ Back to Vault (plays close)
          </button>
          <a
            href="/vault"
            className="rounded-xl bg-white/5 px-5 py-3 text-sm ring-1 ring-white/10/50 hover:bg-white/10"
          >
            Back (no sound)
          </a>
        </div>
      </div>
    </main>
  );
}
