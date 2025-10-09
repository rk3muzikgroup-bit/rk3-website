"use client";

import { useEffect } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function RealmAura({ config }: { config?: any }) {
  const playSound = usePlaySound();

  useEffect(() => {
    if (!config) return;
    playSound("vault/door_hum", { loop: true, volume: 0.3 });
  }, [config, playSound]);

  return (
    <main className="relative w-screen h-screen text-white overflow-hidden flex items-center justify-center">
      {/* Portal Background */}
      {config?.bg && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${config.bg})` }}
        />
      )}
      <h1 className="text-3xl font-bold z-10">🌌 Realm Aura Active</h1>
    </main>
  );
}
