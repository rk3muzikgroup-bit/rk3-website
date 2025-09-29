import type { ReactNode } from "react";
import WatermarkOverlay from "@/components/WatermarkOverlay";
import { useUser } from "@/hooks/useUser";

export default function RideLayout({ children }: { children: ReactNode }) {
  const user = useUser();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Page Content */}
      {children}

      {/* Global Vault Watermark */}
      <WatermarkOverlay userId={user?.email ?? "VAULT-MEMBER"} />
    </div>
  );
}
