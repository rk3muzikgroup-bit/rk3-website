"use client";

import { motion } from "framer-motion";
import { useWarp } from "@/hooks/useWarp";
import { realmAura } from "@/utils/realmAura";

const portals = Object.keys(realmAura); // auto from map

export default function WorldPage() {
  const { warpTo, overlay } = useWarp("world");

  return (
    <main className="relative w-screen h-screen bg-black text-white overflow-hidden">
      {/* Spinning Earth Background */}
      <video
        src="/videos/world/earth_spin.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-10 w-full text-center text-4xl font-bold text-emerald-300"
        style={{ textShadow: "0 0 20px rgba(0,255,200,0.9)" }}
      >
        🌍 The World Map
      </motion.h1>

      {/* Floating Portals */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 max-w-6xl mx-auto pt-32">
        {portals.map((p, idx) => {
          const config = realmAura[p];
          return (
            <motion.div
              key={p}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => warpTo(`/world/${p}`)}
              className="cursor-pointer flex flex-col items-center"
            >
              <div
                className={`w-24 h-24 rounded-full border-4 ${config.color} flex items-center justify-center`}
                style={{
                  backgroundImage: `url(${config.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="text-[10px] font-bold text-center px-2 drop-shadow-md">
                  {config.label.split(" ")[0]}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {overlay}
    </main>
  );
}
