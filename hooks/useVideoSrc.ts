"use client";

import { useMemo } from "react";

type VideoType = "ride" | "cockpit" | "room";

export function useVideoSrc(type: VideoType, portal?: "street" | "soul" | "spirit") {
  return useMemo(() => {
    if (type === "ride") {
      switch (portal) {
        case "street":
          return "/videos/ride/Street_Ride.mp4";
        case "soul":
          return "/videos/ride/Soul_Ride.mp4";
        case "spirit":
          return "/videos/ride/Spirit_Ride.mp4";
        default:
          return "/videos/ride/Street_Ride.mp4";
      }
    }

    if (type === "cockpit") {
      return "/videos/cockpit/cockpit_loop.mp4";
    }

    if (type === "room") {
      // default room background loop (you can add variants later)
      return "/videos/rooms/room_loop.mp4";
    }

    return "";
  }, [type, portal]);
}
