// components/ExperiencePage.tsx
import Starfield from "./Exprience/Starfield";
import Meteorite from "./Exprience/Meteorite";
import Link from "next/link";

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* Starfield Background */}
      <Starfield />

      {/* Meteorite Overlay */}
      <Meteorite />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-20" />

      {/* Page Content */}
      <div className="relative z-30 flex flex-col min-h-screen items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to the RK3 Experience
        </h1>
        <p className="max-w-2xl text-lg text-gray-300 mb-8">
          Street • Soul • Spirit — step into the immersive world.
        </p>
        <Link
          href="/vault"
          className="px-8 py-4 bg-gold-400 text-black rounded-2xl text-xl font-semibold hover:bg-gold-300 transition"
        >
          Enter the Vault 🚪
        </Link>
      </div>
    </div>
  );
}
