"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  installed?: boolean;
  onInstall?: () => void;
  onLaunch?: () => void;
};

export default function SessionCard({
  title,
  subtitle,
  description,
  installed,
  onInstall,
  onLaunch,
}: Props) {
  const [installing, setInstalling] = useState(false);

  function handleInstall() {
    if (!onInstall) return;
    setInstalling(true);

    // allow animation to breathe before install resolves
    setTimeout(() => {
      onInstall();
      setInstalling(false);
    }, 850);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        relative
        rounded-2xl
        border border-white/10
        bg-gradient-to-b from-white/[0.06] to-white/[0.02]
        backdrop-blur-xl
        p-6
        overflow-hidden
        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
      "
    >
      {/* INSTALLED GLOW */}
      {installed && (
        <motion.div
          aria-hidden
          className="
            pointer-events-none
            absolute inset-0
            rounded-2xl
            bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.18),transparent_60%)]
          "
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [0.98, 1.01, 0.98] }}
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
        />
      )}

      {/* HEADER */}
      <div className="relative mb-4">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
          {subtitle}
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="relative mb-6 text-sm leading-relaxed text-white/70">
        {description}
      </p>

      {/* ACTION */}
      <div className="relative flex items-center justify-between">
        <span className="text-xs text-white/40">by RK3</span>

        <AnimatePresence mode="wait">
          {installed ? (
            <motion.button
              key="launch"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={onLaunch}
              className="
                rounded-full
                px-4 py-1.5
                text-xs font-medium
                border border-emerald-400/40
                text-emerald-300
                hover:bg-emerald-400/10
                transition
              "
            >
              Launch
            </motion.button>
          ) : installing ? (
            <motion.div
              key="installing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="
                rounded-full
                px-4 py-1.5
                text-xs font-medium
                bg-white/90 text-black
              "
            >
              Installing…
            </motion.div>
          ) : (
            <motion.button
              key="install"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleInstall}
              className="
                rounded-full
                px-4 py-1.5
                text-xs font-medium
                bg-white text-black
                hover:bg-white/90
                transition
              "
            >
              Install
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* TAG */}
      {installed && (
        <div className="pointer-events-none absolute top-3 right-3">
          <span className="text-[10px] tracking-widest text-emerald-400/80">
            INSTALLED
          </span>
        </div>
      )}
    <motion.div
  layoutId={`session-card-${title}`}
  whileHover={{ y: -4 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  className="relative rounded-2xl ..."
>
  );
}
