"use client";

import { useState } from "react";
import CockpitEQ from "@/components/cockpit/CockpitEQ";

export default function CockpitDashboard() {
  const [showEQ, setShowEQ] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowEQ((s) => !s)}
        className="absolute top-4 right-4 px-3 py-2 rounded-lg bg-emerald-600 text-white"
      >
        {showEQ ? "Close EQ" : "Open EQ"}
      </button>

      {showEQ && <CockpitEQ />}
    </div>
  );
}
