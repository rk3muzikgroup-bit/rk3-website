"use client";
import { motion, AnimatePresence } from "framer-motion";

interface VaultTransitionProps {
  active: boolean;
}

export default function VaultTransition({ active }: VaultTransitionProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          {/* Glow pulse in center */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-40 w-40 rounded-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-yellow-400 blur-3xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
