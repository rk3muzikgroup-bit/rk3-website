import Link from "next/link";
import { audiobooksCatalog } from "../../data/audiobooks/audiobooksCatalog";

export default function AudiobooksPortalPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.16),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_52%)]" />

        <div className="absolute inset-0 opacity-[0.04] mix-blend-screen">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)",
              backgroundSize: "120px 120px",
            }}
          />
        </div>

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-200/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        {/* HERO */}
        <section className="max-w-4xl">
          <div className="inline-flex rounded-full border border-teal-200/15 bg-teal-200/[0.05] px-5 py-2 text-[10px] uppercase tracking-[0.32em] text-teal-100/60">
            RKS3 Audiobook Wing
          </div>

          <h1 className="mt-8 text-5xl font-thin leading-tight tracking-[0.08em] text-white md:text-7xl">
            Audiobook Archive
          </h1>

          <p className="mt-8 max-w-3xl text-sm leading-8 text-white/58 md:text-base">
            Living knowledge chambers designed for listening, reflection,
            immersion, and frequency-aligned learning inside the RKS3 ecosystem.
          </p>
        </section>

        {/* STATS */}
        <section className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/32">
              Total Chambers
            </p>

            <h2 className="mt-4 text-4xl font-thin text-white">
              {audiobooksCatalog.length}
            </h2>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/32">
              Living Book Linked
            </p>

            <h2 className="mt-4 text-4xl font-thin text-teal-100">
              {
                audiobooksCatalog.filter((book) => book.relatedBookId).length
              }
            </h2>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/32">
              Audio Ready
            </p>

            <h2 className="mt-4 text-4xl font-thin text-cyan-100">
              {
                audiobooksCatalog.filter(
                  (book) => book.status === "Audio Ready"
                ).length
              }
            </h2>
          </div>
        </section>

        {/* AUDIOBOOK GRID */}
        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {audiobooksCatalog.map((book) => (
            <Link
              key={book.id}
              href={`/portal/audiobooks/${book.id}`}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:border-teal-200/30 hover:bg-teal-200/[0.04]"
            >
              {/* GLOW */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.14),transparent_60%)]" />
              </div>

              <div className="relative z-10">
                {/* TOP TAGS */}
                <div className="flex flex-wrap gap-2">
                  <div className="rounded-full border border-teal-200/15 bg-teal-200/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-teal-100/60">
                    {book.category}
                  </div>

                  <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/35">
                    {book.status}
                  </div>
                </div>

                {/* TITLE */}
                <div className="mt-8">
                  <h2 className="text-3xl font-light leading-tight tracking-[0.04em] text-white/92">
                    {book.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/52">
                    Narrator • {book.narrator}
                  </p>
                </div>

                {/* META */}
                <div className="mt-8 space-y-3">
                  <div className="rounded-[1rem] border border-white/10 bg-black/25 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">
                      Runtime
                    </p>

                    <p className="mt-2 text-sm text-white/60">
                      {book.runtime}
                    </p>
                  </div>

                  {book.frequency ? (
                    <div className="rounded-[1rem] border border-teal-200/15 bg-teal-200/[0.05] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-teal-100/40">
                        Frequency
                      </p>

                      <p className="mt-2 text-sm leading-6 text-teal-100/70">
                        {book.frequency}
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* LIVING BOOK */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-white/32">
                    {book.relatedBookId
                      ? "Living Book Linked"
                      : "Standalone Chamber"}
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/45 transition group-hover:border-teal-200/30 group-hover:text-teal-100/75">
                    Enter Chamber →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}