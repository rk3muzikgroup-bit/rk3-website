/* ───────── TYPES ───────── */

export type CreatorRef = {
  id: string;
  name: string;
};

export type MarketItemType =
  | "session"
  | "program"
  | "frequency";

export type MarketItem = {
  id: string;
  type: MarketItemType;

  /** display */
  title: string;
  description: string;
  tags: string[];

  /** ownership */
  creator: CreatorRef;

  /** lifecycle */
  version: string;
  createdAt: string; // ISO string

  /** install */
  payloadRef: string; // local key now, URL later
};

/* ───────── DATA ───────── */
/**
 * Local Marketplace Index
 * (remote feed can merge later)
 */

export const MARKET_ITEMS = [
  {
    id: "rk3-heart-reset-session",
    type: "session",
    title: "Heart Reset (Coherence)",
    description:
      "A gentle heart-centered recalibration session.",
    creator: {
      id: "rk3",
      name: "RK3",
    },
    version: "1.0.0",
    tags: ["heart", "coherence", "calm"],
    payloadRef: "session:heart_reset",
    createdAt: new Date().toISOString(),
  },

  {
    id: "rk3-7day-heart-program",
    type: "program",
    title: "7-Day Heart Reset",
    description:
      "Daily heart work for emotional balance.",
    creator: {
      id: "rk3",
      name: "RK3",
    },
    version: "1.0.0",
    tags: ["program", "heart"],
    payloadRef: "program:7_day_heart_reset",
    createdAt: new Date().toISOString(),
  },
] as const satisfies readonly MarketItem[];

/* ───────── HELPERS ───────── */

/**
 * Filter by item type
 */
export function getMarketItemsByType(
  type: MarketItemType
): MarketItem[] {
  return MARKET_ITEMS.filter(i => i.type === type);
}

/**
 * Lookup by payloadRef
 */
export function getMarketItemByPayload(
  payloadRef: string
): MarketItem | undefined {
  return MARKET_ITEMS.find(
    i => i.payloadRef === payloadRef
  );
}

/**
 * Tag-based search
 */
export function searchMarketItems(
  query: string
): MarketItem[] {
  const q = query.toLowerCase();

  return MARKET_ITEMS.filter(item =>
    [
      item.title,
      item.description,
      ...item.tags,
      item.creator.name,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
