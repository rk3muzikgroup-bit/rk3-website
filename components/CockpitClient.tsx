// components/CockpitClient.tsx
"use client";

import { useRouter } from "next/navigation";

export default function CockpitClient() {
  const router = useRouter();
  return (
    <main className="relative min-h-[92vh] md:min-h-screen bg-black text-white overflow-hidden">
      <img
        src="/images/cockpit.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <section className="relative mx-auto w-[min(1100px,92vw)] py-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">Choose Your Path</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { key: "street", title: "STREET", sub: "Grit • Neon • Pace", img: "/images/portals/street.png", href: "/ride/street" },
            { key: "soul",   title: "SOUL",   sub: "Warm • Gold • Flow", img: "/images/portals/soul.png",   href: "/ride/soul"   },
            { key: "spirit", title: "SPIRIT", sub: "Indigo • Ether",     img: "/images/portals/spirit.png", href: "/ride/spirit" },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => router.push(p.href)}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition text-left"
            >
              <div className="mx-auto mb-4 grid h-40 w-40 place-items-center rounded-full border border-white/15 bg-black/40 overflow-hidden">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
              </div>
              <div className="text-center text-lg font-semibold">{p.title}</div>
              <div className="mt-1 text-center text-sm opacity-80">{p.sub}</div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
