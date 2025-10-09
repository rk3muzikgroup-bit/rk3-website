import { streetPoems } from "@/data/tracks/poetry";
import TrackPlayer from "@/components/TrackPlayer";

export default function StreetPoetryPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">📜 Street Poetry</h1>
      <div className="grid gap-8">
        {streetPoems.map((poem, i) => (
          <TrackPlayer key={i} track={poem} />
        ))}
      </div>
    </div>
  );
}
