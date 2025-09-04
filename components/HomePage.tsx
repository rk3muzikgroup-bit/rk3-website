// components/HomePage.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
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

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
          Street • Soul • Spirit
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
          Independent Music & Media Company — Publishing, Digital Content,
          Live Performances, and Creative Services.
        </p>
        <Link
          href="/experience"
          className="px-8 py-4 bg-gold-400 text-black rounded-2xl text-xl font-semibold hover:bg-gold-300 transition"
        >
          Enter Experience 🚀
        </Link>
      </section>

      {/* Mission Statement */}
      <section className="bg-black text-center py-16 px-8">
        <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
          RK3 Music Group is an independent music and media company dedicated
          to blending Street • Soul • Spirit into transformative art. We deliver
          authentic sound, creative services, and innovative digital experiences
          that inspire, heal, and connect communities worldwide.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 text-center text-gray-400 text-sm">
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
