"use client";
import { useEffect, useState } from "react";

type Star = {
  id: string;
  top: string;
  left: string;
  size: number;
  opacity: number;
  delay: string;
  duration: string;
};

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 60 }).map(() => ({
      id: crypto.randomUUID(),
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 5 + 4}s`,
    }));

    setStars(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {stars.map(star => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}
