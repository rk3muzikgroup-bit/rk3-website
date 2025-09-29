// app/legal/terms/page.tsx
export const metadata = { title: "RK3 • Terms", description: "Terms of Use" };
export default function Terms() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto w-[min(900px,92vw)] py-12">
        <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li>All audio, video, images, and code on this site are owned by RK3 Music Group unless stated otherwise.</li>
          <li>Streaming is for personal, non-commercial use. No downloads, re-uploads, or derivative uses without written license.</li>
          <li>We may update these terms; continued use means acceptance.</li>
          <li>Contact licensing: <a className="underline" href="mailto:licensing@rks3.com">licensing@rks3.com</a>.</li>
        </ul>
      </section>
    </main>
  );
}
