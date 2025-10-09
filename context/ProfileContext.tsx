"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Profile = {
  username: string;
  portal: "street" | "soul" | "spirit";
  mileage: number;
  rank: string;
  nowPlaying: string;
};

const ProfileContext = createContext<Profile | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  // later replace with DB/auth fetch
  const [profile] = useState<Profile>({
    username: "richkiddd",
    portal: "soul",
    mileage: 7421,
    rank: "Navigator",
    nowPlaying: "Healing Ain’t (RK3 Mix)",
  });

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
