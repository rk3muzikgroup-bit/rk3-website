"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  style: "street" | "soul" | "spirit";
  fadeOut?: boolean; // tell particles when to scatter
};

export default function GuardianParticles({ style, fadeOut = false }: Props) {
  const [count, setCount] = useState(25);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCount(12);
      } else {
        setCount(25);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const colors: Record<string, string> = {
    street: "bg-red-500/70",
    soul: "bg-purple-400/70",
    spirit: "bg-blue-400/70",
  };

  const particles = Array.from({ length: count });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        let animateConfig;
        let duration;
        let size;

        if (style === "street") {
          animateConfig = {
            y: [0, fadeOut ? -150 : -80 - Math.random() * 60],
            x: [0, fadeOut ? Math.random() * 100 - 50 : Math.random() * 60 - 30],
            opacity: fadeOut ? [1, 0] : [1, 0.6, 0],
          };
          duration = fadeOut ? 1.5 : Math.random() * 2 + 1.5;
          size = Math.random() * 4 + 2;
        } else if (style === "soul") {
          animateConfig = {
            y: [0, fadeOut ? -100 : -30 - Math.random() * 40],
            x: [0, fadeOut ? Math.random() * 80 - 40 : Math.random() * 20 - 10],
            opacity: fadeOut ? [0.8, 0] : [0.6, 1, 0.6],
          };
          duration = fadeOut ? 2 : Math.random() * 6 + 4;
          size = Math.random() * 8 + 4;
        } else {
          animateConfig = {
            y: [0, fadeOut ? -120 : -50 - Math.random() * 50],
            x: [0, fadeOut ? Math.random() * 90 - 45 : Math.random() * 40 - 20],
            opacity: fadeOut ? [0.7, 0] : [0.4, 0.9, 0.4],
          };
          duration = fadeOut ? 2.5 : Math.random() * 8 + 6;
          size = Math.random() * 5 + 3;
        }

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${colors[style]}`}
            style={{
              width: size,
              height: size,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={animateConfig}
            transition={{
              duration,
              repeat: fadeOut ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
