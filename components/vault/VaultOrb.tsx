"use client";

import { motion } from "framer-motion";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function VaultOrb({
  label,
  sound,
  color,
}: {
  label: string;
  sound: string;
  color?: string;
}) {
  const playSound = usePlaySound();

  return (
    <motion.div
      onClick={() => playSound(sound)}
      whileHover={{ scale: 1.2, boxShadow: "0px 0px 30px rgba(255,255,255,0.9)" }}
      whileTap={{ scale: 0.9 }}
      className={`w-24 h-24 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer select-none transition
        ${color ?? "bg-emerald-500"} shadow-lg`}
    >
      {label}
    </motion.div>
  );
}
