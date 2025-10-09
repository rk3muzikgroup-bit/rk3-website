"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useWarp() {
  const router = useRouter();
  const [warpTarget, setWarpTarget] = useState<string | null>(null);

  const warp = (target: string) => {
    setWarpTarget(target);
    setTimeout(() => {
      router.push(target);
      setWarpTarget(null);
    }, 2000); // small delay for animation
  };

  return { warp, warpTarget };
}
