// app/legal/privacy/page.tsx
export const metadata = { title: "RK3 • Privacy", description: "How we handle data" };
export default function Privacy() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto w-[min(900px,92vw)] py-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-white/80">
          We collect minimal data to operate the site (e.g., basic analytics and media delivery logs). We do not sell
          your personal data. For questions or data requests, email <a className="underline" href="mailto:privacy@rks3.com">privacy@rks3.com</a>.
        </p>
      </section>
    </main>
  );
}
