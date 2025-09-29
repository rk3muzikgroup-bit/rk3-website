// src/hooks/useSafeVideoSrc.ts

export default function useSafeVideoSrc(key: string): string {
  const map: Record<string, string> = {
    cockpit_loop: "/videos/cockpit/cockpit_loop.mp4",

    street_ride: "/videos/ride/Street_Ride.mp4",
    street_fallback: "/videos/starfield_street.mp4",

    soul_ride: "/videos/ride/Soul_Ride.mp4",
    soul_fallback: "/videos/starfield_soul.mp4",

    spirit_ride: "/videos/ride/Spirit_Ride.mp4",
    spirit_fallback: "/videos/starfield_spirit.mp4",
  };

  switch (key) {
    case "street_ride":
      return map.street_ride || map.street_fallback;
    case "soul_ride":
      return map.soul_ride || map.soul_fallback;
    case "spirit_ride":
      return map.spirit_ride || map.spirit_fallback;
    case "cockpit_loop":
      return map.cockpit_loop || map.street_fallback;
    default:
      return map.street_fallback;
  }
}
