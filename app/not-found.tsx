"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const slam = new Audio("/sounds/vault-slam.mp3");
    slam.volume = 0.6;
    slam.play().catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center relative overflow-hidden"
    >
      <motion.div
        animate={{ rotate: [0, -3, 3, -2, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="relative w-72 h-72 rounded-full overflow-hidden border-8 border-gray-700 shadow-2xl bg-gradient-to-br from-gray-900 to-black"
      >
        <Image
          src="/rks3-3doors.png"
          alt="RK3 Vault Door"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </motion.div>

      <h1 className="text-5xl font-bold text-red-500 mt-8">🚫 Fam Only</h1>
      <p className="text-lg text-gray-300 mb-10">
        The Vault door is sealed. You don’t have access to this path.
      </p>

      <Link
        href="/vault"
        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold rounded-full shadow-lg hover:scale-105 transition transform"
      >
        🚀 Back to Vault
      </Link>

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-r from-red-700 via-purple-800 to-black blur-3xl"
      />
    </motion.div>
  );
}
