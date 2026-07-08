"use client";

import Link from "next/link";
import type { FrequencyPreset } from "@/lib/frequencies";

type Props = {
  preset: FrequencyPreset;
};

export default function FrequencyCard({ preset }: Props) {
  return (
    <Link
      href={`/portal/frequencies/${preset.id}`}
      className="
        block
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-5
        py-4
        transition
        hover:border-cyan-400/40
        hover:bg-white/10
      "
    >
      <div className="space-y-1">
        <h3 className="text-sm font-medium tracking-wide">
          {preset.label}
        </h3>

        <div className="flex items-center gap-3 text-xs text-white/50">
          <span>{preset.hz} Hz</span>

          {preset.chakra && (
            <span className="uppercase tracking-widest">
              {preset.chakra.replace("_", " ")}
            </span>
          )}
        </div>

        <div className="pt-2 text-[11px] text-white/40">
          Experimental · Non-medical · Awareness-based
        </div>
      </div>
    </Link>
  );
}
