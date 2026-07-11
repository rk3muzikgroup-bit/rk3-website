import Link from "next/link";
import type { Route } from "next";

type Portal = {
  title: string;
  description: string;
  href: string;
  color: string;
  system: string;
  lane: "Street" | "Soul" | "Spirit" | "Unified";
  status?: string;
};
const portals: Portal[] = [
  {
    title: "Frequency Portal",
    description: "Sound, breath, resonance, and nervous-system alignment.",
    href: "/portal/frequencies",
    color: "rgba(56,189,248,1)",
    system: "SONIC FIELD",
    lane: "Spirit",
  },
  {
    title: "Audiobooks",
    description:
      "Narrated books, readable companion text, initiations, manuals, and archive transmissions.",
    href: "/portal/audiobooks",
    color: "rgba(45,212,191,1)",
    system: "VOICE CODEX",
    lane: "Spirit",
  },
  {
    title: "Museum Portal",
    description: "Memory, history, preserved knowledge, and cultural archives.",
    href: "/portal/museum",
    color: "rgba(168,85,247,1)",
    system: "ARCHIVE FIELD",
    lane: "Soul",
  },
  {
    title: "Healing Chamber",
    description: "Restore, regulate, breathe, reset, and return to center.",
    href: "/portal/healing",
    color: "rgba(134,239,172,1)",
    system: "RESTORE FIELD",
    lane: "Soul",
  },
  {
    title: "Creator Portal",
    description: "Tools, journals, discipline systems, and creator development.",
    href: "/portal/creator",
    color: "rgba(244,114,182,1)",
    system: "CREATOR FIELD",
    lane: "Street",
  },
  {
    title: "Consciousness",
    description: "Awareness, perception, inner growth, and expanded study.",
    href: "/portal/consciousness",
    color: "rgba(129,140,248,1)",
    system: "MIND FIELD",
    lane: "Spirit",
  },
  {
    title: "Quantum Law",
    description: "Principles, patterns, universal laws, and reality frameworks.",
    href: "/portal/quantum-law",
    color: "rgba(34,211,238,1)",
    system: "LAW FIELD",
    lane: "Spirit",
  },
  {
    title: "Cosmos",
    description: "Planets, space, star systems, and cosmic orientation.",
    href: "/portal/cosmos",
    color: "rgba(96,165,250,1)",
    system: "COSMIC FIELD",
    lane: "Spirit",
  },
    {
    title: "Music Portal",
    description:
      "HDWAV-sourced RKS3 records, review metadata, track rooms, and the living sound catalog.",
    href: "/portal/music",
    color: "rgba(251,113,133,1)",
    system: "HDWAV MUSIC FIELD",
    lane: "Soul",
    status: "30 RECORDS ACTIVE",
  },
  {
    title: "Vault",
    description: "Protected memory, master archives, legacy files, and deep storage.",
    href: "/portal/vault",
    color: "rgba(250,204,21,1)",
    system: "VAULT FIELD",
    lane: "Unified",
  },
  {
    title: "Awareness Plans",
    description:
      "Founding QC Window, Tester Family access, and the RKS3 awareness path.",
    href: "/join",
    color: "rgba(16,185,129,1)",
    system: "AWARENESS ACCESS",
    lane: "Unified",
  },
  {
    title: "Nexus",
    description:
      "The first-entry truth chamber for orientation, initiation, and the RKS3 ceremony flow.",
    href: "/nexus",
    color: "rgba(255,255,255,1)",
    system: "TRUTH CHAMBER",
    lane: "Unified",
  },
];

export default function PortalGrid() {
  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl md:p-7">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/32">
            Portal Wings
          </p>

          <h2 className="mt-3 text-3xl font-thin tracking-[0.06em] text-white md:text-4xl">
            Choose Your Next Chamber
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-white/45">
          Each portal carries a different atmosphere, purpose, and emotional
          function inside the larger RKS3 world.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portals.map((portal) => (
          <Link
            key={portal.title}
            href={portal.href as Route}
            prefetch={false}
            className="group block"
          >
            <article className="relative min-h-[250px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/35 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.015] hover:border-white/20">
              {/* PANEL WASH */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_22%,transparent_80%,rgba(255,255,255,0.02))]" />

              {/* COLOR ATMOSPHERE */}
              <div
                className="pointer-events-none absolute inset-0 opacity-75"
                style={{
                  background: `radial-gradient(circle at 50% -10%, ${portal.color.replace(
                    "1)",
                    "0.18)"
                  )} 0%, transparent 45%)`,
                }}
              />

              {/* TOP ENERGY RAIL */}
              <div
                className="pointer-events-none absolute inset-x-5 top-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${portal.color} 50%, transparent 100%)`,
                  boxShadow: `0 0 16px ${portal.color}, 0 0 34px ${portal.color}`,
                }}
              />

              {/* CORNER HUD MARKS */}
              <div
                className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t opacity-70"
                style={{ borderColor: portal.color.replace("1)", "0.26)") }}
              />

              <div
                className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r opacity-60"
                style={{ borderColor: portal.color.replace("1)", "0.2)") }}
              />

              {/* GRID TEXTURE */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:36px_36px]" />

              <div className="relative z-10 flex min-h-[205px] flex-col">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                      {portal.system}
                    </p>

                    <p className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/28">
                      {portal.lane} Lane
                    </p>
                  </div>

                                      {portal.status ? (
                      <p
                        className="w-fit rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
                        style={{
                          borderColor: portal.color.replace("1)", "0.28)"),
                          background: portal.color.replace("1)", "0.07)"),
                          color: portal.color.replace("1)", "0.78)"),
                        }}
                      >
                        {portal.status}
                      </p>
                    ) : null}

                  <div
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background: portal.color,
                      boxShadow: `0 0 10px ${portal.color}, 0 0 22px ${portal.color}`,
                    }}
                  />
                </div>

                <h3 className="max-w-[16rem] text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-white/94">
                  {portal.title}
                </h3>

                <p className="mt-4 max-w-[19rem] text-sm leading-7 text-white/62">
                  {portal.description}
                </p>

                <div className="mt-auto pt-8">
                  <div className="mb-3 h-px w-full bg-gradient-to-r from-white/0 via-white/12 to-white/0" />

                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/34 transition duration-300 group-hover:text-white/68">
                    <span>Enter Portal</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}