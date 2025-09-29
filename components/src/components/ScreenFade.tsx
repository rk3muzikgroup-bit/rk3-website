"use client";

import { useEffect, useState } from "react";

type Props = {
  trigger: any;        // value to watch
  duration?: number;   // ms
  color?: string;      // bg color
  mode?: "fade" | "pulse";
};

export default function ScreenFade({
  trigger,
  duration = 1000,
  color = "bg-black",
  mode = "fade",
}: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), duration);
    return () => clearTimeout(t);
  }, [trigger, duration]);

  // 🎬 Tailwind classes differ by mode
  const base = `pointer-events-none fixed inset-0 ${color} transition-opacity`;
  const fadeStyle = `${active ? "opacity-100" : "opacity-0"} duration-[${duration}ms]`;
  const pulseStyle = `${active ? "opacity-100" : "opacity-0"} duration-300`;

  return <div className={`${base} ${mode === "pulse" ? pulseStyle : fadeStyle}`} />;
}
