// app/contact/page.tsx
export const metadata = {
  title: "RK3 • Contact",
  description: "Reach out for bookings, collabs, and inquiries.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-[min(1200px,92vw)] py-10">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="mt-2 text-white/80">Bookings, collaborations, licensing, and inquiries.</p>

      <form className="mt-8 grid max-w-xl gap-4">
        <input className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 outline-none" placeholder="Name" />
        <input className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 outline-none" placeholder="Email" />
        <textarea className="min-h-[140px] rounded-xl border border-white/15 bg-black/40 px-4 py-3 outline-none" placeholder="Message" />
        <button className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 w-max">
          Send
        </button>
      </form>
    </main>
  );
}
