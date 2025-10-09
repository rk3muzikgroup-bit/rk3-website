"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// random orb position helper
function randomPosition() {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  };
}

export default function CosmicBackground() {
  const [orbs, setOrbs] = useState<{id:number; pos:{top:string; left:string}}> ([]);

  // spawn a few orbs at random spots
  useEffect(() => {
    const initial = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      pos: randomPosition(),
    }));
    setOrbs(initial);

    // refresh positions randomly
    const interval = setInterval(() => {
      setOrbs(orbs =>
        orbs.map(o => ({
          ...o,
          pos: randomPosition(),
        }))
      );
    }, 8000); // every 8s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* starfield bg */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:4px_4px]" />

      {/* ethers shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:2px_2px] opacity-30" />

      {/* guardian orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          animate={{ top: orb.pos.top, left: orb.pos.left }}
          transition={{ duration: 6, ease: "easeInOut" }}
          className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-indigo-600 opacity-40 blur-xl"
        />
      ))}
    </div>
  );
}
