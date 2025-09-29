// app/dj/page.tsx
export const metadata = {
  title: "RK3 • DJ Sets",
  description: "Live blends, exclusives, and journeys.",
};

export default function DJPage() {
  return (
    <main className="mx-auto w-[min(1200px,92vw)] py-10">
      <h1 className="text-2xl font-semibold">DJ Sets</h1>
      <p className="mt-2 text-white/80">Programming the vibe. Long-form journeys and live blends.</p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm font-medium">Featured Set</div>
        <div className="mt-2 text-white/80">Coming soon.</div>
      </div>
    </main>
  );
}
