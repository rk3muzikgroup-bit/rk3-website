"use client";

import { PortalLayout, PortalButton } from "@/components/portal";
import { useRouter } from "next/navigation";

export default function SoulPortal() {
  const router = useRouter();

  return (
    <PortalLayout title="Soul Portal" bg="from-indigo-900 via-purple-900 to-black">
      <div className="flex flex-col gap-6 items-center">
        <PortalButton onClick={() => router.push("/ride/soul")}>
          🎶 Enter Soul Ride
        </PortalButton>

        <PortalButton onClick={() => router.push("/living-room")}>
          🛋️ Enter Living Room
        </PortalButton>
      </div>
    </PortalLayout>
  );
}
