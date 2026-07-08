"use client";

import { ReactNode } from "react";

export default function HealingClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Healing is intentionally visual-only right now.
  // Session + audio logic will be reintroduced later.
  return <>{children}</>;
}
