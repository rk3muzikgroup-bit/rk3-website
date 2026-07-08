"use client";

import { useEffect, useState } from "react";

type CaptionLine = {
  text: string;
  duration?: number;
};

type Props = {
  line: CaptionLine | null;
  realm?: "default" | "healing" | "vault";
};

export default function VoiceCaption({
  line,
  realm = "default",
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!line) {
      setVisible(false);
      return;
    }

    setVisible(true);

    if (line.duration) {
      const t = setTimeout(() => {
        setVisible(false);
      }, line.duration);

      return () => clearTimeout(t);
    }
  }, [line]);

  if (!line) return null;

  const base =
    "fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-xl text-sm tracking-wide backdrop-blur-md border transition-all duration-500 ease-out";

  const realmClass =
    realm === "healing"
      ? "bg-emerald-500/20 text-emerald-100 border-emerald-400/30"
      : realm === "vault"
      ? "bg-indigo-500/20 text-indigo-100 border-indigo-400/30"
      : "bg-black/60 text-white border-white/20";

  return (
    <div
      key={line.text} // 🔑 ensures clean animation per line
      role="status"
      aria-live="polite"
      className={[
        base,
        realmClass,
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2",
      ].join(" ")}
    >
      {line.text}
    </div>
  );
}
