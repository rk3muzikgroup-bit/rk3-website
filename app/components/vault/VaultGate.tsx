"use client";

import type { ReactNode } from "react";
import { vaultPolicy } from "@/lib/vault/vaultPolicy";
import type { VaultContext } from "@/lib/vault/vaultPolicy";
import type { VaultAccess } from "@/lib/vault/vaultTypes";

type Props = {
  access: VaultAccess;
  children: ReactNode;
  context?: Partial<VaultContext>;
};

export default function VaultGate({ access, children, context }: Props) {
  const allowed = vaultPolicy(access, {
    isOwner: context?.isOwner ?? true,
    isMember: context?.isMember ?? false,
  });

  if (!allowed) {
    return (
      <div className="flex items-center justify-center p-6 text-muted">
        Access denied
      </div>
    );
  }

  return <>{children}</>;
}
