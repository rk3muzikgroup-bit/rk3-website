import { soulTracks } from "@/data/tracks/soul";
import TrackPlayer from "@/components/TrackPlayer";

export default function SoulTracksPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">🎶 Soul Tracks</h1>
      <div className="grid gap-8">
        {soulTracks.map((track, i) => (
          <TrackPlayer key={i} track={track} />
        ))}
      </div>
    </div>
  );
}
