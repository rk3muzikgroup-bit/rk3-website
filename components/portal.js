import Head from "next/head";
import Link from "next/link";

export default function Portal() {
  return (
    <>
      <Head>
        <title>Cosmic Portal</title>
        <meta name="description" content="Step through the cosmic portal of RK3" />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-400 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-yellow-900 to-black animate-pulse opacity-40"></div>

        {/* Cosmic swirl */}
        <div className="w-80 h-80 rounded-full border-8 border-yellow-400 animate-spin-slow absolute"></div>
        <div className="w-60 h-60 rounded-full border-4 border-yellow-200 animate-spin-slower absolute"></div>

        {/* Content */}
        <h1 className="text-5xl font-extrabold z-10">🌌 Cosmic Portal 🌌</h1>
        <p className="mt-4 text-lg text-center text-yellow-200 z-10 max-w-xl">
          You’ve stepped through the vortex. Beyond here lies the future of <span className="font-bold">Street • Soul • Spirit</span>. ✨
        </p>

        {/* Navigation */}
        <div className="mt-8 flex gap-6 z-10">
          <Link
            href="/hub"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition"
          >
            ⬅ Back to Spaceship
          </Link>
          <Link
            href="/cosmos"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition"
          >
            Enter the Cosmos ➡
          </Link>
        </div>
      </main>
    </>
  );
}
// pages/portal.js
import Head from "next/head";
import Link from "next/link";

export default function Portal() {
  return (
    <>
      <Head>
        <title>RK3 Cosmic Portal</title>
      </Head>
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center text-yellow-400">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-pulse">
          🌌 Welcome to the Cosmic Portal 🌌
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-10">
          Step through the gate. This is where the journey gets real — 
          the universe is yours, and every frequency is open. 🚀
        </p>

        <div className="space-y-4">
          <Link href="/hub">
            <button className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition">
              Back to Galactic Hub
            </button>
          </Link>

          <Link href="/">
            <button className="px-6 py-3 bg-gray-800 text-yellow-400 border border-yellow-400 rounded-xl font-bold hover:bg-gray-700 transition">
              Return Home
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
