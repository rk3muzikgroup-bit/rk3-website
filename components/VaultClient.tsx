// components/VaultClient.tsx
"use client";

import { useState } from "react";
import ShieldLock from "./ShieldLock";

type Portal = { key: "street" | "soul" | "spirit"; label: string; img: string };

const PORTALS: Portal[] = [
  { key: "street", label: "Street", img: "/images/portals/street.png" },
  { key: "soul",   label: "Soul",   img: "/images/portals/soul.png"   },
  { key: "spirit", label: "Spirit", img: "/images/portals/spirit.png" },
];

export default function VaultClient() {
  const [stage, setStage] = useState<"shield" | "portals">("shield");
  if (stage === "shield") return <ShieldLock onUnlocked={() => setStage("portals")} />;

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-black/50 px-5 py-4 backdrop-blur">
        <h1 className="text-lg font-semibold">Choose Your Portal • Street • Soul • Spirit</h1>
        <button
          onClick={() => setStage("shield")}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
        >
          Exit
        </button>
      </div>

      <section className="px-5 py-10">
        <div className="mx-auto w-[min(900px,92vw)] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          {PORTALS.map((p, i) => (
            <a
              key={p.key}
              href={p.img} // opens the PNG directly (your preferred flow)
              className="flex items-center gap-5 p-4 transition hover:bg-white/10"
              style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/15 bg-black/40">
                <img src={p.img} alt={p.label} className="h-full w-full object-cover" draggable={false} />
              </div>
              <div className="flex-1">
                <div className="text-base font-medium">{p.label}</div>
                <div className="text-xs text-white/70">Tap to open {p.label} portal art</div>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs">Open</div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
