"use client";

import type { VaultAccess } from "@/lib/vault/vaultTypes";

export default function VaultBadge({ access }: { access: VaultAccess }) {
  const label =
    access === "public"
      ? "Public"
      : access === "member"
      ? "Members"
      : "Private";

  return (
    <span className="text-xs rounded border px-2 py-0.5">
      {label}
    </span>
  );
}
