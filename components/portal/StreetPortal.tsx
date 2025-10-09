"use client";

import { PortalLayout, PortalButton } from "@/components/portal";
import { useRouter } from "next/navigation";

export default function StreetPortal() {
  const router = useRouter();

  return (
    <PortalLayout title="Street Portal" bg="from-gray-900 via-black to-gray-950">
      <div className="flex flex-col gap-6 items-center">
        <PortalButton onClick={() => router.push("/ride/street")}>
          🚦 Enter Street Ride
        </PortalButton>

        <PortalButton onClick={() => router.push("/living-room")}>
          🛋️ Enter Living Room
        </PortalButton>
      </div>
    </PortalLayout>
  );
}
