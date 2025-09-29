"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const portals = [
  { href: "/street", label: "🚦 Street", color: "red-500", sound: "/sounds/street_hit.mp3" },
  { href: "/soul", label: "🌅 Soul", color: "yellow-400", sound: "/sounds/soul_bell.mp3" },
  { href: "/spirit", label: "🌌 Spirit", color: "purple-600", sound: "/sounds/spirit_surge.mp3" },
];

export default function PathButtons() {
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
    <div className="absolute bottom-20 flex gap-10 z-10">
      {portals.map((portal, i) => (
        <motion.div
          key={portal.href}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.5 + i * 0.3,
            duration: 0.8,
            type: "spring",
          }}
        >
          <Link href={portal.href}>
            <motion.button
              whileHover={{ scale: 1.2, boxShadow: "0px 0px 30px rgba(255,255,255,0.9)" }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={playHover}
              onClick={() => playClick(portal.sound)}
              className={`relative px-8 py-4 rounded-full font-bold text-white bg-${portal.color} transition-all duration-300`}
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
              <span className="relative z-10">{portal.label}</span>
            </motion.button>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
