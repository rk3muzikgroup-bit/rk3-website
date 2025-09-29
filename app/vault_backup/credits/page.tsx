"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function VaultCredits() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6; // start softer
      audioRef.current.play();

      // Fade out audio near the end (last 5s of scroll)
      const fadeTimer = setTimeout(() => {
        if (!audioRef.current) return;
        let fade = setInterval(() => {
          if (audioRef.current!.volume > 0.05) {
            audioRef.current!.volume -= 0.05;
          } else {
            audioRef.current!.volume = 0;
            clearInterval(fade);
          }
        }, 500);
      }, 55000); // start fade at 55s

      return () => clearTimeout(fadeTimer);
    }
  }, []);

  const credits = [
    // Honoring the Source
    "The Creator of All",
    "Devine Spark (DS)",
    "KidddRich the First",
    "The Avatars of RK3",
    "Thoth the Teacher",

    // RK3 Multiverse Crew
    "Isis the Pisces",
    "Ying & Yang",
    "The Observer",
    "G.O.D. — Gift of Design",
    "The Light Codes Council",

    // Sound & Spirit
    "Echo Rae",
    "Vibe Johnson",
    "Luma Starwell",
    "Orion Tonez",
    "Melody Cruz",
    "Astro Beats Collective",
    "Shaman Z",
    "Crystal Flow",
    "Nova Harmonix",
    "SoulFire",

    // Street & Soul Legends
    "Rico Blaze",
    "Karma King",
    "D-Lite",
    "Zenya Rose",
    "Truth Carter",
    "DJ SolarWave",
    "Luna Divine",
    "Jett Pharaoh",
    "Cassie Blue",
    "Omega J",

    // Special Thanks
    "The Architects of Balance",
    "The 7 Laws Keepers",
    "Guardians of the Vault",
    "The Street Souls",
    "Spirit Walkers",
    "Cosmic Fam Worldwide",
    "The Teachers Who Came Before",
    "You — the Listener",
  ];

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-black overflow-hidden">
      {/* Background Audio */}
      <audio ref={audioRef} src="/sounds/vault/closing_long.mp3" />

      {/* Scrolling Credits */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "-200%" }}
        transition={{ duration: 60, ease: "linear" }}
        className="text-white text-2xl font-semibold space-y-8"
      >
        {credits.map((name, idx) => (
          <div key={idx} className="text-center">
            {name}
          </div>
        ))}
      </motion.div>

      {/* Fade to black overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 60, duration: 3, ease: "easeInOut" }}
        className="absolute inset-0 bg-black"
      />
    </div>
  );
}
