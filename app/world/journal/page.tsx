"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MusicPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <video
          src="/videos/starfield.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Title */}
      <motion.h1
        className="z-10 text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        🎶 Music Portal
      </motion.h1>

      {/* Coming Soon */}
      <motion.p
        className="z-10 text-xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Coming Soon... The sound of RK3.
      </motion.p>

      {/* Back Link */}
      <Link href="/world" className="z-10 mt-10 text-pink-400 hover:underline">
        ⬅ Back to Vault
      </Link>
    </div>
  );
}
