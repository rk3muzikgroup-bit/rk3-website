"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import EnterAwareness from "@/components/EnterAwareness";

export default function HomePage() {
  const router = useRouter();
  const [triggerAwareness, setTriggerAwareness] = useState(false);

  const handleEnter = () => {
    // 🔊 Play vault unlock sound
    const unlock = new Audio("/sounds/vault/unlock.mp3");
    unlock.volume = 0.8;
    unlock.play();

    // ⚡ Trigger awareness notice
    setTriggerAwareness(true);

    // 🚀 Navigate into cockpit after a beat
    setTimeout(() => {
      router.push("/cockpit");
    }, 2000); 
  };

  return (
    <div className="relative h-screen w-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="flex flex-col items-center text-center"
      >
        <h1 className="text-6xl font-bold mb-6">🌌 Welcome to RK3</h1>
        <p className="text-lg opacity-70 mb-10">Street • Soul • Spirit</p>
        <button
          onClick={handleEnter}
          className="px-8 py-4 text-xl font-bold rounded-xl bg-yellow-400/20 border-2 border-yellow-400 shadow-lg hover:bg-yellow-400/30"
        >
          Enter Site
        </button>
      </motion.div>

      {/* Awareness notice auto-fires when Enter is pressed */}
      <EnterAwareness trigger={triggerAwareness} />
    </div>
  );
}
