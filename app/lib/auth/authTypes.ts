export type User = {
  id: string;
  email: string;

  // access control
  role: "guest" | "member" | "owner";

  // billing / membership
  plan: "free" | "gold" | "platinum";

  createdAt: number;
};
