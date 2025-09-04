"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type Props = {
  trigger: any;
  color: string;
  sound: string; // sound path
};

export default function SceneTransition({ trigger, color, sound }: Props) {
  const [show, setShow] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (trigger) {
      setShow(true);

      // play warp sound
      audioRef.current = new Audio(sound);
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});

      const timer = setTimeout(() => setShow(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [trigger, sound]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 3, opacity: 1 }}
            exit={{ scale: 5, opacity: 0 }}
            transition={{ duration: 1 }}
            className={`w-64 h-64 rounded-full ${color} blur-2xl`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
