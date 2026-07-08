"use client";

type Props = {
  session: {
    title: string;
    audioSrc?: string;
  };

  // audio state injected from parent
  isPlaying?: boolean;
  currentTitle?: string;

  // audio actions injected from parent
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
};

export default function SessionModal({
  session,
  isPlaying,
  currentTitle,
  onPlay,
  onPause,
  onStop,
}: Props) {
  const isThisSession = currentTitle === session.title;

  return (
    <div>
      <h2>{session.title}</h2>

      <div style={{ display: "flex", gap: 8 }}>
        {onPlay && (
          <button onClick={onPlay}>
            ▶
          </button>
        )}

        {onPause && (
          <button onClick={onPause} disabled={!isThisSession || !isPlaying}>
            ⏸
          </button>
        )}

        {onStop && (
          <button onClick={onStop}>
            ⏹
          </button>
        )}
      </div>

      <div style={{ marginTop: 8, opacity: 0.7 }}>
        {isThisSession
          ? isPlaying
            ? "Playing"
            : "Paused"
          : "Not active"}
      </div>
    </div>
  );
}
