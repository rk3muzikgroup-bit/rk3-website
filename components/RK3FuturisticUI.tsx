// src/components/RK3FuturisticUI.tsx
"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

/** Lightweight emoji “icons” (no external deps) */
function EmojiIcon({ glyph, className = "" }: { glyph: string; className?: string }) {
  return (
    <span aria-hidden className={`inline-block align-middle ${className}`}>
      {glyph}
    </span>
  );
}
const ZapIcon = (p: any) => <EmojiIcon glyph="⚡" {...p} />;
const CompassIcon = (p: any) => <EmojiIcon glyph="🧭" {...p} />;
const LockIcon = (p: any) => <EmojiIcon glyph="🔒" {...p} />;
const SwordIcon = (p: any) => <EmojiIcon glyph="⚔️" {...p} />;
const WavesIcon = (p: any) => <EmojiIcon glyph="🌊" {...p} />;
const WindIcon = (p: any) => <EmojiIcon glyph="💨" {...p} />;

type AccentKey = "street" | "soul" | "spirit" | "gold";

const rk3 = {
  bgGlass: "bg-white/5 backdrop-blur-xl",
  ring: "ring-1 ring-white/10",
  shadow: "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.65)]",
  street: { from: "from-[#0ea5e9]", to: "to-[#14b8a6]", tint: "bg-cyan-500/10", name: "STREET" },
  soul:   { from: "from-[#a3e635]", to: "to-[#f59e0b]", tint: "bg-amber-400/10", name: "SOUL" },
  spirit: { from: "from-[#6366f1]", to: "to-[#a855f7]", tint: "bg-indigo-500/10", name: "SPIRIT" },
  gold:   { from: "from-[#f8d57e]", to: "to-[#e4b74d]" },
};

const breathe = {
  initial: { opacity: 0.92 },
  animate: { opacity: [0.92, 1, 0.92], transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } },
};

export function GlowButton({
  label,
  icon,
  gradient = "spirit",
  className = "",
  ...props
}: {
  label: string;
  icon?: React.ReactNode;
  gradient?: AccentKey;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const g = rk3[gradient as AccentKey] as any;
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative isolate ${rk3.bgGlass} ${rk3.ring} ${rk3.shadow}
        px-5 py-3 rounded-2xl text-sm md:text-base font-medium tracking-wide
        text-white/95 hover:text-white transition-colors duration-300 group ${className}`}
      {...props}
    >
      <span className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${g.from} ${g.to} opacity-20 group-hover:opacity-30 transition-opacity`} />
      <span className="pointer-events-none absolute inset-px rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="relative z-10 flex items-center gap-2">
        {icon && <span className="opacity-90">{icon}</span>}
        <span>{label}</span>
      </div>
    </motion.button>
  );
}

export function WarpSpeedButton({ onWarp, label = "Warp-Speed to Vault" }: { onWarp?: () => void; label?: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key.toLowerCase() === "w") onWarp?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onWarp]);

  return (
    <motion.div variants={breathe as any} initial="initial" animate="animate">
      <GlowButton gradient="gold" label={label} icon={<ZapIcon className="h-4 w-4" />} onClick={onWarp} className="px-6 py-3" />
    </motion.div>
  );
}

export function PortalDoorButton({
  title,
  subtitle,
  imageSrc,
  accent = "spirit",
  onClick,
}: {
  title: string;
  subtitle?: string;
  imageSrc: string;
  accent?: "street" | "soul" | "spirit";
  onClick?: () => void;
}) {
  const g = rk3[accent as AccentKey] as any;
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-between rounded-3xl overflow-hidden ${rk3.bgGlass} ${rk3.ring} ${rk3.shadow} p-4 w-[260px] h-[360px] text-left`}
    >
      <span className={`absolute inset-0 bg-gradient-to-b ${g.from} ${g.to} opacity-10 group-hover:opacity-20 transition-opacity`} />
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <img src={imageSrc} alt={`${title} portal`} className="h-48 w-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform" />
      </div>
      <div className="relative z-10 w-full">
        <div className="flex items-center gap-2 text-white/95">
          {accent === "street" && <SwordIcon className="h-4 w-4 opacity-80" />}
          {accent === "soul"   && <WavesIcon className="h-4 w-4 opacity-80" />}
          {accent === "spirit" && <WindIcon className="h-4 w-4 opacity-80" />}
          <span className="font-semibold tracking-wide">{title}</span>
        </div>
        {subtitle && <p className="text-xs text-white/70 mt-1">{subtitle}</p>}
      </div>
    </motion.button>
  );
}

export function HUDToolbar({
  onWarp,
  onMap,
  onLock,
  pathLabel = "SPIRIT",
  accent = "spirit",
}: {
  onWarp?: () => void;
  onMap?: () => void;
  onLock?: () => void;
  pathLabel?: string;
  accent?: "street" | "soul" | "spirit";
}) {
  const g = rk3[accent];
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 ${rk3.bgGlass} ${rk3.ring} ${rk3.shadow} rounded-3xl px-4 py-3 md:px-6 md:py-4 flex items-center gap-3 md:gap-4`}>
      {/* soft glow */}
      <span className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" aria-hidden />
      <div className="hidden md:flex items-center gap-2 text-white/80 text-xs tracking-[0.2em]">
        <CompassIcon className="h-4 w-4" />
        <span>NAV</span>
        <span className="h-3 w-px bg-white/20 mx-1" />
        <span className="text-white/60">PATH:</span>
        <span className="font-semibold text-white/90">{pathLabel}</span>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <GlowButton label="Map"   icon={<CompassIcon className="h-4 w-4" />} onClick={onMap}  className="hidden md:flex" gradient={accent as any} />
        <WarpSpeedButton onWarp={onWarp} />
        <GlowButton label="Lock In" icon={<LockIcon className="h-4 w-4" />} onClick={onLock} gradient={accent as any} />
      </div>
    </div>
  );
}

/** Keep a default export to allow optional preview imports without breaking named imports */
export default function RK3FuturisticUI() {
  return <div className="hidden" />;
}
