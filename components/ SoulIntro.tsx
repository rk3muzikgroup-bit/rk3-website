"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SoulIntro() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [launch, setLaunch] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const hum = new Audio("/sounds/engine-hum.mp3");
    hum.loop = true;
    hum.volume = 0.3;
    hum.play().catch(() => {});

    const timer = setTimeout(() => {
      setLaunch(true);

      new Audio("/sounds/soul-choir.mp3").play().catch(() => {});
      new Audio("/sounds/sparkle.mp3").play().catch(() => {});

      setTimeout(() => setFlash(true), 300);

      setTimeout(() => {
        setShowIntro(false);
        hum.pause();
        router.push("/soul");
      }, 1200);
    }, 3000);

    return () => {
      hum.pause();
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden"
        >
          <div className="stars" />
          <motion.div
            animate={
              launch
                ? { scale: [1, 2.5], opacity: [0.8, 0] }
                : { scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }
            }
            transition={{ duration: launch ? 1 : 3, repeat: launch ? 0 : Infinity }}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-300 blur-3xl"
          />
          <motion.div
            animate={
              launch ? { y: -500, opacity: 0 } : { y: [0, -5, 5, -3, 3, 0] }
            }
            transition={{ duration: launch ? 1 : 0.5, repeat: launch ? 0 : Infinity }}
            className="z-10 text-7xl"
          >
            🚀
          </motion.div>
          {flash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-white z-50"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
