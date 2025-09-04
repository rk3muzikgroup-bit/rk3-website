// components/PowerUpTransition.tsx
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PowerUpTransition({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const audio = new Audio("/sounds/powerup.mp3"); // add your sound file in public/sounds
    audio.play();
    setTimeout(() => {
      onComplete();
    }, 2500); // run after animation ends
  }, [onComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
      {/* Flicker Effect */}
      <motion.div
        className="w-full h-full bg-blue-500"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0.2, 1, 0],
        }}
        transition={{ duration: 2 }}
      />

      {/* Flash Surge */}
      <motion.div
        className="absolute w-full h-full bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
    </div>
  );
}
