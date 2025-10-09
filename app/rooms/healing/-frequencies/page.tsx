"use client";

import { useRouter } from "next/navigation";
import { PortalButton } from "@/components/portal";

export default function HealingFrequenciesRoom() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8">🧘 Healing Frequencies Room</h1>
      <p className="text-lg max-w-2xl text-center mb-12">
        This is the first room of the museum. Here we’ll host healing sounds,
        chakra tones, and frequency-based visuals to align mind, body, and soul.
      </p>

      {/* Back to Living Room */}
      <PortalButton onClick={() => router.push("/living-room")}>
        ⬅️ Back to Living Room
      </PortalButton>
    </main>
  );
}
