import Link from "next/link";

export default function OrientationPage() {
  return (
    <main className="rk3-clean relative min-h-screen overflow-hidden bg-black text-white">
      {/* ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.08),transparent_34%)]" />

        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.03] blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.38)_56%,rgba(0,0,0,0.92)_100%)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        {/* HEADER */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.46em] text-white/40">
              RKS3.COM
            </p>

            <h1 className="mt-3 text-4xl font-light tracking-[0.1em] text-white sm:text-6xl">
              ORIENTATION
            </h1>
          </div>

          <div className="rounded-full border border-cyan-200/15 bg-cyan-200/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-cyan-100/55">
            Awareness Is The Path
          </div>
        </div>

        {/* HERO */}
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-9">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-cyan-100/65">
              Orientation Chamber
            </span>

            <span className="rounded-full border border-emerald-200/20 bg-emerald-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-emerald-100/65">
              First Signal
            </span>

            <span className="rounded-full border border-amber-200/20 bg-amber-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-amber-100/65">
              World Within Worlds
            </span>
          </div>

          <h2 className="mt-7 max-w-5xl text-3xl font-thin leading-tight tracking-[0.04em] text-white sm:text-5xl">
            Before entering the system, understand the intention behind it.
          </h2>

          <p className="mt-6 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
            RKS3.COM is not built around noise, addiction, fear, or endless
            distraction. This system was designed as a living awareness
            environment for reflection, sound, study, creativity, focus, and
            alignment.
          </p>

          <p className="mt-5 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
            Move through the worlds slowly. Explore intentionally. Listen
            deeply. Some rooms are for grounding. Some are for study. Some are
            for stillness. Some are for expansion.
          </p>

          <p className="mt-5 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
            There is no race through this system. Awareness is the path.
          </p>
        </section>

        {/* CORE PRINCIPLES */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-cyan-200/15 bg-cyan-200/[0.045] p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
              Awareness
            </p>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Observe what strengthens the mind, body, emotions, focus, and
              spirit.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-emerald-200/15 bg-emerald-200/[0.045] p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-100/45">
              Intention
            </p>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Move intentionally through the rooms instead of endlessly consuming.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-amber-200/15 bg-amber-200/[0.045] p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-amber-100/45">
              Alignment
            </p>

            <p className="mt-4 text-sm leading-7 text-white/60">
              The goal is balance, reflection, recovery, clarity, and growth.
            </p>
          </div>
        </section>

        {/* CONTINUE */}
        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                Next Phase
              </p>

              <h3 className="mt-3 text-2xl font-thin tracking-[0.04em] text-white">
                Continue to Initiation
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
                The next chamber begins the ceremonial entry process and opens
                the threshold into the transport system.
              </p>
            </div>

            <Link
              href="/portal/initiation"
              prefetch={false}
              className="inline-flex rounded-full border border-cyan-200/25 bg-cyan-200/[0.08] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-cyan-100/70 transition hover:border-cyan-200/45 hover:text-cyan-100"
            >
              Continue To Initiation →
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <div className="mt-auto pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/30">
              Street • Soul • Spirit
            </p>

            <p className="text-[10px] uppercase tracking-[0.28em] text-white/25">
              RKS3.COM • A World Within Worlds
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}