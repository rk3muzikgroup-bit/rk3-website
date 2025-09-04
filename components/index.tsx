// components/HomePage.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-950 via-black to-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-gold-400">RK3 Music Group</h1>
        <nav className="space-x-6 text-lg">
          <Link href="/about" className="hover:text-gold-300">About</Link>
          <Link href="/music" className="hover:text-gold-300">Music</Link>
          <Link href="/membership" className="hover:text-gold-300">Membership</Link>
          <Link href="/contact" className="hover:text-gold-300">Contact</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4">Street • Soul • Spirit</h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
          An independent music and media company built for truth, healing, and higher vibes.
        </p>
        <Link
          href="/spaceship"
          className="px-8 py-4 bg-gold-400 text-black rounded-2xl text-xl font-semibold hover:bg-gold-300 transition"
        >
          Join the Ride 🚀
        </Link>
      </section>

      {/* Mission Statement */}
      <section className="bg-black/60 text-center py-16 px-8">
        <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
          RK3 Music Group is an independent music and media company focused on publishing,
          digital content, and creative services. We handle songwriting, DJ performances,
          voice licensing, and live-streamed events.
        </p>
      </section>

      {/* Membership Teaser */}
      <section className="py-20 px-8 grid gap-8 md:grid-cols-3 text-center">
        <div className="bg-white/5 p-8 rounded-2xl shadow-md">
          <h4 className="text-2xl font-semibold mb-4">Silver</h4>
          <p className="mb-4">Stream-only access, basic news updates.</p>
          <p className="font-bold">$5 / month</p>
        </div>
        <div className="bg-white/10 p-8 rounded-2xl shadow-md border-2 border-gold-400">
          <h4 className="text-2xl font-semibold mb-4">Gold</h4>
          <p className="mb-4">Downloads + early access to new content.</p>
          <p className="font-bold">$10 / month</p>
        </div>
        <div className="bg-white/5 p-8 rounded-2xl shadow-md">
          <h4 className="text-2xl font-semibold mb-4">Platinum</h4>
          <p className="mb-4">Full RK3 World + Vault Access.</p>
          <p className="font-bold">$25 / month</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 py-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} RK3 Music Group LLC</p>
        <p>
          Contact:{" "}
          <a href="mailto:RK3MusicGroup@gmail.com" className="hover:text-gold-300">
            RK3MusicGroup@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
