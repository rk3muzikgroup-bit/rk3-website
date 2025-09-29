import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Example: read session (pseudo)
  const session = req.headers.cookie ? { userId: "user_123", tier: "gold" } : null;

  if (!session) {
    return res.status(200).json({ member: false, tier: "free", allowed: false });
  }

  // Decide allowed based on tier or other logic
  const allowed = session.tier && (session.tier === "gold" || session.tier === "platinum");

  return res.status(200).json({ member: !!session, tier: session?.tier ?? "free", allowed });
}
