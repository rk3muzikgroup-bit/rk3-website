import Link from "next/link";

export default function InitiationPage() {
  return (
    <main className="rk3-clean relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.10),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.10),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/[0.04] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.38)_56%,rgba(0,0,0,0.94)_100%)]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.46em] text-white/40">
              RKS3.COM
            </p>

            <h1 className="mt-3 text-4xl font-light tracking-[0.1em] text-white sm:text-6xl">
              INITIATION
            </h1>
          </div>

          <div className="rounded-full border border-purple-200/15 bg-purple-200/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-purple-100/55">
            Threshold Chamber
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-purple-200/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-9">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-200/45 to-transparent" />

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-purple-200/20 bg-purple-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-purple-100/65">
              Ceremony Gate
            </span>

            <span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-cyan-100/65">
              Vault Access
            </span>

            <span className="rounded-full border border-amber-200/20 bg-amber-200/[0.08] px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-amber-100/65">
              Transport Ready
            </span>
          </div>

          <h2 className="mt-7 max-w-5xl text-3xl font-thin leading-tight tracking-[0.04em] text-white sm:text-5xl">
            This is the threshold before the ride.
          </h2>

          <p className="mt-6 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
            Orientation prepared the mind. Initiation opens the entry point.
            From here, the user moves from explanation into experience.
          </p>

          <p className="mt-5 max-w-4xl text-sm leading-8 text-white/60 md:text-base">
            The next action begins the vault access sequence. Access granted,
            the door opens, the ship powers up, and the user is carried into
            the Living Room.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-purple-200/15 bg-purple-200/[0.045] p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-purple-100/45">
              Permission
            </p>
            <p className="mt-4 text-sm leading-7 text-white/60">
              The user chooses to enter the system with awareness and intention.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-cyan-200/15 bg-cyan-200/[0.045] p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
              Access
            </p>
            <p className="mt-4 text-sm leading-7 text-white/60">
              The vault sequence becomes the symbolic authorization into RKS3.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-amber-200/15 bg-amber-200/[0.045] p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-amber-100/45">
              Transport
            </p>
            <p className="mt-4 text-sm leading-7 text-white/60">
              The ride carries the user from the threshold into the Living Room.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                Vault Sequence
              </p>

              <h3 className="mt-3 text-2xl font-thin tracking-[0.04em] text-white">
                Begin access. Start the ride.
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
                This button moves into the spaceship/vault transition page.
                Later we wire your access granted, denied, vault door, engine,
                cockpit, fire, and ride FX into that sequence.
              </p>
            </div>

            <Link
              href="/portal/ride"
              prefetch={false}
              className="inline-flex rounded-full border border-amber-200/25 bg-amber-200/[0.08] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-amber-100/70 transition hover:border-amber-200/45 hover:text-amber-100"
            >
              Begin Vault Access →
            </Link>
          </div>
        </section>

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