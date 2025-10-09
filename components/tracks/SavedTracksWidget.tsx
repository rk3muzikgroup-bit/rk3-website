"use client";

import { useNowPlaying } from "@/context/NowPlayingContext";

export default function SavedTracksWidget() {
  const { savedTracks, playTrack, removeTrack } = useNowPlaying();

  return (
    <div className="p-4 bg-black/50 rounded-lg border border-yellow-500/40">
      <h2 className="text-lg font-semibold text-yellow-300 mb-3">⭐ Saved Tracks</h2>

      {savedTracks.length > 0 ? (
        <ul className="space-y-3">
          {savedTracks.map((track, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-black/40 rounded-lg border border-yellow-400/20"
            >
              {/* Track Info */}
              <div className="text-sm text-emerald-200 font-medium">
                {track.title} — {track.artist}
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => playTrack(track)}
                  className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-xs"
                >
                  ▶️ Play
                </button>
                <button
                  onClick={() => removeTrack(track)}
                  className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-xs"
                >
                  ❌ Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">No saved tracks yet...</p>
      )}
    </div>
  );
}
