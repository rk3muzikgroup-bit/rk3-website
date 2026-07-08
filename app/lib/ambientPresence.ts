const KEY = "rk3:ambient:lastSeen";

/**
 * Marks quiet presence in the Living Room
 */
export function markAmbientPresence() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, String(Date.now()));
}

/**
 * Determines if space feels "active"
 */
export function readAmbientPresence(): "quiet" | "shared" {
  if (typeof window === "undefined") return "quiet";

  const raw = localStorage.getItem(KEY);
  if (!raw) return "quiet";

  const last = Number(raw);
  const delta = Date.now() - last;

  // 5-minute shared window
  return delta < 5 * 60 * 1000 ? "shared" : "quiet";
}
