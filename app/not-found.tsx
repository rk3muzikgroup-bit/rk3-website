// app/not-found.tsx
export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">404 • Not Found</h1>
        <p className="mt-2 text-white/70">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="mt-4 inline-block rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
          Back Home
        </a>
      </div>
    </main>
  );
}
