// app/legal/dmca/page.tsx
export const metadata = { title: "RK3 • DMCA", description: "Copyright Agent & Takedown Policy" };
export default function DMCA() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto w-[min(900px,92vw)] py-12">
        <h1 className="text-3xl font-bold mb-4">DMCA Policy</h1>
        <p className="text-white/80">
          RK3 respects intellectual property rights. If you believe content on this site infringes your copyright,
          please send a takedown notice to our Designated Agent with the following: (1) Your contact info; (2) A
          description of the copyrighted work; (3) The exact URL(s) of the material; (4) A good-faith statement; (5) A
          statement under penalty of perjury; (6) Your physical or electronic signature.
        </p>
        <div className="mt-6 space-y-2 text-white/90">
          <div>Designated Agent: Legal – RK3 Music Group</div>
          <div>Email: <a href="mailto:legal@rks3.com" className="underline">legal@rks3.com</a></div>
          <div>Subject: DMCA Takedown</div>
          <div>Address: (Add mailing address if you register an agent with USCO)</div>
        </div>
      </section>
    </main>
  );
}
