"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultPage() {
  const playSound = usePlaySound();
  const router = useRouter();
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    // Vault ambience
    playSound("/sounds/vault/door_hum.mp3", 0.4, true);

    // Unlock sequence
    setTimeout(() => {
      playSound("/sounds/vault/unlock.mp3", 1);
      setDoorOpen(true);
    }, 2500);
  }, [playSound]);

  const handleEnter = (path: string) => {
    playSound("/sounds/vault/door_open.mp3", 0.9);
    setTimeout(() => {
      router.push(path);
    }, 1500);
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Vault Background Video (placeholder) */}
      <video
        src="/videos/cockpit/cockpit_loop.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />

      {/* Vault Door + Portals */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 1 }}
        animate={{ scale: doorOpen ? 1.2 : 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="w-80 h-80 bg-gradient-to-b from-gray-900 to-gray-800 border-4 border-teal-400 rounded-full shadow-[0_0_40px_rgba(45,212,191,0.8)] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {!doorOpen ? (
            <span className="text-teal-200 font-mono">🔒 LOCKED</span>
          ) : (
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            >
              {[
                { label: "Street", path: "/vault/street" },
                { label: "Soul", path: "/vault/soul" },
                { label: "Spirit", path: "/vault/spirit" },
                { label: "Final Room", path: "/vault/final" },
              ].map((portal, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleEnter(portal.path)}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 shadow-[0_0_25px_rgba(45,212,191,0.8)] text-white font-mono text-sm flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 40px rgba(45,212,191,1)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {portal.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
