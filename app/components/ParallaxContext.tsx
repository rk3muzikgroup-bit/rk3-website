"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ParallaxContextType = {
  x: number;
  y: number;
};

const ParallaxContext = createContext<ParallaxContextType>({
  x: 0,
  y: 0,
});

export function ParallaxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const active = useRef(true);

  useEffect(() => {
    // Respect reduced motion
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      return;
    }

    // Disable on coarse pointers (touch devices)
    if (
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      target.current.x =
        e.clientX / window.innerWidth - 0.5;
      target.current.y =
        e.clientY / window.innerHeight - 0.5;
    };

    const loop = () => {
      if (!active.current) return;

      setPos(prev => ({
        x: prev.x + (target.current.x - prev.x) * 0.06,
        y: prev.y + (target.current.y - prev.y) * 0.06,
      }));

      raf.current = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      active.current = !document.hidden;
      if (!active.current && raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
      if (active.current && !raf.current) {
        loop();
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener(
      "visibilitychange",
      onVisibility
    );

    loop();

    return () => {
      active.current = false;
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener(
        "visibilitychange",
        onVisibility
      );
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <ParallaxContext.Provider value={pos}>
      {children}
    </ParallaxContext.Provider>
  );
}

export function useParallax() {
  return useContext(ParallaxContext);
}
