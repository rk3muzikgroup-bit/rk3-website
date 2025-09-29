"use client";

import { useEffect, useRef, useState } from "react";

type Chapter = { t: string; title: string };
type Tape = { slug: string; title: string; audio: string; cover: string; chapters?: Chapter[] };
type Manifest = { tapes: Tape[] };

function parseTime(t: string): number {
  // supports "mm:ss" or "hh:mm:ss"
  const parts = t.split(":").map(n => parseInt(n, 10));
  if (parts.length === 2) return (parts[0] * 60 + parts[1]) || 0;
  if (parts.length === 3) return (parts[0] * 3600 + parts[1] * 60 + parts[2]) || 0;
  return 0;
}

export default function MixtapePlayer() {
  const [data, setData] = useState<Manifest | null>(null);
  const [current, setCurrent] = useState<Tape | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/mixtapes/manifest.json").then(r => r.json()).then((m: Manifest) => {
      setData(m);
      setCurrent(m.tapes[0] || null);
    }).catch(() => setData({ tapes: [] }));
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !current) return;
    a.src = current.audio;
    a.play().catch(() => {});
  }, [current]);

  if (!data) {
    return <div className="text-white/70">Loading…</div>;
  }
  if (!data.tapes.length) {
    return <div className="text-white/70">No mixtapes yet.</div>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_340px] gap-6">
      {/* Player */}
      <div className="rounded-2xl border border-white/12 bg-white/5 p-5">
        <div className="flex items-center gap-4">
          {current?.cover && (
            <img src={current.cover} alt="" className="h-20 w-20 rounded-xl object-cover border border-white/10" />
          )}
          <div>
            <div className="text-lg font-semibold">{current?.title || "—"}</div>
            <div className="text-white/70 text-sm">Exclusive RK3 mix</div>
          </div>
        </div>

        <audio ref={audioRef} controls className="mt-4 w-full">
          <track kind="captions" />
        </audio>

        {/* chapters */}
        {current?.chapters?.length ? (
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-2">
            {current.chapters.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  const a = audioRef.current;
                  if (!a) return;
                  a.currentTime = parseTime(c.t);
                  a.play().catch(()=>{});
                }}
                className="rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-left hover:bg-white/10"
                title={c.title}
              >
                <div className="text-xs text-white/70">{c.t}</div>
                <div className="text-sm">{c.title}</div>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* List */}
      <div className="rounded-2xl border border-white/12 bg-white/5 p-5 max-h-[60vh] overflow-auto">
        <div className="text-sm font-semibold mb-3">All Mixtapes</div>
        <div className="grid gap-3">
          {data.tapes.map((t) => (
            <button
              key={t.slug}
              onClick={() => setCurrent(t)}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left hover:bg-white/10 ${
                current?.slug === t.slug ? "border-white/40 bg-white/10" : "border-white/12 bg-white/5"
              }`}
            >
              <img src={t.cover} alt="" className="h-12 w-12 rounded-md object-cover border border-white/10" />
              <div>
                <div className="text-sm font-medium">{t.title}</div>
                <div className="text-xs text-white/70">RK3 • Exclusive</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
