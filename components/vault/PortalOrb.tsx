"use client";

import { motion } from "framer-motion";

export default function PortalOrb({
  x,
  y,
  color,
  duration,
}: {
  x: number;
  y: number;
  color: string;
  duration: number;
}) {
  const driftX = (Math.random() - 0.5) * 30;
  const driftY = (Math.random() - 0.5) * 30;

  return (
    <motion.div
      className="absolute w-6 h-6 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0.5, top: `${y}%`, left: `${x}%` }}
      animate={{
        opacity: 1,
        scale: 1,
        top: `${y + driftY}%`,
        left: `${x + driftX}%`,
      }}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{ duration, ease: "easeInOut" }}
    />
  );
}
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PortalOrb from "./PortalOrb";

export default function PortalOrbs({ type }: { type: "street" | "soul" | "spirit" }) {
  const [orbs, setOrbs] = useState<{ id: number; x: number; y: number; color: string; duration: number }[]>([]);
  const [nextId, setNextId] = useState(0);

  const themes = {
    street: ["gold", "orange"],
    soul: ["pink", "violet"],
    spirit: ["dodgerblue", "indigo"],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const colors = themes[type];
      const newOrb = {
        id: nextId,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: type === "street" ? 2.5 : type === "soul" ? 4 : 6, // speed per theme
      };
      setNextId((id) => id + 1);
      setOrbs((prev) => [...prev, newOrb]);
      setTimeout(() => {
        setOrbs((prev) => prev.filter((orb) => orb.id !== newOrb.id));
      }, newOrb.duration * 1000);
    }, 2000);
    return () => clearInterval(interval);
  }, [nextId, type]);

  return (
    <AnimatePresence>
      {orbs.map((orb) => (
        <PortalOrb
          key={orb.id}
          x={orb.x}
          y={orb.y}
          color={orb.color}
          duration={orb.duration}
        />
      ))}
    </AnimatePresence>
  );
}
