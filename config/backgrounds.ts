// config/backgrounds.ts
export type BGSpec = {
  src: string;       // /videos/...
  poster?: string;   // /images/posters/...
  loop?: boolean;
};

export const BACKGROUNDS = {
  enter: { src: "/videos/enter_ship.mp4", poster: "/images/posters/enter_ship.jpg", loop: false } as BGSpec,
  portal: { src: "/videos/portal_nebula.mp4", poster: "/images/posters/portal_nebula.jpg", loop: true } as BGSpec,
  vault: { src: "/videos/vault_loop.mp4", poster: "/images/posters/vault_loop.jpg", loop: true } as BGSpec,
};

export const ROOM_BACKGROUNDS: Record<string, BGSpec> = {
  "self-love": { src: "/videos/rooms/self_love.mp4", poster: "/images/posters/rooms/self_love.jpg", loop: true },
  healing:     { src: "/videos/rooms/healing.mp4", poster: "/images/posters/rooms/healing.jpg", loop: true },
  legacy:      { src: "/videos/rooms/legacy.mp4", poster: "/images/posters/rooms/legacy.jpg", loop: true },
  // add more rooms as you create them…
};
