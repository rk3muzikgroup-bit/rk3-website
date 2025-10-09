"use client";

import { spokenTracks } from "@/data/tracks/spoken";
import TrackPlayer from "@/components/TrackPlayer";

export default function TestTracksPage() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎵 Test Tracks</h1>
      
      <div className="grid gap-6">
        {spokenTracks.map((track) => (
          <TrackPlayer key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
