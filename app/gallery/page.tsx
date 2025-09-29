// app/gallery/page.tsx
export const metadata = {
  title: "RK3 • Gallery",
  description: "ATR room — DS fine art collections.",
};

export default function GalleryPage() {
  return (
    <main className="mx-auto w-[min(1200px,92vw)] py-10">
      <h1 className="text-2xl font-semibold">Gallery (ATR Room)</h1>
      <p className="mt-2 text-white/80">A rotating view into the RK3 visual universe.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-medium">Curation in progress…</div>
        </div>
      </div>
    </main>
  );
}
