"use client";

import { useParallax } from "./ParallaxContext";

export default function ParallaxLayer({
  children,
  depth = 10,
  className = "",
  interactive = false,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
  interactive?: boolean;
}) {
  const { x, y } = useParallax();

  const style = {
    transform: `translate3d(${x * depth}px, ${y * depth}px, 0)`,
  };

  return (
    <div
      style={style}
      className={[
        "will-change-transform",
        interactive ? "pointer-events-auto" : "pointer-events-none",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
