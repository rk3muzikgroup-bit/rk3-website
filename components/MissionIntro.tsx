// components/MissionIntro.tsx
import { motion } from "framer-motion";
import Starfield from "./Exprience/Starfield";
import CockpitAmbient from "./CockpitAmbient";

export default function MissionIntro({
  title,
  color,
  emoji,
  description,
  onEnter,
}: {
  title: string;
  color: string;
  emoji: string;
  description: string;
  onEnter: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <Starfield />
      <CockpitAmbient />

      {/* Title */}
      <motion.h1
        className="text-5xl font-bold mb-6 z-10"
        style={{ color }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {emoji} {title}
      </motion.h1>

      {/* Description */}
      <motion.p
        className="max-w-2xl text-center text-gray-300 mb-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {description}
      </motion.p>

      {/* Enter Mission Button */}
      <motion.button
        onClick={onEnter}
        className="px-8 py-4 rounded-xl font-bold text-xl"
        style={{ backgroundColor: color }}
        whileHover={{
          scale: 1.1,
          boxShadow: `0px 0px 25px ${color}`,
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        ENTER MISSION 🚀
      </motion.button>
    </div>
  );
}
