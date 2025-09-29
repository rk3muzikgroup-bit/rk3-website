"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const portals = [
  { href: "/artifacts", label: "📜 Artifacts", color: "blue-500", sound: "/sounds/vault_sparkle.mp3" },
  { href: "/exhibits", label: "🖼 Exhibits", color: "green-500", sound: "/sounds/vault_rumble.mp3" },
  { href: "/archives", label: "📚 Archives", color: "indigo-600", sound: "/sounds/vault_slam.mp3" },
];

export default function VaultPortals() {
  const playHover = () => {
    const hover = new Audio("/sounds/vault_sparkle.mp3");
    hover.volume = 0.3;
    hover.play();
  };

  const playClick = (sound: string) => {
    const sfx = new Audio(sound);
    sfx.volume = 0.6;
    sfx.play();
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 🔥 Background glow props */}
      <motion.div
        className="absolute left-20 top-10 w-32 h-32 rounded-full bg-blue-400 blur-2xl opacity-40"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-20 top-20 w-24 h-40 bg-amber-500 blur-xl opacity-30"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 w-full text-center text-2xl font-mono text-indigo-500 tracking-widest opacity-30"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        𓂀 ☉ ✶ ✦ 𐌋 Ϟ ⍟ ᚠ ⚚
      </motion.div>

      {/* ✨ Portals */}
      <div className="flex gap-14 z-20">
        {portals.map((portal, i) => (
          <motion.div
            key={portal.href}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 1 + i * 0.4,
              duration: 0.8,
              type: "spring",
            }}
          >
            <Link href={portal.href}>
              <motion.button
                whileHover={{
                  scale: 1.2,
                  boxShadow: "0px 0px 40px rgba(255,255,255,0.95)",
                }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={playHover}
                onClick={() => playClick(portal.sound)}
                className={`relative px-10 py-6 rounded-full font-bold text-white bg-${portal.color} transition-all duration-300`}
              >
                {/* Glowing Ripple */}
                <motion.span
                  className={`absolute inset-0 rounded-full bg-${portal.color} opacity-50 blur-xl`}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.1, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10 text-xl">{portal.label}</span>
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
