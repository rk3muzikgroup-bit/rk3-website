"use client";

import { useState, useEffect } from "react";

export type PilotBadge = {
  userId: string;
  username: string;
  avatar: string;
  portal: string;
};

export function usePilotBadge(userId: string) {
  const [badge, setBadge] = useState<PilotBadge | null>(null);

  useEffect(() => {
    async function fetchBadge() {
      try {
        const res = await fetch(`/data/profiles/${userId}.json`);
        const data = await res.json();
        setBadge(data);
      } catch (err) {
        console.error("No badge found:", err);
      }
    }
    fetchBadge();
  }, [userId]);

  return badge;
}
