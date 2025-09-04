// components/CockpitStars.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CockpitStars() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    const triggerStar = (delay: number) => {
      timers.push(
        setTimeout(() => {
          const id = Date.now();
          const star = { id, x: Math.random() * 100, y: Math.random() * 40 };
          setStars((prev) => [...prev, star]);

          // remove star after 2s
          setTimeout(() => {
            setStars((prev) => prev.filter((s) => s.id !== id));
          }, 2000);
        }, delay)
      );
    };

    triggerStar(3000); // first shooting star
    triggerStar(10000); // second shooting star

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      {/* ✨ Starfield */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
          backgroundSize: "3px 3px",
          opacity: 0.6,
        }}
      />

      {/* 🌠 Shooting stars + hologram text */}
      {stars.map((star) => (
        <div key={star.id}>
          {/* Shooting star */}
          <motion.div
            initial={{ x: `${star.x}%`, y: `${star.y}%`, opacity: 1 }}
            animate={{ x: `${star.x + 30}%`, y: `${star.y + 30}%`, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_6px_2px_white]"
          />

          {/* Hologram Wish Text (only while star exists) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1, 0] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <span
              className="text-5xl font-bold"
              style={{
                color: "rgba(180, 255, 255, 0.8)", // glowing cyan
                textShadow: `
                  0 0 6px rgba(0, 255, 255, 0.9),
                  0 0 12px rgba(128, 0, 255, 0.8),
                  0 0 20px rgba(0, 255, 255, 0.6)
                `,
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: "0.15em",
                backdropFilter: "blur(4px) brightness(1.3)",
                WebkitBackdropFilter: "blur(4px) brightness(1.3)",
              }}
            >
              MAKE YOUR WISH ✨
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
