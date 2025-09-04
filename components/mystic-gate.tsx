import Link from "next/link";

export default function MysticGate() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-pink-900 to-black text-white">
      <h1 className="text-5xl font-bold mb-6">🌙 Mystic Gate 🌙</h1>
      <p className="text-lg text-gray-300 mb-8">
        Unlock wisdom and sacred knowledge through this divine passage.
      </p>
      <Link
        href="/hub"
        className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl shadow-lg transition"
      >
        ⬅ Back to Hub
      </Link>
    </main>
  );
}
