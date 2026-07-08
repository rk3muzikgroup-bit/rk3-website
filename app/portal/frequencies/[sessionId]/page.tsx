import { notFound } from "next/navigation";

import { FREQUENCY_VAULT } from "@/lib/frequencies";
import { FREQUENCY_CONTENT } from "@/lib/frequencyContent";
import type { FrequencyPreset } from "@/lib/frequencies";

import BadgeRow from "@/components/frequencies/BadgeRow";

type Props = {
  params: {
    sessionId: string;
  };
};

export default function FrequencySessionPage({ params }: Props) {
  let preset: FrequencyPreset | undefined;

  for (const group of FREQUENCY_VAULT) {
    const match = group.presets.find(p => p.id === params.sessionId);
    if (match) {
      preset = match;
      break;
    }
  }

  if (!preset) notFound();

  const content = FREQUENCY_CONTENT[preset.id];

  return (
    <main className="relative mx-auto max-w-[880px] px-6 py-14 space-y-12">
      {/* ───────── THRESHOLD ───────── */}
      <header className="space-y-3">
        <h1 className="text-2xl font-medium tracking-tight">
          {preset.label}
        </h1>

        <div className="flex items-center gap-3 text-sm text-white/60">
          <span>{preset.hz} Hz</span>

          {preset.chakra && (
            <span className="uppercase tracking-widest">
              {preset.chakra.replace("_", " ")}
            </span>
          )}
        </div>

        {content?.primaryUse && (
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            {content.primaryUse}
          </p>
        )}
      </header>

      {/* ───────── HONESTY BADGES ───────── */}
      {content?.badges && <BadgeRow badges={content.badges} />}

      {/* ───────── CONTENT ───────── */}
      <section className="space-y-10">
        {content?.sections?.map(section => (
          <div key={section.heading} className="space-y-3">
            <h2 className="text-sm uppercase tracking-wider text-cyan-300/70">
              {section.heading}
            </h2>

            <p className="text-sm leading-relaxed text-white/80">
              {section.body}
            </p>
          </div>
        ))}

        {!content && (
          <div className="text-sm text-white/50">
            Detailed context for this frequency will be added soon.
          </div>
        )}
      </section>
    </main>
  );
}
