"use client";

import { useState } from "react";

import { SOUL_SESSIONS } from "@/lib/soulSessions.data";
import { useInstalledSessions } from "@/hooks/useInstalledSessions";
import SoulPreviewModal from "@/components/soul/SoulPreviewModal";

type Session = (typeof SOUL_SESSIONS)[number];

export default function SessionGrid() {
  const { installed, install } = useInstalledSessions();

  // 🔑 Intent-driven state
  const [activeId, setActiveId] = useState<string | null>(null);

  const active: Session | null =
    SOUL_SESSIONS.find((s) => s.id === activeId) ?? null;

  function isInstalled(id: string) {
    return installed.some((s) => s.id === id);
  }

  function handleInstall(session: Session) {
    if (isInstalled(session.id)) return;

    install({
      id: session.id,
      title: session.title,
      realm: "soul",
    });

    setActiveId(null);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SOUL_SESSIONS.map((session) => {
          const alreadyInstalled = isInstalled(session.id);

          return (
            <div
              key={session.id}
              onClick={() => setActiveId(session.id)} // 🔑 intent trigger
              className="
                group
                cursor-pointer
                rounded-2xl
                border border-white/10
                bg-gradient-to-b from-white/[0.06] to-white/[0.02]
                backdrop-blur-xl
                p-6
                transition-all
                duration-300
                hover:-translate-y-[2px]
                hover:border-white/20
              "
            >
              {/* HEADER */}
              <div className="mb-4">
                <h3 className="text-lg font-medium tracking-tight">
                  {session.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/40">
                  Soul Session • RK3
                </p>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm leading-relaxed text-white/70">
                {session.description}
              </p>

              {/* ACTION */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-white/40">
                  Inner Alignment
                </span>

                {alreadyInstalled ? (
                  <span className="text-xs font-medium text-emerald-400">
                    ✓ Installed
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card intent
                      handleInstall(session);
                    }}
                    className="
                      rounded-full
                      px-4
                      py-1.5
                      text-xs
                      font-medium
                      bg-white
                      text-black
                      hover:bg-white/90
                      transition
                    "
                  >
                    Install
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ CRITICAL: only mount modal when active */}
      {active && (
        <SoulPreviewModal
          open={true}
          onClose={() => setActiveId(null)}
          title={active.title}
          subtitle="by RK3"
          description={active.description}
          audioFile={active.audioFile}
          onInstall={
            !isInstalled(active.id)
              ? () => handleInstall(active)
              : undefined
          }
        />
      )}
    </>
  );
}
