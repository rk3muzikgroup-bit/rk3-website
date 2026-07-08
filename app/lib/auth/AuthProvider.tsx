"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { authRepo } from "@/lib/auth/authRepo";

type AuthContextValue = {
  user: any;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(() => authRepo.getUser());

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email: string) => {
        const u = authRepo.login(email);
        setUser(u);
      },
      logout: () => {
        authRepo.logout();
        setUser(null);
      },
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }
  return ctx;
}
