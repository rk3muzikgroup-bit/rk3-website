// app/experience/page.tsx
import Link from "next/link";

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-white">
      {/* Sky Show Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/experience.mp4" type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Page Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wider mb-8 drop-shadow-lg">
          Choose Your Path
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
          Step into the RK3 Experience — Street, Soul, or Spirit.  
          Your choice launches the Spaceship Ride.
        </p>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Street Portal */}
          <Link
            href="/ride/street"
            className="px-10 py-20 rounded-2xl bg-red-600/70 hover:bg-red-500/80 transition shadow-lg text-2xl font-bold tracking-wide"
          >
            Street 🔴
          </Link>

          {/* Soul Portal */}
          <Link
            href="/ride/soul"
            className="px-10 py-20 rounded-2xl bg-blue-600/70 hover:bg-blue-500/80 transition shadow-lg text-2xl font-bold tracking-wide"
          >
            Soul 🔵
          </Link>

          {/* Spirit Portal */}
          <Link
            href="/ride/spirit"
            className="px-10 py-20 rounded-2xl bg-purple-600/70 hover:bg-purple-500/80 transition shadow-lg text-2xl font-bold tracking-wide"
          >
            Spirit 🟣
          </Link>
        </div>
      </div>
    </div>
  );
}
