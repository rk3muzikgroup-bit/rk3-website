"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePlaySound } from "@/hooks/usePlaySound";

const vaultVideos: Record<string, string> = {
  street: "/videos/starfield_street.mp4",
  soul: "/videos/starfield_soul.mp4",
  spirit: "/videos/starfield_spirit.mp4",
};

export default function VaultClosingPage({ params }: { params: { name: string } }) {
  const router = useRouter();
  const [fade, setFade] = useState(false);
  const playSound = usePlaySound();

  const vaultName = params.name.toLowerCase();
  const videoSrc = vaultVideos[vaultName] || "/videos/starfield_street.mp4"; // fallback

  useEffect(() => {
    playSound("/sounds/vault/closing_long.mp3", 0.8);

    const fadeTimer = setTimeout(() => setFade(true), 2500); // watermark fade
    const backTimer = setTimeout(() => router.push("/"), 11000); // auto return

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(backTimer);
    };
  }, [router, playSound]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: fade ? 0 : 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-4xl font-bold"
      >
        <p>{vaultName.toUpperCase()} VAULT SEALED</p>
        <p className="text-lg mt-4">Street • Soul • Spirit</p>
      </motion.div>
    </div>
  );
}
