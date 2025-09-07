"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const ACCENT: Record<string, { glow: string; tint: string }> = {
  "self-love": { glow: "rgba(242,181,70,0.28)", tint: "from-amber-300/10" },   // gold/rose
  healing:     { glow: "rgba(56,224,205,0.26)", tint: "from-teal-300/10" },    // teal
  legacy:      { glow: "rgba(255,228,92,0.22)", tint: "from-yellow-300/10" },  // gold
  default:     { glow: "rgba(180,200,255,0.22)", tint: "from-white/10" },
};

export default function PreviewLockedPage() {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  // pick which shield to show via ?shield=self-love|healing|legacy (defaults to self-love)
  const shieldKey = params.get("shield") || "self-love";
  const next = params.get("next") || "/portal";
  const accent = ACCENT[shieldKey] || ACCENT.default;

  const shieldSrc = useMemo(() => {
    // you can also pass a custom ?src=/vault/legacy/shield.png if you want
    const custom = params.get("src");
    return custom || `/vault/${shieldKey}/shield.png`;
  }, [params, shieldKey]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pass, next }),
    });
    if (res.ok) {
      router.push(next);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data?.message || "Wrong pass. Try again.");
    }
  };

  return (
    <div className="relative min-h-svh bg-black text-white flex items-center justify-center p-6 overflow-hidden">
      {/* BACKGROUND LAYERS */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${accent.tint} via-transparent to-black/70`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_85%,rgba(255,255,255,0.06),transparent_60%)]" />
      {/* Shield glow blob */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[30%] rounded-full blur-3xl"
        style={{ width: 800, height: 800, background: accent.glow }}
      />
      {/* Shield image (centered, subtle pulse) */}
      <motion.img
        key={shieldSrc}
        src={shieldSrc}
        alt="RK3 Shield"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] w-[min(82vw,820px)] h-auto opacity-30"
        initial={{ scale: 0.98, opacity: 0.22 }}
        animate={{ scale: [0.98, 1.0, 0.98], opacity: [0.24, 0.32, 0.24] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        draggable={false}
      />

      {/* LOCK CARD */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">RK3 Preview</h1>
        <p className="text-white/70 mt-1">Enter the access code to continue.</p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="password"
            className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:border-white/40"
            placeholder="Access code"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        {err && <p className="text-sm text-red-400">{err}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-3"
          >
            Unlock
          </button>
        </form>

        {/* Quick shield switchers (optional) */}
        <div className="mt-4 flex gap-2 text-xs text-white/70">
          <a href="/preview-locked?shield=self-love" className="hover:text-white underline">Self-Love</a>
          <span>•</span>
          <a href="/preview-locked?shield=healing" className="hover:text-white underline">Healing</a>
          <span>•</span>
          <a href="/preview-locked?shield=legacy" className="hover:text-white underline">Legacy</a>
        </div>
      </div>
    </div>
  );
}
