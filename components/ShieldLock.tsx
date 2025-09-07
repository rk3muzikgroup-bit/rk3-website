// src/components/ShieldLock.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ShieldLockProps = {
  onUnlocked: () => void;
  onDenied?: () => void;
  unlockAudioSrc?: string;
  deniedAudioSrc?: string;
  bgSrc?: string; // ← NEW
};

export default function ShieldLock({
  onUnlocked,
  onDenied,
  unlockAudioSrc = "/sounds/unlock.mp3",
  deniedAudioSrc = "/sounds/access_denied.mp3",
  bgSrc = "/images/vault/vault_crowd.webp", // ← default to your crowd-at-vault art
}: ShieldLockProps) {
  const [status, setStatus] = useState<"idle" | "playing" | "denied">("idle");
  const unlockRef = useRef<HTMLAudioElement | null>(null);
  const deniedRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const u = new Audio(unlockAudioSrc);
    u.preload = "auto";
    unlockRef.current = u;
    const d = new Audio(deniedAudioSrc);
    d.preload = "auto";
    deniedRef.current = d;
    return () => { u.pause(); d.pause(); unlockRef.current = null; deniedRef.current = null; };
  }, [unlockAudioSrc, deniedAudioSrc]);

  const glow = useMemo(() => "shadow-[0_0_60px_rgba(56,189,248,0.35)] ring-2 ring-cyan-400/40 backdrop-blur-md", []);

  const handleUnlock = async () => {
    if (!unlockRef.current) return;
    try {
      setStatus("playing");
      unlockRef.current.currentTime = 0;
      await unlockRef.current.play();
      unlockRef.current.onended = () => onUnlocked();
    } catch { onUnlocked(); }
  };

  const handleDenied = async () => {
    setStatus("denied");
    if (!deniedRef.current) return onDenied?.();
    try {
      deniedRef.current.currentTime = 0;
      await deniedRef.current.play();
      deniedRef.current.onended = () => { setStatus("idle"); onDenied?.(); };
    } catch { setStatus("idle"); onDenied?.(); }
  };

  return (
    <div className="relative flex h-[calc(100vh-0px)] w-full items-center justify-center overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(1.1) contrast(1.05) brightness(0.9)",
        }}
      />
      {/* COSMIC VIGNETTE + GRADIENTS FOR READABILITY */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      {/* SUBTLE MOVING FLARE */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-2xl animate-pulse"
             style={{ background: "radial-gradient(closest-side, rgba(255,199,95,0.7), rgba(255,199,95,0.0))" }} />
      </div>

      {/* GRID OVERLAY (very faint) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

      {/* SHIELD CARD */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className={`relative z-10 w-[min(90vw,640px)] rounded-2xl border border-cyan-400/20 bg-black/40 p-8 text-center ${glow}`}
      >
        <div className="mx-auto mb-6 h-20 w-20 rounded-full border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="1.25" d="M16 11V7a4 4 0 10-8 0v4"/>
            <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.25"/>
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-semibold">RK3 • Vault Entry</h1>
        <p className="mb-6 text-sm text-white/80">
          A crowd gathers at the door. The cosmos peeks through the seal. Authenticate to proceed.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={handleUnlock} disabled={status === "playing"} className="rounded-2xl bg-cyan-400/30 px-5 py-2 text-sm font-medium hover:bg-cyan-400/40 active:scale-[0.98] transition">
            {status === "playing" ? "Opening…" : "Unlock"}
          </button>
          <button onClick={handleDenied} disabled={status === "playing"} className="rounded-2xl bg-white/10 px-5 py-2 text-sm hover:bg-white/15 active:scale-[0.98] transition">
            Deny
          </button>
        </div>
      </motion.div>

      {/* AMBIENT RINGS */}
      <AnimatePresence>
        <motion.div key="ring" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/25" />
          <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15" />
          <div className="absolute left-1/2 top-1/2 h-[30vmin] w-[30vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
