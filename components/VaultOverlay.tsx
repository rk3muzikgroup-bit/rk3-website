"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface VaultOverlayProps {
  type: "lensflare" | "particles" | "aura" | "shockwave";
  room: "Street" | "Soul" | "Spirit" | "FinalRoom";
}

export default function VaultOverlay({ type, room }: VaultOverlayProps) {
  const overlays = {
    lensflare: `/overlays/${room}_LensFlare.png`,
    particles: `/overlays/${room}_DustParticles.png`,
    aura: `/overlays/${room}_NeonAura.png`,
    shockwave: `/overlays/${room}_Shockwave.png`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <Image
        src={overlays[type]}
        alt={`${room} ${type}`}
        fill
        className="object-contain"
      />
    </motion.div>
  );
}
