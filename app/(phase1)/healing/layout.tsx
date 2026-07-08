import type { ReactNode } from "react";
import { PORTALS } from "@/lib/portals";

import PortalEntryRitual from "@/components/PortalEntryRitual";
import HealingClientProvider from "./HealingClientProvider";
import HealingClientUI from "./HealingClientUI";

type Props = {
  children: ReactNode;
};

export default function HealingLayout({ children }: Props) {
  const portal = PORTALS.healing;

  return (
    <HealingClientProvider>
      {/* 🔮 ENTRY RITUAL */}
      <PortalEntryRitual portal={portal} />

      {/* ⏯ CLIENT UI */}
      <HealingClientUI />

      {/* 🌱 PAGE CONTENT */}
      {children}
    </HealingClientProvider>
  );
}
