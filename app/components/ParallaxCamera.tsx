"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  strength?: number; // recommended 6–20
};

export default function ParallaxCamera({
  children,
  strength = 12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      return;
    }

    // Disable on coarse pointers (touch / stylus)
    if (
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const maxStrength = Math.max(
      0,
      Math.min(40, strength)
    );

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let active = true;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      targetX =
        ((e.clientX / innerWidth) - 0.5) *
        maxStrength;
      targetY =
        ((e.clientY / innerHeight) - 0.5) *
        maxStrength;
    };

    const animate = () => {
      if (!active) return;

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      frame.current = requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        active = false;
        if (frame.current)
          cancelAnimationFrame(frame.current);
      } else {
        if (!active) {
          active = true;
          animate();
        }
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    animate();

    return () => {
      active = false;
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
      if (frame.current)
        cancelAnimationFrame(frame.current);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className="relative will-change-transform"
    >
      {children}
    </div>
  );
}
