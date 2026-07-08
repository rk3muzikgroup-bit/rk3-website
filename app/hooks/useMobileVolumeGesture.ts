"use client";

import { useEffect } from "react";

export function useMobileVolumeGesture({
  onActivate,
}: {
  onActivate: () => void;
}) {
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
    }

    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      const dx = Math.abs(startX - t.clientX);
      const dy = startY - t.clientY;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // bottom-right upward swipe
      if (startX > w * 0.85 && startY > h * 0.75 && dy > 30 && dx < 40) {
        onActivate();
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [onActivate]);
}
