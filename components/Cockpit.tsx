// components/Cockpit.tsx
import { motion } from "framer-motion";
import Starfield from "./Exprience/Starfield";
import PowerUpTransition from "./PowerUpTransition";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Cockpit() {
  const [isPoweringUp, setIsPoweringUp] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const audio = new Audio("/sounds/door-open.mp3"); // 👈 vault door sound
    audio.volume = 0.6;
    audio.play();
  }, []);

  const handleSelect = (path: string) => {
    setIsPoweringUp(true);
    setNextPath(path);
    setTimeout(() => {
      setIsPoweringUp(false);
      router.push(`/${path}`); // 👈 Navigate to mission page
    }, 2500); // match PowerUpTransition timing
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <Starfield />

      {/* Power-Up Overlay */}
      {isPoweringUp && <PowerUpTransition />}

      {/* 🚪 Door Animation */}
      <motion.div
        className="absolute inset-0 flex"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-1/2 h-full bg-gray-900"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.div
          className="w-1/2 h-full bg-gray-900"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.div>

      {/* 🛸 Cockpit Console */}
      <motion.h1
        className="text-5xl font-bold mb-10 z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        🚀 RK3 Cockpit
      </motion.h1>

      <motion.p
        className="mb-6 text-gray-400 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        Select your mission:
      </motion.p>

      <div className="flex space-x-6 z-10">
        <motion.button
          onClick={() => handleSelect("selflove")}
          className="px-6 py-3 bg-blue-700 rounded-xl"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(0,100,255,0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          💙 Self-Love
        </motion.button>

        <motion.button
          onClick={() => handleSelect("healing")}
          className="px-6 py-3 bg-green-700 rounded-xl"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(0,255,100,0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          🌱 Healing
        </motion.button>

        <motion.button
          onClick={() => handleSelect("godmode")}
          className="px-6 py-3 bg-purple-700 rounded-xl"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(150,0,255,0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
        >
          🌀 God Mode
        </motion.button>
      </div>
    </div>
  );
}
