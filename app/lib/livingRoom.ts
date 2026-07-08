export type PresenceSnapshot = {
  activeCount: number;
  updatedAt: number;
};

export type Reflection = {
  id: string;
  userId: string;
  text: string;
  createdAt: number;
  expiresAt: number;
};
