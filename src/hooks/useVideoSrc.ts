// src/hooks/useVideoSrc.ts
export default function useVideoSrc(key: string): string {
  const map: Record<string, string> = {
    cockpit_loop: "/videos/cockpit/cockpit_loop.mp4",
    street_ride: "/videos/ride/Street_Ride.mp4",
    soul_ride: "/videos/ride/Soul_Ride.mp4",
    spirit_ride: "/videos/ride/Spirit_Ride.mp4",
  };
  return map[key] ?? "";
}
