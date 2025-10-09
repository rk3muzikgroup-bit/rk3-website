"use client";

export default function TrackPlayer({ track }: { track: any }) {
  return (
    <div className="p-4 bg-black/40 rounded-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">{track.title}</h2>
      <p className="text-sm mb-3 opacity-70">{track.artist}</p>

      <audio controls className="w-full" src={track.full}></audio>
    </div>
  );
}
