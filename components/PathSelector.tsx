"use client";
import { motion } from "framer-motion";
import { useAmbient } from "@/components/AmbientProvider";
import Starfield from "@/components/Experience/Starfield";
import CosmicBackground from "@/components/CosmicBackground";
import SoundButton from "@/components/SoundButton";

export default function PathSelector({ onSelect }: { onSelect: (path: string) => void }) {
  const { playAmbience, fadeOutAll } = useAmbient();

  // Vault hum plays until path chosen
  playAmbience("/sounds/vault-hum.mp3", 0.4);

  const handleSelect = (path: string) => {
    fadeOutAll(); // fade vault hum out first
    setTimeout(() => {
      onSelect(path);
    }, 1200); // give fade a second before switching
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <CosmicBackground videoSrc="/videos/vault-core.mp4" overlayColor="bg-black/70" />
      <Starfield />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-30 text-center"
      >
        <h1 className="text-5xl font-bold mb-6">✨ Choose Your Path</h1>
        <p className="mb-12 text-lg opacity-80">Every journey begins with one step.</p>

        <div className="flex space-x-8 justify-center">
          <SoundButton
            label="Street"
            emoji="🛣️"
            hoverColor="bg-red-700 hover:bg-red-800"
            onClick={() => handleSelect("street")}
            hoverSound="/sounds/fx/street-hover.mp3"
            clickSound="/sounds/fx/street-click.mp3"
          />

          <SoundButton
            label="Soul"
            emoji="💜"
            hoverColor="bg-purple-700 hover:bg-purple-800"
            onClick={() => handleSelect("soul")}
            hoverSound="/sounds/fx/soul-hover.mp3"
            clickSound="/sounds/fx/soul-click.mp3"
          />

          <SoundButton
            label="Spirit"
            emoji="✨"
            hoverColor="bg-blue-700 hover:bg-blue-800"
            onClick={() => handleSelect("spirit")}
            hoverSound="/sounds/fx/spirit-hover.mp3"
            clickSound="/sounds/fx/spirit-click.mp3"
          />
        </div>
      </motion.div>
    </div>
  );
}
