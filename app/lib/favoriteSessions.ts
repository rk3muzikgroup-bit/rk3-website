export type FavoriteSession = {
  id: string;
  title: string;
  minutes: 3 | 7 | 11;
  pinnedAt: number;
};

const KEY = "rks3:favoriteSessions";
const MAX_FAVORITES = 50; // safety cap for future scale

function safeParse(raw: string | null): FavoriteSession[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadFavorites(): FavoriteSession[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(KEY));
}

function saveFavorites(list: FavoriteSession[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX_FAVORITES)));
  } catch {
    // storage may be blocked / full — fail silently
  }
}

export function toggleFavorite(entry: FavoriteSession) {
  if (typeof window === "undefined") return;

  const current = loadFavorites();

  const exists = current.some(
    f => f.id === entry.id && f.minutes === entry.minutes
  );

  const next = exists
    ? current.filter(
        f => !(f.id === entry.id && f.minutes === entry.minutes)
      )
    : [{ ...entry, pinnedAt: entry.pinnedAt ?? Date.now() }, ...current];

  saveFavorites(next);
}

export function isFavorite(
  id: string,
  minutes: 3 | 7 | 11
): boolean {
  if (typeof window === "undefined") return false;
  return loadFavorites().some(
    f => f.id === id && f.minutes === minutes
  );
}
