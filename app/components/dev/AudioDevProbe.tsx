"use client";

import { useAudioPlayer } from "@/context/AudioPlayerContext";

export default function AudioDevProbe() {
  const { stop, setVolume, volume, isPlaying } = useAudioPlayer();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        right: 8,
        opacity: 0.5,
        zIndex: 9999,
      }}
    >
      <button onClick={stop}>STOP</button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />

      <span style={{ marginLeft: 8 }}>
        {isPlaying ? "playing" : "paused"}
      </span>
    </div>
  );
}
