// app/vault/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROOMS } from "../../../config/rooms";           // ← server-safe import
import RoomGallery from "../../../components/RoomGallery"; // ← client component

export default function RoomPage({ params }: { params: { slug: string } }) {
  const room = ROOMS.find((r) => r.slug === params.slug);
  if (!room) return notFound();

  return (
    <div className="relative min-h-svh bg-black text-white">
      <header className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/vault" className="text-white/70 hover:text-white">← Back to Vault</Link>
        <h1 className="text-3xl md:text-5xl font-bold mt-3">{room.title}</h1>
        {room.subtitle && <p className="text-white/70 mt-1">{room.subtitle}</p>}
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-24">
        {/* Hero */}
        <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5">
          <img
            src={room.cover}
            alt={room.title}
            className="w-full h-[42vh] object-cover"
            draggable={false}
          />
        </div>

        {/* About */}
        {room.blurb && <p className="text-white/80 mt-6 leading-relaxed">{room.blurb}</p>}

        {/* Tags */}
        {room.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {room.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15">{t}</span>
            ))}
          </div>
        ) : null}

        {/* Gallery (client component) */}
        <RoomGallery items={room.gallery || []} />
      </main>
    </div>
  );
}

// Optional: pre-generate room paths (server-only OK here)
export async function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}
