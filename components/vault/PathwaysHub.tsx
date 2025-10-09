"use client";

import { useState } from "react";

export default function PathwaysHub({ onChoose }: { onChoose: (path: "street" | "soul" | "spirit") => void }) {
  const [hover, setHover] = useState<"street" | "soul" | "spirit" | null>(null);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-10">Choose Your Pathway 🌌</h1>

      <div className="flex gap-8">
        <button
          onMouseEnter={() => setHover("street")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChoose("street")}
          className="px-6 py-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 transition"
        >
          Street
        </button>

        <button
          onMouseEnter={() => setHover("soul")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChoose("soul")}
          className="px-6 py-4 rounded-xl bg-pink-600 hover:bg-pink-700 transition"
        >
          Soul
        </button>

        <button
          onMouseEnter={() => setHover("spirit")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChoose("spirit")}
          className="px-6 py-4 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Spirit
        </button>
      </div>

      {hover && (
        <div className="absolute bottom-12 text-lg opacity-80">
          {hover === "street" && "Street: raw power, grind energy 💪"}
          {hover === "soul" && "Soul: deep healing, love, balance 💜"}
          {hover === "spirit" && "Spirit: cosmic alignment, higher vision 🌌"}
        </div>
      )}
    </div>
  );
}
