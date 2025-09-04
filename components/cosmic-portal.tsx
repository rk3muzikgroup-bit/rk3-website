import Link from "next/link";

export default function Portal() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      <h1 className="text-5xl font-bold mb-6">✨ Cosmic Portal ✨</h1>
      <p className="text-lg text-gray-300 mb-8">
        Step into infinite realms of energy, light, and sound.
      </p>
      <Link
        href="/hub"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition"
      >
        ⬅ Back to Hub
      </Link>
    </main>
  );
}
