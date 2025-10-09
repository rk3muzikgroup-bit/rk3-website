import { streetTracks } from "@/data/tracks/street";
import TrackPlayer from "@/components/TrackPlayer";

export default function StreetBeatsPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">🚦 Street Beats</h1>
      <div className="grid gap-8">
        {streetTracks.map((track, i) => (
          <TrackPlayer key={i} track={track} />
        ))}
      </div>
    </div>
  );
}
