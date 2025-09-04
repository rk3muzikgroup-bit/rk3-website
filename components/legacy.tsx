// pages/selflove.tsx
import Link from "next/link";

export default function SelfLove() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-pink-400">
      <h1 className="text-4xl font-bold mb-10">💜 Self-Love Page</h1>
      <Link href="/">
        <button className="px-6 py-3 bg-gray-800 rounded-xl hover:bg-gray-700 text-white">
          ⬅ Return to Cockpit
        </button>
      </Link>
    </div>
  );
}
