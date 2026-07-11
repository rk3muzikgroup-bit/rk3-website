import Link from "next/link";

type PortalShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  accent?: string;
  children?: React.ReactNode;
};

export default function PortalShell({
  title,
  eyebrow,
  description,
  accent = "rgba(255,255,255,0.72)",
  children,
}: PortalShellProps) {
  return (
    <main className="rk3-clean relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at top, ${accent}22, transparent 34%),
            radial-gradient(circle at bottom left, ${accent}14, transparent 34%),
            radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.44) 54%, rgba(0,0,0,0.94) 100%)
          `,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-15" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.46em] text-white/45">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-light tracking-[0.08em] text-white sm:text-5xl">
              {title}
            </h1>
          </div>

          <Link
            href="/nexus"
            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white/45 transition hover:border-white/25 hover:text-white/75"
          >
            Nexus
          </Link>
        </div>

        <div className="max-w-3xl">
          <p className="text-sm leading-7 text-white/55">{description}</p>
        </div>

        <div className="mt-10 flex-1">{children}</div>

        <div className="mt-10 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.34em] text-white/30">
          RKS3.COM • Street • Soul • Spirit
        </div>
      </section>
    </main>
  );
}