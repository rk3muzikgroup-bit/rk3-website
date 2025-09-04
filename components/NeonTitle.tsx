// components/NeonTitle.tsx
import { motion } from "framer-motion";

export default function NeonTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      className="text-4xl md:text-5xl font-bold mb-6 text-center text-purple-400 drop-shadow-lg"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.h1>
  );
}
