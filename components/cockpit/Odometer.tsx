"use client";

import { useEffect, useState } from "react";

export default function Odometer({ start = 465978478, speed = 120 }) {
  const [mileage, setMileage] = useState(start);

  useEffect(() => {
    const interval = setInterval(() => {
      setMileage((prev) => prev + Math.floor(Math.random() * 3 + 1));
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);

  const digits = mileage.toString().split("");

  return (
    <div className="flex justify-center space-x-1">
      {digits.map((d, i) => (
        <div
          key={i}
          className="relative w-6 h-10 bg-black/70 border border-emerald-400/40 
                     rounded-md overflow-hidden shadow-lg backdrop-blur-md"
        >
          <div
            className="absolute inset-0 flex items-center justify-center 
                       text-emerald-300 font-mono text-lg drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
          >
            {d}
          </div>
        </div>
      ))}
    </div>
  );
}
