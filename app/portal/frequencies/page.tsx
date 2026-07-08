import { FREQUENCY_VAULT } from "@/lib/frequencies";
import FrequencyCard from "@/components/frequencies/FrequencyCard";

export default function FrequenciesPage() {
  return (
    <main className="mx-auto max-w-[960px] px-6 py-14 space-y-14">
      {/* ───────── HEADER ───────── */}
      <header className="space-y-2">
        <h1 className="text-2xl font-medium tracking-tight">
          Frequency Vault
        </h1>

        <p className="text-sm text-white/60 max-w-xl leading-relaxed">
          A private library of sound-based sessions designed for regulation,
          restoration, and inner alignment.
        </p>
      </header>

      {/* ───────── GROUPS ───────── */}
      {FREQUENCY_VAULT.map(group => (
        <section key={group.id} className="space-y-6">
          {/* Group header */}
          <div className="space-y-1">
            <h2 className="text-lg font-medium tracking-tight">
              {group.title}
            </h2>

            <p className="text-sm text-white/50 max-w-xl">
              {group.description}
            </p>
          </div>

          {/* Presets */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.presets.map(preset => (
              <FrequencyCard
                key={preset.id}
                preset={preset}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
