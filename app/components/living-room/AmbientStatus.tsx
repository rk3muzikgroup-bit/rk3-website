"use client";

import { useEffect, useState } from "react";
import {
  markAmbientPresence,
  readAmbientPresence,
} from "@/lib/ambientPresence";

export default function AmbientStatus() {
  const [state, setState] = useState<"quiet" | "shared">("quiet");

  useEffect(() => {
    markAmbientPresence();
    setState(readAmbientPresence());

    const i = setInterval(() => {
      setState(readAmbientPresence());
    }, 30_000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="text-xs text-white/40 tracking-wide">
      {state === "shared"
        ? "A few others are quietly present"
        : "The room is calm and open"}
    </div>
  );
}
