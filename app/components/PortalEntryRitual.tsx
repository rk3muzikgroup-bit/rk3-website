"use client";

import { useEffect, useRef, useState } from "react";
import { loadMemory, saveMemory } from "@/lib/memory";

type Props = {
  portal?: {
    id?: string;
    invocation?: string;
  };
  duration?: number; // ms
};

export default function PortalEntryRitual({
  portal,
  duration = 3500,
}: Props) {
  const [visible, setVisible] = useState(false);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!portal?.id || !portal.invocation) return;
    if (hasRunRef.current) return;

    // Respect reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      saveMemory({ lastPortal: portal.id });
      hasRunRef.current = true;
      return;
    }

    const memory = loadMemory();

    // Skip if already visited
    if (memory.lastPortal === portal.id) {
      hasRunRef.current = true;
      return;
    }

    hasRunRef.current = true;
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      saveMemory({ lastPortal: portal.id });
    }, duration);

    return () => clearTimeout(timer);
  }, [portal, duration]);

  if (!visible || !portal?.invocation) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="text-center text-white/80 text-lg tracking-wide animate-fade-in-out">
        {portal.invocation}
      </div>
    </div>
  );
}
