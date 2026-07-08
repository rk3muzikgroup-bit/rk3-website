export default function ObservatoryPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-[160px]">
      {/* HEADER */}
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold">
          The Observatory
        </h1>
        <p className="text-white/70 leading-relaxed max-w-3xl">
          This section exists to document research context, historical references,
          and experimental observations related to sound, frequency, and perception.
        </p>
      </header>

      {/* WHAT THIS IS */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-white/40">
          What This Is
        </h2>
        <ul className="text-sm text-white/70 space-y-2 list-disc list-inside">
          <li>Peer-reviewed references where available</li>
          <li>Experimental and theoretical frameworks clearly labeled</li>
          <li>Historical and cultural context</li>
          <li>Clear separation between evidence and experience</li>
        </ul>
      </section>

      {/* WHAT THIS IS NOT */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-white/40">
          What This Is Not
        </h2>
        <ul className="text-sm text-white/70 space-y-2 list-disc list-inside">
          <li>Medical advice or diagnosis</li>
          <li>Claims of cure or treatment</li>
          <li>Persuasion or belief enforcement</li>
          <li>Replacement for professional care</li>
        </ul>
      </section>

      {/* BADGE LEGEND */}
      <section className="rounded-xl border border-white/10 bg-white/[0.04] p-6 space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-white/40">
          Research Honesty Badges
        </h2>
        <p className="text-sm text-white/70">
          All frequencies across the platform are labeled using a research-context
          system designed to prevent overstatement and misinformation.
        </p>
        <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
          <li>Research-Supported</li>
          <li>Experimental</li>
          <li>Theoretical</li>
          <li>Experiential</li>
        </ul>
      </section>
    </div>
  );
}

