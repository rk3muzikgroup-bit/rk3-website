// app/portal/living-room/page.tsx

import Link from "next/link";
import PortalGrid from "@/components/living-room/PortalGrid";

export default function LivingRoomPage() {
  return (
    <main className="rk3-clean relative min-h-screen overflow-x-hidden bg-black px-6 py-10 text-white">
      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.16),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300/[0.035] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.045] mix-blend-screen">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)",
              backgroundSize: "120px 120px",
            }}
          />
        </div>

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-200/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-200/35 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/portal/nexus"
            prefetch={false}
            className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-white/45 transition hover:border-white/25 hover:text-white/75"
          >
            ← World Map
          </Link>

          <Link
            href="/portal/awareness-plans"
            prefetch={false}
            className="inline-flex rounded-full border border-emerald-200/20 bg-emerald-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-emerald-100/65 transition hover:border-emerald-200/40 hover:text-emerald-100"
          >
            Awareness Plans →
          </Link>

          <Link
            href="/portal/frequencies"
            prefetch={false}
            className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-cyan-100/65 transition hover:border-cyan-200/40 hover:text-cyan-100"
          >
            Frequency Vault →
          </Link>
        </div>
            
                      <Link
            href="/portal/music"
            prefetch={false}
            className="inline-flex rounded-full border border-rose-200/20 bg-rose-200/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-rose-100/65 transition hover:border-rose-200/40 hover:text-rose-100"
          >
            Music Portal →
          </Link>

        {/* CENTER CHAMBER */}
        <section className="mb-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl">
          <div className="border-b border-white/10 bg-black/25 p-8 md:p-12">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-teal-200/20 bg-teal-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-teal-100/65">
                Vault Hub
              </span>

              <span className="rounded-full border border-purple-200/20 bg-purple-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-purple-100/65">
                Center Point
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-white/40">
                Personal Journey
              </span>
            </div>

            <h1 className="mt-8 max-w-4xl text-4xl font-thin leading-tight tracking-[0.08em] text-white md:text-6xl">
              The Living Room
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 md:text-lg">
              Welcome back to the center point. This is where the world begins
              to remember your path — what you study, what you hear, where you
              pause, and where you return.
            </p>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
            <div className="rounded-[1.5rem] border border-teal-200/15 bg-teal-200/[0.05] p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-teal-100/45">
                Room State
              </p>

              <p className="mt-3 text-sm leading-7 text-white/58">
                Calm command center active. Choose your next world with
                presence.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-purple-200/15 bg-purple-200/[0.05] p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-purple-100/45">
                Resume Layer
              </p>

              <p className="mt-3 text-sm leading-7 text-white/58">
                Continue reading, listening, frequency work, or study sessions
                as memory expands.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/32">
                Access
              </p>

              <p className="mt-3 text-sm leading-7 text-white/58">
                Living Room access granted. Portal wings are ready.
              </p>
            </div>
          </div>
        </section>

        <PortalGrid />
      </div>
    </main>
  );
}