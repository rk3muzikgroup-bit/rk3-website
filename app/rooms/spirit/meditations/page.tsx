import { spiritTracks } from "@/data/tracks/spirit";
import TrackPlayer from "@/components/TrackPlayer";

export default function SpiritMeditationsPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">🌌 Spirit Meditations</h1>
      <div className="grid gap-8">
        {spiritTracks.map((track, i) => (
          <TrackPlayer key={i} track={track} />
        ))}
      </div>
    </div>
  );
}
