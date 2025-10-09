"use client";

import { useNowPlaying } from "@/context/NowPlayingContext";

export default function VaultWidget() {
  const { savedTracks, playTrack } = useNowPlaying();

  // Example curated vault content (can later pull from /data/vault.ts)
  const vaultDrops = [
    { title: "Street Ride", artist: "RK3", type: "ride", locked: false },
    { title: "Soul Journey", artist: "RK3", type: "ride", locked: false },
    { title: "Spirit Flight", artist: "RK3", type: "ride", locked: true },
    { title: "Mixtape Vol. 1", artist: "RK3", type: "mixtape", locked: true },
  ];

  return (
    <div className="space-y-6">
      {/* Saved Tracks Section */}
      <div className="p-4 bg-black/50 rounded-lg border border-yellow-500/40">
        <h2 className="text-lg font-semibold text-yellow-300 mb-3">
          ⭐ Your Saved Tracks
        </h2>

        {savedTracks.length > 0 ? (
          <ul className="space-y-2">
            {savedTracks.map((track, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 bg-black/40 rounded-md border border-yellow-400/20"
              >
                <span className="text-sm text-emerald-200">
                  {track.title} — {track.artist}
                </span>
                <button
                  onClick={() => playTrack(track)}
                  className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-xs"
                >
                  ▶️ Play
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No saved tracks yet...</p>
        )}
      </div>

      {/* Vault Drops */}
      <div className="p-4 bg-black/50 rounded-lg border border-emerald-500/40">
        <h2 className="text-lg font-semibold text-emerald-300 mb-3">
          🚀 Vault Drops
        </h2>

        <ul className="space-y-2">
          {vaultDrops.map((drop, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-2 bg-black/40 rounded-md border border-emerald-400/20"
            >
              <span className="text-sm text-cyan-200">
                {drop.title} — {drop.artist} ({drop.type})
              </span>
              {drop.locked ? (
                <span className="text-red-400 text-xs">🔒 Locked</span>
              ) : (
                <button
                  onClick={() =>
                    alert(`Accessing ${drop.title}... (hook this later)`)
                  }
                  className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-xs"
                >
                  🔓 Open
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
