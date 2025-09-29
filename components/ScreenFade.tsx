"use client";

import { useEffect, useState } from "react";

type Props = {
  trigger: any;        // key to watch
  duration?: number;   // ms
  color?: string;      // tailwind bg class
  mode?: "fade" | "pulse" | "doublePulse" | "strobe" | "cosmic";
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
    let t: NodeJS.Timeout;

    if (mode === "doublePulse") {
      // two flashes
      setTimeout(() => setActive(false), duration / 3);
      setTimeout(() => setActive(true), duration / 2);
      t = setTimeout(() => setActive(false), duration);
    } else if (mode === "strobe") {
      // rapid flashes
      let count = 0;
      const interval = setInterval(() => {
        setActive((prev) => !prev);
        count++;
        if (count > 5) clearInterval(interval);
      }, 120);
      t = setTimeout(() => setActive(false), duration);
    } else {
      // fade, pulse, cosmic
      t = setTimeout(() => setActive(false), duration);
    }

    return () => clearTimeout(t);
  }, [trigger, duration, mode]);

  // styles
  const base = `pointer-events-none fixed inset-0 ${color} transition-opacity`;

  if (mode === "fade") {
    return <div className={`${base} ${active ? "opacity-100" : "opacity-0"} duration-[${duration}ms]`} />;
  }

  if (mode === "pulse" || mode === "doublePulse" || mode === "strobe") {
    return <div className={`${base} ${active ? "opacity-100" : "opacity-0"} duration-300`} />;
  }

  if (mode === "cosmic") {
    return (
      <div
        className={`pointer-events-none fixed inset-0 transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        } duration-[${duration}ms]`}
        style={{
          background: "radial-gradient(circle at center, #6d28d9, #111827)",
        }}
      />
    );
  }

  return null;
}
