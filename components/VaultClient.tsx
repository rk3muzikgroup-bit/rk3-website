"use client";

import { useState } from "react";
import ShieldLock from "./ShieldLock";
import CirclePortals from "./CirclePortals";

export type Portal = {
  key: string;
  label: string;
  img: string;
  video?: string;
  href?: string;
};

export default function VaultClient({ portals }: { portals: Portal[] }) {
  const [stage, setStage] = useState<"shield" | "portals">("shield");

  if (stage === "shield") {
    return <ShieldLock onUnlocked={() => setStage("portals")} />;
  }

  return <CirclePortals portals={portals} onExit={() => setStage("shield")} />;
}
