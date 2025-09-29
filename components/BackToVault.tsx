"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BackToVault() {
  return (
    <Link href="/world">
      <motion.div
        className="fixed top-6 left-6 z-50 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-sm font-semibold shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(236,72,153,1)" }}
        whileTap={{ scale: 0.95 }}
      >
        ⬅ Back to Vault
      </motion.div>
    </Link>
  );
}
