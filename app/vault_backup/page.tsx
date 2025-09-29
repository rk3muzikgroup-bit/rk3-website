"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";
import { HUDVolume } from "@/components/HUDVolume";
import PortalGrid from "@/components/PortalGrid";

export default function VaultPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          🌌 Welcome to the Vault
        </h1>
        <PortalGrid />
      </div>
    </main>
  );
}

export default function VaultLanding() {
  const router = useRouter();
  const playSound = usePlaySound();
  const [status, setStatus] = useState<"checking" | "locked" | "unlocked" | "denied">("checking");
  const [loading, setLoading] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  // fetch membership status on mount
  useEffect(() => {
    playSound("vault/door_hum", { loop: true, volume: 0.25 });
    fetch("/api/user/status")
      .then((r) => r.json())
      .then((j) => {
        // expected response: { member: boolean, tier: "free"|"silver"|"gold"|"platinum", allowed: boolean }
        if (j && j.allowed) setStatus("unlocked");
        else setStatus("locked");
      })
      .catch(() => setStatus("locked"));
  }, [playSound]);

  // user clicks unlock -> server validates membership & returns allowed or denied
  const handleUnlock = async () => {
    setUnlocking(true);
    try {
      const res = await fetch("/api/vault/unlock", { method: "POST" });
      const json = await res.json();
      if (json?.allowed) {
        setStatus("unlocked");
        // stop hum, play open sequence
        playSound("vault/door_close");
        setTimeout(() => {
          router.push("/vault/portals"); // now open
        }, 1600);
      } else {
        setStatus("denied");
        playSound("vault/denied_blast");
        setTimeout(() => setStatus("locked"), 2500);
      }
    } catch (e) {
      setStatus("denied");
      setTimeout(() => setStatus("locked"), 2500);
    } finally {
      setUnlocking(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* subtle vault visual */}
      <video
        src="/videos/vault/vault_bg01.mp4"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 space-y-6">
        <HUDVolume />

        {status === "checking" && <div className="text-white text-xl">Checking access...</div>}

        {status === "locked" && (
          <>
            <div className="text-white text-2xl">Vault is locked.</div>
            <button
              onClick={handleUnlock}
              disabled={unlocking}
              className="mt-4 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition"
            >
              {unlocking ? "Unlocking..." : "Attempt Unlock"}
            </button>
          </>
        )}

        {status === "unlocked" && (
          <>
            <div className="text-white text-2xl">Access granted. Opening vault...</div>
            <div className="text-sm text-gray-300 mt-2">Redirecting…</div>
          </>
        )}

        {status === "denied" && (
          <div className="text-red-400 text-xl font-bold animate-pulse">ACCESS DENIED</div>
        )}
      </div>
    </div>
  );
}
