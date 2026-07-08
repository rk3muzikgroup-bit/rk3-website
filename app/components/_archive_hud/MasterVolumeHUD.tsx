"use client";

type Props = {
  volume: number;
  onChange: (v: number) => void;
};

export default function MasterVolumeHUD({ volume, onChange }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 9999,
        background: "red",
        padding: "12px",
      }}
    >
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
