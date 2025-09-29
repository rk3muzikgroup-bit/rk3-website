// app/music/page.tsx
export const metadata = {
  title: "RK3 • Music",
  description: "Singles, EPs, albums and exclusives.",
};

export default function MusicPage() {
  return (
    <main className="mx-auto w-[min(1200px,92vw)] py-10">
      <h1 className="text-2xl font-semibold">Music</h1>
      <p className="mt-2 text-white/80">
        The bloodstream of RK3. Releases, works-in-progress, and vault exclusives.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-medium">Latest Drop</div>
          <div className="mt-2 text-white/80">Coming soon.</div>
        </div>
      </div>
    </main>
  );
}
