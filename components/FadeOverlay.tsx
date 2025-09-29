"use client";
import { useTransitionFade } from "@/context/TransitionContext";

export default function FadeOverlay() {
  const { isFading, color } = useTransitionFade();

  return (
    <div
      className={`fixed inset-0 transition-opacity duration-800 pointer-events-none ${
        isFading ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: color }}
    />
  );
}
