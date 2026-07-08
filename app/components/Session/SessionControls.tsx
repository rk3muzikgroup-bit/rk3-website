"use client";

type EngineState = "idle" | "playing" | "paused" | "ended";

type Props = {
  state: EngineState;
  elapsedMs: number;
  session?: {
    id?: string;
    title?: string;
  };
  onPlay: () => void;
  onPause: () => void;
};

export default function SessionControls({
  state,
  elapsedMs,
  session,
  onPlay,
  onPause,
}: Props) {
  const isPlaying = state === "playing";
  const isIdleLike = state === "idle" || state === "ended";

  function handleShareMoment() {
    if (typeof window === "undefined") return;
    if (elapsedMs <= 0) return;

    try {
      const seconds = Math.floor(elapsedMs / 1000);
      const url = new URL(window.location.href);

      // normalize params
      url.searchParams.delete("t");
      url.searchParams.delete("session");

      if (session?.id) {
        url.searchParams.set("session", session.id);
      }

      url.searchParams.set("t", String(seconds));

      navigator.clipboard.writeText(url.toString()).catch(() => {
        // clipboard may be blocked — fail silently
      });
    } catch {
      // never throw from UI
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* ▶️ / ⏸ PLAY / PAUSE */}
      {!isIdleLike && (
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="btn"
          aria-label={isPlaying ? "Pause session" : "Play session"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      )}

      {/* 🔗 SHARE MOMENT */}
      <button
        onClick={handleShareMoment}
        disabled={elapsedMs <= 0}
        className="btn-secondary disabled:opacity-40 disabled:pointer-events-none"
        aria-label="Share this moment"
        title="Share this moment"
      >
        Share Moment
      </button>
    </div>
  );
}
