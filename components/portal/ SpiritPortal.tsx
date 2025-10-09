"use client";

import { PortalLayout, PortalButton } from "@/components/portal";
import { useRouter } from "next/navigation";

export default function SpiritPortal() {
  const router = useRouter();

  return (
    <PortalLayout title="Spirit Portal" bg="from-emerald-800 via-teal-900 to-black">
      <div className="flex flex-col gap-6 items-center">
        <PortalButton onClick={() => router.push("/ride/spirit")}>
          🌌 Enter Spirit Ride
        </PortalButton>

        <PortalButton onClick={() => router.push("/living-room")}>
          🛋️ Enter Living Room
        </PortalButton>
      </div>
    </PortalLayout>
  );
}
