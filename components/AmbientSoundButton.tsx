"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientSoundButton({ src = "/sounds/entry-water.mp3", loop = true }:{
  src?: string; loop?: boolean;
}) {
  const aRef = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = new Audio();
    aRef.current = a;
    a.src = src;
    a.loop = loop;
    a.preload = "auto";
    a.crossOrigin = "anonymous";
    a.volume = 1;
    return () => { try { a.pause(); } catch {} };
  }, [src, loop]);

  const toggle = async () => {
    const a = aRef.current;
    if (!a) return;
    try {
      if (!on) { await a.play(); setOn(true); }
      else { a.pause(); setOn(false); }
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className={`rounded-lg border px-3 py-1.5 text-xs md:text-sm ${on ? "bg-white/15 border-white/30" : "bg-white/10 border-white/15"} hover:bg-white/15`}
      title={on ? "Pause ambient" : "Play ambient"}
    >
      {on ? "🔊 Ambient On" : "🔈 Ambient Off"}
    </button>
  );
}
