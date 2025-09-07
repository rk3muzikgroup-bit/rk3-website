// app/portal/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PortalDoorButton } from "../../components/RK3FuturisticUI";
import VideoBackground from "../../components/VideoBackground";
import { sendAnalytics } from "../../lib/analytics"; // remove this line if using Option B

/* ----- inline background chooser ----- */
type BGMap = Record<string, string>;
const BG: BGMap = {
  meteorite15: "/videos/bg/meteorite_15s.mp4",
  rk3Cruise: "/videos/window/rk3_ship_cruise.mp4",
  nebula30: "/videos/bg/nebula_30s.mp4",
};
const BG_POSTERS: Partial<BGMap> = {
  meteorite15: "/videos/bg/meteorite_15s.jpg",
  rk3Cruise: "/videos/window/rk3_ship_cruise.jpg",
  nebula30: "/videos/bg/nebula_30s.jpg",
};
const SESSION_KEY = "rk3_portal_bg";
const POOL = ["meteorite15", "rk3Cruise", "nebula30"] as const;
const WEIGHT: Record<(typeof POOL)[number], number> = { meteorite15: 3, rk3Cruise: 3, nebula30: 2 };
const pickWeighted = (keys: readonly string[]) => {
  const bag: string[] = []; keys.forEach(k => { for (let i = 0; i < (WEIGHT as any)[k] || 0; i++) bag.push(k); });
  return bag[Math.floor(Math.random() * bag.length)] || keys[0];
};
function choosePortalBG(override?: string | null) {
  if (override && BG[override]) { try { sessionStorage.setItem(SESSION_KEY, override); } catch {} return { key: override, src: BG[override], poster: BG_POSTERS[override] }; }
  try { const saved = sessionStorage.getItem(SESSION_KEY); if (saved && BG[saved]) return { key: saved, src: BG[saved], poster: BG_POSTERS[saved] }; } catch {}
  const k = pickWeighted(POOL as unknown as string[]); try { sessionStorage.setItem(SESSION_KEY, k); } catch {}
  return { key: k, src: BG[k], poster: BG_POSTERS[k] };
}
/* ------------------------------------ */

export default function PortalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bg, setBg] = useState<{ key: string; src: string; poster?: string } | null>(null);

  useEffect(() => {
    const override = searchParams?.get("bg");
    const sel = choosePortalBG(override);
    setBg(sel);
    try { sendAnalytics?.("portal_view", { bg: sel.key }); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative min-h-svh bg-black text-white overflow-hidden">
      {bg && <VideoBackground src={bg.src} poster={bg.poster} overlay gradient preload="metadata" />}

      <section className="relative max-w-6xl mx-auto px-6 py-16">
        <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="text-3xl md:text-5xl font-bold mb-8 text-center">
          Choose Your Journey
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center">
          <PortalDoorButton title="STREET" subtitle="Grit • Neon • Pace"
            imageSrc="/images/street.png"  accent="street" onClick={() => router.push("/street")} />
          <PortalDoorButton title="SOUL" subtitle="Warm • Gold • Flow"
            imageSrc="/images/soul.png"    accent="soul"   onClick={() => router.push("/soul")} />
          <PortalDoorButton title="SPIRIT" subtitle="Indigo • Ether • Elevate"
            imageSrc="/images/spirit.png"  accent="spirit" onClick={() => router.push("/spirit")} />
        </div>

        <div className="mt-10 flex items-center justify-center">
          <button
            onClick={() => { localStorage.removeItem("rk3_seen_intro"); router.replace("/enter"); }}
            className="rounded-xl bg-white/5 border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
          >
            Watch the Intro Again
          </button>
        </div>
      </section>
    </main>
  );
}
