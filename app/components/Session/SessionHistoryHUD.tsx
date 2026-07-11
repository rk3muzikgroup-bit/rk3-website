"use client";

import { useSessionHistory } from "@/hooks/useSessionHistory";

type Props = {
  onSelect: (payload: any) => void;
};

export default function SessionHistoryHUD({ onSelect }: Props) {
  const { items, toggleFavorite } = useSessionHistory();

  if (!items.length) return null;

  return (
    <div className="fixed right-6 bottom-24 z-40 w-80 rounded-xl border border-white/10 bg-black/85 backdrop-blur-xl p-4">
      <div className="mb-3 text-xs uppercase tracking-widest opacity-70">
        Session History
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded border border-white/10 px-3 py-2 hover:bg-white/5 transition"
          >
            {/* SESSION SELECT */}
            <button
              onClick={() => onSelect(item.payload)}
              className="text-left flex-1"
              aria-label={`Resume ${item.title}`}
            >
              <div className="text-sm font-medium">
                {item.title}
              </div>

              <div className="text-[10px] opacity-60">
                {Math.round(item.durationMs / 60000)} min ·{" "}
                {item.stepsCount} steps
              </div>
            </button>

            {/* FAVORITE */}
            <button
              onClick={e => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
              className="ml-2 text-lg leading-none opacity-80 hover:opacity-100 transition"
              aria-label={
                item.favorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              {item.favorite ? "⭐" : "☆"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
