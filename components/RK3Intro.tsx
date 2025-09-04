"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function RK3Intro() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [launch, setLaunch] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // 🔊 Engine hum on load
    const hum = new Audio("/sounds/engine-hum.mp3");
    hum.loop = true;
    hum.volume = 0.4;
    hum.play().catch(() => {});

    const timer = setTimeout(() => {
      // Trigger launch sequence
      setLaunch(true);

      // 🔊 Random whoosh
      const whooshes = [
        "/sounds/whoosh1.mp3",
        "/sounds/whoosh2.mp3",
        "/sounds/whoosh3.mp3",
      ];
      const randomWhoosh =
        whooshes[Math.floor(Math.random() * whooshes.length)];
      const whoosh = new Audio(randomWhoosh);
      whoosh.volume = 0.7;
      whoosh.play().catch(() => {});

      // 🔊 Bass rumble (always plays)
      const rumble = new Audio("/sounds/bass-rumble.mp3");
      rumble.volume = 0.9;
      rumble.play().catch(() => {});

      // 🔊 Optional FX layers (0–2 random extras)
      const extraFX = [
        "/sounds/metal-clank.mp3",
        "/sounds/electric-crackle.mp3",
        "/sounds/shockwave.mp3",
      ];
      const shuffled = extraFX.sort(() => 0.5 - Math.random());
      const chosen = shuffled.slice(0, Math.floor(Math.random() * 3));

      chosen.forEach((fx) => {
        const fxSound = new Audio(fx);
        fxSound.volume = 0.6;
        fxSound.play().catch(() => {});
      });

      // Trigger flash overlay
      setTimeout(() => setFlash(true), 300);

      // Fade out & redirect
      setTimeout(() => {
        setShowIntro(false);
        hum.pause();
        router.push("/vault");
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
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden"
        >
          {/* Starfield */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="stars" />
            <div className="stars2" />
            <div className="stars3" />
          </div>

          {/* Portal aura */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={
              launch
                ? { scale: [1, 2.5], opacity: [0.8, 0] }
                : { scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }
            }
            transition={
              launch
                ? { duration: 1, ease: "easeOut" }
                : { duration: 3, repeat: Infinity }
            }
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl"
          />

          {/* Spaceship 🚀 */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={
              launch
                ? { y: -500, opacity: 0 }
                : { y: [0, -5, 5, -3, 3, 0], opacity: 1 }
            }
            transition={
              launch
                ? { duration: 1, ease: "easeInOut" }
                : { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="z-10 text-7xl drop-shadow-lg"
          >
            🚀
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: launch ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="z-10 mt-6 text-4xl font-extrabold tracking-widest"
          >
            RK3 LAUNCH SEQUENCE
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: launch ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="z-10 mt-2 text-lg text-gray-300"
          >
            Preparing entry to the Vault...
          </motion.p>

          {/* Flash Overlay */}
          {flash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-white z-50"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
