import { loadRecentSessions } from "@/lib/recentSessions";
import { loadFavorites } from "@/lib/favoriteSessions";

function escapeCSV(value: unknown): string {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

export function exportHealingHistoryCSV() {
  if (typeof window === "undefined") return;

  try {
    const recent = loadRecentSessions();
    const favorites = loadFavorites();

    const rows: string[][] = [
      ["Type", "Title", "Minutes", "Date"],

      ...recent.map(r => [
        "Recent",
        r.title,
        r.minutes,
        new Date(r.timestamp).toLocaleString(),
      ]),

      ...favorites.map(f => [
        "Pinned",
        f.title,
        f.minutes,
        new Date(f.pinnedAt).toLocaleString(),
      ]),
    ];

    const csv = rows
      .map(row => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "rk3-healing-history.csv";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.warn("Failed to export healing history CSV", err);
  }
}
