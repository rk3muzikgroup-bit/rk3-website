// components/NavBar.tsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full bg-black text-white py-4 px-6 flex justify-center space-x-6 shadow-md z-50">
      <Link href="/spaceship" className="hover:text-yellow-400 transition">
        🚀 Spaceship
      </Link>
      <Link href="/street" className="hover:text-yellow-400 transition">
        🛣️ Street
      </Link>
      <Link href="/soul" className="hover:text-pink-400 transition">
        💜 Soul
      </Link>
      <Link href="/spirit" className="hover:text-blue-400 transition">
        ✨ Spirit
      </Link>
      <Link href="/finalroom" className="hover:text-red-400 transition">
        🔥 Final Room
      </Link>
    </nav>
  );
}
