"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

type Props = {
  label: string;
  emoji: string;
  hoverColor: string;
  onClick: () => void;
  hoverSound: string;
  clickSound: string;
};

export default function SoundButton({
  label,
  emoji,
  hoverColor,
  onClick,
  hoverSound,
  clickSound,
}: Props) {
  const hoverAudio = useRef<HTMLAudioElement | null>(null);
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  if (!hoverAudio.current) hoverAudio.current = new Audio(hoverSound);
  if (!clickAudio.current) clickAudio.current = new Audio(clickSound);

  const playHover = () => {
    if (hoverAudio.current) {
      hoverAudio.current.currentTime = 0;
      hoverAudio.current.play().catch(() => {});
    }
  };

  const playClick = () => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => {});
    }
    onClick();
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 20px rgba(255,255,255,0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={playHover}
      onClick={playClick}
      className={`px-8 py-4 rounded-2xl text-xl font-bold ${hoverColor}`}
    >
      {emoji} {label}
    </motion.button>
  );
}
