"use client";

import { useEffect, useState } from "react";
import { usePlaySound } from "@/hooks/usePlaySound"; // ✅ named import

export default function VaultClosing() {
  const playClosing = usePlaySound("vault/closing_long");
  const playDoor = usePlaySound("vault/door_close");
  const playHum = usePlaySound("vault/door_hum");

  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      playClosing();
      setTimeout(() => playDoor(), 12000);
      setTimeout(() => playHum(), 13000);
    }
  }, [started, playClosing, playDoor, playHum]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">Vault Closing...</h1>
    </div>
  );
}
