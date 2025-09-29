"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function RoomBreathingWrapper({
  children,
  color = "emerald",
  duration = 6,
  audioSrc
}: {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  audioSrc?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    }
  }, []);

  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        boxShadow: [
          `0 0 20px 2px rgba(16, 185, 129, 0.4)`, // emerald default
          `0 0 40px 4px rgba(16, 185, 129, 0.7)`,
          `0 0 20px 2px rgba(16, 185, 129, 0.4)`
        ]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative w-full h-full flex items-center justify-center rounded-2xl"
    >
      {children}
      {audioSrc && (
        <audio ref={audioRef} autoPlay loop src={audioSrc}></audio>
      )}
    </motion.div>
  );
}
