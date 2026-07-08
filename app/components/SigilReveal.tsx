"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rk3_sigil_complete";

export default function SigilReveal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const completed =
      localStorage.getItem(STORAGE_KEY) === "true";

    if (!completed) setVisible(true);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    window.addEventListener("keydown", onKey);
    return () =>
      window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  function close() {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  return (
    <div
      className="fixed inset-0 z-[94] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={close}
    >
      <button
        onClick={close}
        className="group relative w-[280px] h-[280px] rounded-full border border-white/10 bg-black/40 glow-border overflow-hidden"
        aria-label="Enter Command Base"
      >
        {/* Glow field */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow-soft),transparent_60%)] opacity-80" />

        {/* Core sigil */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl tracking-[0.3em] uppercase glow-strong">
              RK3
            </div>
            <div className="mt-2 text-xs tracking-[0.35em] uppercase opacity-70">
              Command Base
            </div>
          </div>
        </div>

        {/* Hover sheen */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5" />
      </button>
    </div>
  );
}
