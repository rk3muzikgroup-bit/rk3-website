"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Helper to create <audio> safely
function makeAudio(path: string, volume = 0.9) {
  const a = new Audio(path);
  try {
    a.preload = "auto";
    a.volume = volume;
  } catch {}
  return a;
}

export default function VaultPage() {
  const router = useRouter();

  // Sounds (best-effort; safe if files are missing)
  const soundsRef = useRef<Record<string, HTMLAudioElement | undefined>>({});

  // Visual flash overlay
  const [flash, setFlash] = useState<"none" | "green" | "red">("none");
  const showFlash = (c: "green" | "red", ms = 420) => {
    setFlash(c);
    setTimeout(() => setFlash("none"), ms);
  };

  // Preload sounds and prefetch routes
  useEffect(() => {
    soundsRef.current = {
      // One-shot combo: code → granted → door opens (23s)
      unlock: makeAudio("/sounds/vault/unlock.mp3"),
      // Fallbacks (keep around for other scenes)
      code: makeAudio("/sounds/vault/code-entry.mp3"),
      lock: makeAudio("/sounds/vault/lock-release.mp3"),
      granted: makeAudio("/sounds/vault/access-granted.mp3"),
      ride: makeAudio("/sounds/vault/door-ride.mp3"),
      denied: makeAudio("/sounds/vault/access-denied.mp3"),
      blast: makeAudio("/sounds/vault/blast.mp3"),
    };

    // Prefetch pages for snappy nav
    router.prefetch("/final-room");
    router.prefetch("/street");
    router.prefetch("/soul");
    router.prefetch("/spirit");

    return () => {
      // Cleanup audio on unmount
      Object.values(soundsRef.current).forEach((a) => {
        if (!a) return;
        try {
          a.pause();
          // @ts-ignore
          a.src = "";
        } catch {}
      });
    };
  }, [router]);

  // Play short sequence of cues (used for fallbacks)
  const playSeq = async (keys: string[]) => {
    for (const k of keys) {
      const a = soundsRef.current[k];
      if (!a) continue;
      try {
        a.currentTime = 0;
        await a.play();
        await new Promise<void>((res) => {
          const guard = setTimeout(res, 1500);
          const onEnd = () => {
            clearTimeout(guard);
            a.removeEventListener("ended", onEnd);
            res();
          };
          a.addEventListener("ended", onEnd);
        });
      } catch {
        // ignore autoplay/missing file
      }
    }
  };

  const onDenied = () => {
    console.log("[VAULT] Access Denied clicked");
    showFlash("red", 600);
    // Optional: denied → blast
    playSeq(["denied", "blast"]);
  };

  const onGranted = async () => {
    console.log("[VAULT] Access Granted clicked");
    showFlash("green", 400);

    // Prefer the single 23s combo clip if present
    const unlock = soundsRef.current["unlock"];
    if (unlock) {
      try {
        unlock.currentTime = 0;
        await unlock.play().catch(() => {});
        // Wait for it to finish; if duration unknown, use a guard
        const guardMs =
          isFinite(unlock.duration) && unlock.duration > 0
            ? Math.min(60000, Math.round(unlock.duration * 1000) + 300)
            : 23500; // default guard for your 23s clip

        await new Promise<void>((res) => {
          const guard = setTimeout(res, guardMs);
          const onEnd = () => {
            clearTimeout(guard);
            unlock.removeEventListener("ended", onEnd);
            res();
          };
          unlock.addEventListener("ended", onEnd);
        });
      } catch {
        // fall through to fallback sequence
        try {
          await playSeq(["code", "lock", "granted", "ride"]);
        } catch {}
      }

      // Route after audio completes
      console.log("[VAULT] router.push(/final-room)");
      router.push("/final-room");

      // Hard fallback in dev just in case
      setTimeout(() => {
        if (typeof window !== "undefined" && window.location.pathname !== "/final-room") {
          console.log("[VAULT] hard fallback → location.href");
          window.location.href = "/final-room";
        }
      }, 1500);
      return;
    }

    // If unlock missing, use the fallback chain then route
    try {
      await playSeq(["code", "lock", "granted", "ride"]);
    } catch {}
    router.push("/final-room");
  };

  const onPortal = (path: string) => {
    console.log(`[VAULT] Portal -> ${path}`);
    router.push(path);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Top: water strip */}
      <section className="relative h-24 w-full overflow-hidden border-b border-white/10">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          src="/assets/vault/water/entry-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* fallback shimmer if video is missing */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/40 via-cyan-700/30 to-sky-900/40 animate-pulse" />
        <div className="relative z-10 h-full w-full bg-gradient-to-b from-transparent to-black/60" />
      </section>

      {/* Middle: three portals (clickable) */}
      <section className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-6 px-6 w-full max-w-6xl">
          {/* Street */}
          <button
            type="button"
            onClick={() => onPortal("/street")}
            className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl aspect-[4/5] text-left cursor-pointer"
            aria-label="Enter Street"
          >
            <img
              src="/assets/vault/portals/street.jpg"
              alt="Street Portal"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-center text-sm tracking-wide">
              🛣️ Street
            </div>
          </button>

          {/* Soul (circle) */}
          <button
            type="button"
            onClick={() => onPortal("/soul")}
            className="flex items-center justify-center cursor-pointer"
            aria-label="Enter Soul"
          >
            <div className="relative h-72 w-72 max-sm:h-56 max-sm:w-56 rounded-full overflow-hidden ring-2 ring-white/10 shadow-[0_0_60px_rgba(255,255,255,0.08)]">
              <img
                src="/assets/vault/portals/soul.jpg"
                alt="Soul Portal"
                className="h-full w-full object-cover"
              />
            </div>
          </button>

          {/* Spirit */}
          <button
            type="button"
            onClick={() => onPortal("/spirit")}
            className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl aspect-[4/5] text-left cursor-pointer"
            aria-label="Enter Spirit"
          >
            <img
              src="/assets/vault/portals/spirit.jpg"
              alt="Spirit Portal"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-center text-sm tracking-wide">
              🕊️ Spirit
            </div>
          </button>
        </div>
      </section>

      {/* Bottom: torch • buttons • crystals */}
      <section className="relative w-full border-t border-white/10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-3 items-center gap-6 p-6">
          {/* Torch loop */}
          <div className="flex items-center justify-start">
            <div className="relative h-28 w-28 rounded-full overflow-hidden ring-2 ring-amber-300/50 shadow-[0_0_50px_rgba(252,211,77,0.25)]">
              <video
                className="h-full w-full object-cover"
                src="/assets/vault/door/torch-loop.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-amber-500/10" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onDenied}
              className="rounded-xl bg-red-600/90 px-5 py-3 text-sm font-semibold shadow-lg shadow-red-900/40 ring-1 ring-red-300/40 transition hover:bg-red-600"
            >
              Access Denied
            </button>
            <button
              onClick={onGranted}
              className="rounded-xl bg-emerald-600/90 px-5 py-3 text-sm font-semibold shadow-lg shadow-emerald-900/40 ring-1 ring-emerald-300/40 transition hover:bg-emerald-600"
            >
              Access Granted
            </button>
          </div>

          {/* Crystals */}
          <div className="flex items-center justify-end gap-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-300/50 to-fuchsia-400/50 ring-2 ring-white/10 shadow-[0_0_40px_rgba(168,85,247,0.35)]" />
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-300/50 to-emerald-400/50 ring-2 ring-white/10 shadow-[0_0_40px_rgba(34,197,94,0.35)]" />
          </div>
        </div>
      </section>

      {/* FLASH OVERLAY (on top of everything) */}
      {flash !== "none" && (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          <div
            className={
              (flash === "green" ? "bg-emerald-400/40" : "bg-red-600/55") +
              " absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300"
            }
          />
          {flash === "red" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-red-100 text-2xl md:text-4xl font-extrabold tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                ACCESS DENIED
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
