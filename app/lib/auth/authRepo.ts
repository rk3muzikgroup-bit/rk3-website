const KEY = "rks3:user";

export type AuthUser = {
  id: string;
  email: string;
  role: "guest" | "member" | "owner";
  plan: "free" | "gold" | "platinum";
  createdAt: number;
};

function safeParse(raw: string | null): AuthUser | null {
  try {
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export const authRepo = {
  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    return safeParse(localStorage.getItem(KEY));
  },

  login(email: string): AuthUser {
    const user: AuthUser = {
      id: crypto.randomUUID(),
      email,
      role: "member",
      plan: "free",
      createdAt: Date.now(),
    };

    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(KEY);
  },
};
