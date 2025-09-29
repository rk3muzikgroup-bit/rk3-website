// utils/getBarColor.ts
export function getBarColor(track: string | null, i: number): string {
  if (!track) return "bg-emerald-400";

  if (track.includes("Street")) return i % 2 === 0 ? "bg-red-500" : "bg-orange-500";
  if (track.includes("Soul")) return i % 2 === 0 ? "bg-indigo-400" : "bg-pink-400";
  if (track.includes("Spirit")) return i % 2 === 0 ? "bg-emerald-400" : "bg-cyan-400";

  if (track.includes("Yin")) return "bg-indigo-400";
  if (track.includes("Yang")) return "bg-yellow-400";
  if (track.includes("Unified")) return i % 2 === 0 ? "bg-indigo-400" : "bg-yellow-400";

  return "bg-emerald-400";
}
