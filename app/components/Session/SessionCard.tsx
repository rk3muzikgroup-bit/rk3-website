"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
  description: string;

  // audio intent (handled by parent that has provider)
  onPlay?: () => void;

  installed?: boolean;
  onInstall?: () => void;

  // modal sync only
  onOpenModal?: () => void;
};

export default function SessionCard({
  title,
  subtitle,
  description,
  onPlay,
  installed,
  onInstall,
  onOpenModal,
}: Props) {
  function handlePlay() {
    onPlay?.();       // 🎧 audio handled upstream
    onOpenModal?.(); // 🧭 UI sync only
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-gradient-to-b from-white/[0.07] to-white/[0.015]
        backdrop-blur-xl
        p-6
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]
      "
    >
      {/* SOFT GLOW */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          bg-[radial-gradient(600px_circle_at_30%_-20%,rgba(255,255,255,0.12),transparent_40%)]
        "
      />

      {/* HEADER */}
      <div className="relative z-10 mb-4">
        <h3 className="text-lg font-medium tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
          {subtitle}
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="relative z-10 text-sm leading-relaxed text-white/70 mb-6">
        {description}
      </p>

      {/* FOOTER */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] tracking-wide text-white/40">
          by RK3
        </span>

        <div className="flex items-center gap-2">
          {onPlay && (
            <button
              onClick={handlePlay}
              className="
                rounded-full
                px-3 py-1.5
                text-xs font-medium
                bg-white/10 text-white
                hover:bg-white/20
                active:scale-[0.97]
                transition
              "
            >
              Play
            </button>
          )}

          {installed ? (
            <span className="text-xs font-medium text-emerald-400">
              Installed
            </span>
          ) : (
            <button
              onClick={onInstall}
              className="
                rounded-full
                px-4 py-1.5
                text-xs font-medium
                bg-white text-black
                hover:bg-white/90
                active:scale-[0.97]
                transition
              "
            >
              Install
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
