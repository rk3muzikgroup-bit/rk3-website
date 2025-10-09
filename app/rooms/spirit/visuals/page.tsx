"use client";

import { useVisuals } from "@/utils/useVisuals";

export default function SpiritVisualsPage() {
  const data = useVisuals();

  if (!data) return <div className="p-8 text-white">Loading visuals...</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">🌌 Spirit Visuals</h1>
      <div className="grid gap-6">
        {data.spirit.visuals.map((vid: any, i: number) => (
          <video
            key={i}
            src={vid.src}
            className="w-full rounded-2xl shadow-lg"
            autoPlay
            loop
            muted
          />
        ))}
      </div>
    </div>
  );
}
