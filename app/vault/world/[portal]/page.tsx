"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useWarp } from "@/hooks/useWarp";

// Mock user (later fetch from DB/auth)
const mockUser = {
  username: "richkiddd",
  portal: "soul",
};

// Portal mapping: names + colors + backgrounds
const portalData: Record<
  string,
  { name: string; color: string; shadow: string; background: string }
> = {
  street: {
    name: "Street Portal",
    color: "text-indigo-300",
    shadow: "0 0 20px rgba(100,150,255,0.9)",
    background: "/backgrounds/street_city.jpg", // neon city skyline
  },
  soul: {
    name: "Soul Portal",
    color: "text-emerald-300",
    shadow: "0 0 20px rgba(0,255,200,0.9)",
    background: "/backgrounds/emerald_nebula.jpg", // emerald nebula
  },
  spirit: {
    name: "Spirit Portal",
    color: "text-yellow-300",
    shadow: "0 0 20px rgba(255,221,0,0.9)",
    background: "/backgrounds/golden_sun.jpg", // cosmic sunrise
  },
  healing: {
    name: "Healing Frequencies",
    color: "text-pink-300",
    shadow: "0 0 20px rgba(255,100,150,0.9)",
    background: "/backgrounds/pink_wave.jpg", // flowing healing waves
  },
  akashic: {
    name: "Akashic Records",
    color: "text-cyan-300",
    shadow: "0 0 20px rgba(100,255,255,0.9)",
    background: "/backgrounds/cosmic_library.jpg", // cosmic library shelves
  },
  ancestral: {
    name: "Ancestral Hall",
    color: "text-orange-300",
    shadow: "0 0 20px rgba(255,180,100,0.9)",
    background: "/backgrounds/ancestral_hall.jpg", // stone temple hall
  },
  thoth: {
    name: "Thoth / Law of One",
    color: "text-purple-300",
    shadow: "0 0 20px rgba(180,100,255,0.9)",
    background: "/backgrounds/thoth_tablet.jpg", // glowing emerald tablet
  },
  dna: {
    name: "DNA Activation",
    color: "text-green-300",
    shadow: "0 0 20px rgba(0,255,100,0.9)",
    background: "/backgrounds/dna_strands.jpg", // luminous DNA strands
  },
  divinefeminine: {
    name: "Divine Feminine",
    color: "text-rose-300",
    shadow: "0 0 20px rgba(255,150,200,0.9)",
    background: "/backgrounds/divine_feminine.jpg", // goddess silhouette / water
  },
  treeoflife: {
    name: "Tree of Life",
    color: "text-lime-300",
    shadow: "0 0 20px rgba(150,255,150,0.9)",
    background: "/backgrounds/tree_of_life.jpg", // kabbalah / glowing tree
  },
  elements: {
    name: "Elemental Balance",
    color: "text-teal-300",
    shadow: "0 0 20px rgba(100,200,200,0.9)",
    background: "/backgrounds/elements.jpg", // fire-water-earth-air
  },
  astral: {
    name: "Astral Travel",
    color: "text-fuchsia-300",
    shadow: "0 0 20px rgba(255,100,255,0.9)",
    background: "/backgrounds/astral_travel.jpg", // cosmic astral plane
  },
  observer: {
    name: "The Observer",
    color: "text-gray-300",
    shadow: "0 0 20px rgba(200,200,200,0.9)",
    background: "/backgrounds/observer_void.jpg", // void horizon / gray
  },
  livingroom: {
    name: "Living Room",
    color: "text-white",
    shadow: "0 0 25px rgba(255,255,255,1)",
    background: "/backgrounds/living_room.jpg", // cozy glowing central room
  },
};

export default function PortalPage() {
  const { portal } = useParams<{ portal: string }>();
  const playSound = usePlaySound();
  const { warpTo, overlay } = useWarp(mockUser.portal);

  const portalInfo = portalData[portal] || {
    name: "Unknown Portal",
    color: "text-white",
    shadow: "0 0 20px rgba(255,255,255,0.9)",
    background: "/backgrounds/starfield.jpg",
  };

  // Play cinematic entry
  useEffect(() => {
    playSound("ride/rocket_whoosh");
    const hum = setTimeout(() => {
      playSound("vault/door_hum");
    }, 1200);
    return () => clearTimeout(hum);
  }, [playSound]);

  return (
    <div className="w-screen h-screen bg-black text-white relative overflow-hidden">
      {/* Portal Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 animate-pulse"
        style={{ backgroundImage: `url(${portalInfo.background})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

      {/* Portal Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`text-5xl font-bold mb-6 ${portalInfo.color}`}
          style={{ textShadow: portalInfo.shadow }}
        >
          🚪 {portalInfo.name} Activated
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-gray-300 italic text-lg"
        >
          Welcome to the {portalInfo.name} realm.
        </motion.p>
      </div>

      {/* Return Button */}
      <div className="absolute bottom-6 left-6 z-50">
        <button
          onClick={() => warpTo("/world")}
          className="px-4 py-2 rounded-md bg-yellow-500/70 hover:bg-yellow-400 
                     border border-yellow-300/40 text-sm
                     shadow-[0_0_15px_rgba(255,221,0,0.8)] backdrop-blur-md"
        >
          Return to World Map
        </button>
      </div>

      {overlay}
    </div>
  );
}
