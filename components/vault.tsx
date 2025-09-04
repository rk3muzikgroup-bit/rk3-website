"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function VaultPage() {
  const [isFam, setIsFam] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: "url('/rks3-3doors.png')" }}
      />

      {!isFam && (
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center space-y-6"
        >
          <h1 className="text-3xl font-bold">🚪 Fam Only Beyond This Point</h1>
          <div className="text-red-500 font-extrabold text-2xl">🔒 VAULT LOCKED</div>
          <button
            onClick={() => setIsFam(true)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
          >
            🔑 Unlock the Vault – Join Fam
          </button>
        </motion.div>
      )}

      {isFam && (
        <div className="absolute inset-0 flex items-end justify-center pb-20 space-x-32 z-10">
          <motion.a href="/street" whileHover={{ scale: 1.1 }} className="text-orange-400 font-bold text-xl">
            Enter Street 🔥
          </motion.a>
          <motion.a href="/soul" whileHover={{ scale: 1.1 }} className="text-green-400 font-bold text-xl">
            Enter Soul 💚
          </motion.a>
          <motion.a href="/spirit" whileHover={{ scale: 1.1 }} className="text-blue-400 font-bold text-xl">
            Enter Spirit ✨
          </motion.a>
        </div>
      )}
    </div>
  );
}
