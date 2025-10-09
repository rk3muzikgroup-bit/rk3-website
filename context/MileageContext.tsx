// context/MileageContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Reward = {
  id: string;
  title: string;
  icon: string;
  miles: number;
};

type MileageContextType = {
  tripMileage: number;
  totalMileage: number;
  addMiles: (amount: number) => void;
  resetTrip: () => void;
  rewards: Reward[];
  unlocked: Reward[];
};

const MileageContext = createContext<MileageContextType | undefined>(undefined);

const rewardLevels: Reward[] = [
  { id: "explorer", title: "Explorer", icon: "🌌", miles: 1000 },
  { id: "navigator", title: "Navigator", icon: "🧭", miles: 5000 },
  { id: "captain", title: "Star Captain", icon: "🚀", miles: 10000 },
  { id: "scholar", title: "Cosmic Scholar", icon: "📜", miles: 25000 },
  { id: "master", title: "Vault Master", icon: "🔑", miles: 50000 },
];

export function MileageProvider({ children }: { children: React.ReactNode }) {
  const [tripMileage, setTripMileage] = useState(0);
  const [totalMileage, setTotalMileage] = useState(0);
  const [unlocked, setUnlocked] = useState<Reward[]>([]);

  // Load total + unlocked from localStorage
  useEffect(() => {
    const storedMiles = localStorage.getItem("totalMileage");
    const storedRewards = localStorage.getItem("unlockedRewards");

    if (storedMiles) setTotalMileage(Number(storedMiles));
    if (storedRewards) setUnlocked(JSON.parse(storedRewards));
  }, []);

  const addMiles = (amount: number) => {
    setTripMileage((prev) => prev + amount);
    setTotalMileage((prev) => {
      const updated = prev + amount;

      // Check unlocks
      const newlyUnlocked = rewardLevels.filter(
        (r) => r.miles <= updated && !unlocked.find((u) => u.id === r.id)
      );
      if (newlyUnlocked.length > 0) {
        const merged = [...unlocked, ...newlyUnlocked];
        setUnlocked(merged);
        localStorage.setItem("unlockedRewards", JSON.stringify(merged));
      }

      localStorage.setItem("totalMileage", updated.toString());
      return updated;
    });
  };

  const resetTrip = () => setTripMileage(0);

  return (
    <MileageContext.Provider
      value={{ tripMileage, totalMileage, addMiles, resetTrip, rewards: rewardLevels, unlocked }}
    >
      {children}
    </MileageContext.Provider>
  );
}

export const useMileage = () => {
  const ctx = useContext(MileageContext);
  if (!ctx) throw new Error("useMileage must be inside MileageProvider");
  return ctx;
};
