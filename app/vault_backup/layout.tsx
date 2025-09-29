import type { ReactNode } from "react";
import WatermarkOverlay from "@/components/WatermarkOverlay";
import { useUser } from "@/hooks/useUser"; // your auth hook (swap with your real one)

export default function VaultLayout({ children }: { children: ReactNode }) {
  const user = useUser(); // returns { email, id, tier } etc.

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Page Content */}
      {children}

      {/* Global Vault Watermark */}
      <WatermarkOverlay userId={user?.email ?? "VAULT-MEMBER"} />
    </div>
  );
}

}
