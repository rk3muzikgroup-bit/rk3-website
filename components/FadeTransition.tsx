// components/FadeTransition.tsx
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function FadeTransition() {
  useEffect(() => {
    const audio = new Audio("/sounds/vault-rumble.mp3");
    audio.volume = 0.6; // adjust power of BOOM
    audio.play().catch(() => {
      console.log("Autoplay blocked until user interacts");
    });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2 }}
    />
  );
}
