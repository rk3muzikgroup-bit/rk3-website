"use client";

import Orbs from "@/components/Orbs";
import Ethers from "@/components/Ethers";

export default function OrbsTestPage() {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <Ethers count={40} />
      <Orbs count={7} />

      {/* Simple headline so we see something */}
      <h1 className="text-3xl md:text-5xl font-bold relative z-10 text-emerald-300 drop-shadow-lg">
        ✨ Orbs + Ethers Test
      </h1>
    </main>
  );
}
