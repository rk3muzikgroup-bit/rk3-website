"use client";

import { useState } from "react";
import { playUISound } from "@/hooks/useUISound";
import { useInstalledSessions } from "@/hooks/useInstalledSessions";
import { useSession } from "@/context/SessionContext";
import SoulPreviewModal from "@/components/soul/SoulPreviewModal";

type Card = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};

const CARDS: Card[] = [
  {
    id: "heart-reset-coherence",
    title: "Heart Reset (Coherence)",
    subtitle: "by RK3",
    description:
      "A gentle heart-centered recalibration session designed to restore emotional balance and internal coherence.",
  },
  {
    id: "7-day-heart-reset",
    title: "7-Day Heart Reset",
    subtitle: "by RK3",
    description:
      "A daily heart-alignment practice guiding you through emotional clarity, regulation, and grounded presence.",
  },
];

export default function SoulMarketplace() {
  const { installed, install } = useInstalledSessions();
  const session = useSession();

  // 🔑 Intent-driven modal state
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = CARDS.find((c) => c.id === activeId) ?? null;

  function isInstalled(id: string) {
    return installed.some((s) => s.id === id);
  }

  function handleInstall(card: Card) {
    if (isInstalled(card.id)) return;

    // 🔔 UI feedback
    playUISound("/sounds/ui/install-soft.mp3", 0.18, 1500);

    // 💾 Persist install
    install({
      id: card.id,
      title: card.title,
      realm: "soul",
    });

    // 🎧 Explicit session control (correct layer)
    session.load({
      id: card.id,
      title: card.title,
      realm: "soul",
    });

    session.play();

    // 🧭 Close modal
    setActiveId(null);
  }

  return (
    <>
      <section className="w-full max-w-6xl mx-auto px-6 mt-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Marketplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {CARDS.map((card) => {
            const installedAlready = isInstalled(card.id);

            return (
              <div
                key={card.id}
                onClick={() => setActiveId(card.id)} // intent only
                className="
                  cursor-pointer
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.02]
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:border-white/20
                "
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">
                      {card.title}
                    </h3>

                    <p className="mt-1 text-xs text-white/50">
                      {card.subtitle}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    {installedAlready ? (
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
                        ✓ Installed
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent card intent
                          handleInstall(card);
                        }}
                        className="
                          text-sm
                          font-medium
                          px-5
                          py-2
                          rounded-full
                          border border-white/30
                          hover:border-white/60
                          transition
                        "
                      >
                        Install Session
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🔮 Modal = UI only (no audio logic inside) */}
      {active && (
        <SoulPreviewModal
          open
          onClose={() => setActiveId(null)}
          title={active.title}
          subtitle={active.subtitle}
          description={active.description}
        />
      )}
    </>
  );
}
