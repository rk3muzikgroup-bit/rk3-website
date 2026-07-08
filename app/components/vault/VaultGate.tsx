"use client";

import { vaultPolicy } from "@/lib/vault/vaultPolicy";
import type { VaultAccess } from "@/lib/vault/vaultTypes";

type Props = {
  access: VaultAccess;
  children: React.ReactNode;
};

export default function VaultGate({ access, children }: Props) {
  const allowed = vaultPolicy.canAccess(access);

  if (!allowed) {
    return (
      <div className="flex items-center justify-center p-6 text-muted">
        Access denied
      </div>
    );
  }

  return <>{children}</>;
}
