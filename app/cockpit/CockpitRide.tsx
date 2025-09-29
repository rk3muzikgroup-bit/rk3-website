"use client";

import { useSteering } from "@/context/SteeringContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";

export default function CockpitRide({ src }: { src: string }) {
  const { x, y } = useSteering();
  const steerOffset = Math.round(x * 50);   // -50 ↔ 50
  const thrustPower = Math.round((y + 1) * 50); // 0–100
  const videoRef = useRef<HTMLVideoElement>(null);

  const [warp, setWarp] = useState(false);
  const playSound = usePlaySound();

  // Adjust video playback speed by thrust
  useEffect(() => {
    if (videoRef.current) {
      const rate = 0.8 + thrustPower / 250; // 0.8x → 1.2x
      videoRef.current.playbackRate = rate;
    }
  }, [thrustPower]);

  // Trigger warp flash + ride-specific sound
  useEffect(() => {
    setWarp(true);

    let soundPath = "/sounds/ride/transition_whoosh.mp3"; // fallback
    if (src.includes("Street")) soundPath = "/sounds/ride/street_warp.mp3";
    if (src.includes("Soul")) soundPath = "/sounds/ride/soul_warp.mp3";
    if (src.includes("Spirit")) soundPath = "/sounds/ride/spirit_warp.mp3";

    playSound(soundPath, 0.9);

    const timer = setTimeout(() => setWarp(false), 400);
    return () => clearTimeout(timer);
  }, [src, playSound]);
  useEffect(() => {
    setWarp(true);

    let soundPath = "/sounds/ride/transition_whoosh.mp3";
    let voicePath = "";

    if (src.includes("Street")) {
      soundPath = "/sounds/ride/street_warp.mp3";
      voicePath = "/sounds/voice/street_warp.mp3";
    }
    if (src.includes("Soul")) {
      soundPath = "/sounds/ride/soul_warp.mp3";
      voicePath = "/sounds/voice/soul_warp.mp3";
    }
    if (src.includes("Spirit")) {
      soundPath = "/sounds/ride/spirit_warp.mp3";
      voicePath = "/sounds/voice/spirit_warp.mp3";
    }

    playSound(soundPath, 0.9);
    if (voicePath) playSound(voicePath, 1);

    const timer = setTimeout(() => setWarp(false), 400);
    return () => clearTimeout(timer);
  }, [src, playSound]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={src}
        className="absolute inset-0 w-full h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          animate={{
            rotate: steerOffset / 10,       // tilt video with steering
            scale: 1 + thrustPower / 500,   // subtle zoom with thrust
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />

        {/* Glow overlay for thrust */}
        <motion.div
          className="absolute inset-0 bg-teal-400/10 pointer-events-none"
          animate={{ opacity: thrustPower / 100 }}
          transition={{ duration: 0.3 }}
        />

        {/* Warp Flash */}
        <AnimatePresence>
          {warp && (
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
