"use client";

import { motion } from "framer-motion";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useWarp } from "@/hooks/useWarp";
import { useFleetTelemetry } from "@/context/ShipTelemetryContext";
import PilotBadge from "@/components/PilotBadge";

const fleet = [
  { id: 1, username: "rk3", avatar: "/avatars/default.png", portal: "soul", active: true },
  { id: 2, username: "isis", avatar: "/avatars/astronaut.png", portal: "spirit", active: true },
  { id: 3, username: "yang", avatar: "/avatars/orb.png", portal: "street", active: false },
];

export default function FleetLog() {
  const playSound = usePlaySound();
  const { warpTo, overlay } = useWarp("fleet");
  const telemetry = useFleetTelemetry();

  return (
    <div className="w-screen h-screen bg-black text-white relative overflow-hidden">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-emerald-300 mb-8 text-center"
        style={{ textShadow: "0 0 16px rgba(0,255,200,0.9)" }}
      >
        🚀 Fleet Log
      </motion.h1>

      {/* Grid of Badges */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-10 justify-items-center">
        {fleet.map((pilot, idx) => {
          const t = telemetry[pilot.username] || null;
          return (
            <motion.div
              key={pilot.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => {
                if (pilot.active) {
                  playSound("vault/unlock");
                  warpTo(`/profile/${pilot.username}`);
                } else {
                  playSound("vault/denied_blast");
                  alert("⚫ Ghost Ship — pilot inactive.");
                }
              }}
              className="flex flex-col items-center cursor-pointer"
            >
              <PilotBadge
                avatar={pilot.avatar}
                badgeNumber={pilot.id}
                username={pilot.username}
                portal={pilot.portal as "street" | "soul" | "spirit"}
              />

              {/* Telemetry HUD under each badge */}
              {t && (
                <div className="mt-2 text-[10px] text-emerald-300 font-mono text-center space-y-1">
                  <p>Alt: {t.altitude.toFixed(0)} mi</p>
                  <p>Spd: {t.speed.toFixed(2)} km/s</p>
                  <p>Lat: {t.lat.toFixed(2)}°</p>
                  <p>Lon: {t.lon.toFixed(2)}°</p>
                </div>
              )}

              {/* Ghost overlay */}
              {!pilot.active && (
                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-black/60"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {overlay}
    </div>
  );
}
