import Link from "next/link";

export default function SoulPage() {
  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* Soul Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/starfield-soul.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Page Content */}
      <div className="relative z-20 flex flex-col min-h-screen items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gold-400">
          Soul Realm
        </h1>
        <p className="max-w-2xl text-lg text-gray-300 mb-8">
          The soul is where healing and rhythm connect. Dive into the energy that
          restores and inspires.
        </p>
        <Link
          href="/spirit"
          className="px-8 py-4 bg-gold-400 text-black rounded-2xl text-xl font-semibold hover:bg-gold-300 transition"
        >
          Enter Spirit ➡️
        </Link>
      </div>
    </div>
  );
}
