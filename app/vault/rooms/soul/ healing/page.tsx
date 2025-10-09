import { soulVibes } from "@/data/tracks/vibes";
import TrackPlayer from "@/components/TrackPlayer";

export default function SoulHealingPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">🌌 Soul Healing Vibes</h1>
      <p className="opacity-70 mb-8">Gentle tones and vibes for emotional restoration.</p>
      <div className="grid gap-8">
        {soulVibes.map((vibe, i) => (
          <TrackPlayer key={i} track={vibe} />
        ))}
      </div>
    </div>
  );
}
