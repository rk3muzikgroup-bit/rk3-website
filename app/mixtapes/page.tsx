// app/mixtapes/page.tsx
import type { Metadata } from "next";
import MixtapePlayer from "../../components/MixtapePlayer";

export const metadata: Metadata = {
  title: "RK3 • Mixtapes",
  description: "DJ sets, blends, and exclusive drops.",
};

export default function MixtapesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 relative h-[32vh] overflow-hidden">
        <img src="/rks3-3doors.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 text-2xl font-semibold">RK3 • Mixtapes</div>
      </section>
      <section className="mx-auto w-[min(1100px,92vw)] py-10">
        <MixtapePlayer />
      </section>
    </main>
  );
}
