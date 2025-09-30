// components/cockpit/CockpitHUD.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSteering } from "@/context/SteeringContext";
import Orb from "./Orb";
import { useEffect, useState } from "react";

type Alert = { id: number; message: string; color: string };

export default function CockpitHUD() {
  const { x, y } = useSteering();
  const speed = Math.round((y + 1) * 500);
  const steerOffset = Math.round(x * 50);
  const thrustPower = Math.round((y + 1) * 50);

  // Orb state
  const [orbs, setOrbs] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [nextId, setNextId] = useState(0);

  // Alerts
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertId, setAlertId] = useState(0);

  // Flash overlay
  const [flashColor, setFlashColor] = useState<string | null>(null);

  // Orb spawning w/ dynamic color
  useEffect(() => {
    const interval = setInterval(() => {
      let orbColor = "teal"; // default
      if (Math.abs(steerOffset) < 15) orbColor = "dodgerblue"; // smooth steering
      if (thrustPower > 40 && thrustPower < 80) orbColor = "gold"; // mid thrust
      if (Math.abs(steerOffset) > 40 || thrustPower >= 100) orbColor = "red"; // danger

      const newOrb = {
        id: nextId,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        color: orbColor,
      };

      setNextId((id) => id + 1);
      setOrbs((prev) => [...prev, newOrb]);
      setTimeout(() => {
        setOrbs((prev) => prev.filter((orb) => orb.id !== newOrb.id));
      }, 5000);
    }, 6000);
    return () => clearInterval(interval);
  }, [nextId, steerOffset, thrustPower]);

  // Alerts trigger
  useEffect(() => {
    if (Math.abs(steerOffset) > 40) addAlert("EXTREME TURN", "red");
    if (thrustPower >= 100) addAlert("BOOST ACTIVE", "teal");
    if (thrustPower <= 10) addAlert("STANDBY MODE", "gray");
  }, [steerOffset, thrustPower]);

  const addAlert = (message: string, color: string) => {
    const id = alertId;
    setAlertId((prev) => prev + 1);
    setAlerts((prev) => [...prev.slice(-2), { id, message, color }]); // keep last 3
    setFlashColor(color);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 2000);
    setTimeout(() => setFlashColor(null), 600);
  };

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 text-teal-300 font-mono text-sm">
      {/* Flash Overlay */}
      <AnimatePresence>
        {flashColor && (
          <motion.div
            key={flashColor}
            className={`absolute inset-0`}
            style={{
              backgroundColor:
                flashColor === "red"
                  ? "rgba(220,38,38,0.3)"
                  : flashColor === "teal"
                  ? "rgba(45,212,191,0.2)"
                  : "rgba(107,114,128,0.2)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Orbs */}
      <AnimatePresence>
        {orbs.map((orb) => (
          <Orb key={orb.id} x={orb.x} y={orb.y} color={orb.color} />
        ))}
      </AnimatePresence>

      {/* Alerts */}
      <div className="absolute top-4 right-6 space-y-2 z-20">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`px-4 py-2 rounded-lg shadow-md text-white font-bold border border-${alert.color}-300`}
              style={{
                backgroundColor:
                  alert.color === "red"
                    ? "rgba(220,38,38,0.8)"
                    : alert.color === "teal"
                    ? "rgba(45,212,191,0.8)"
                    : "rgba(107,114,128,0.8)",
                textShadow: "0 0 6px rgba(255,255,255,0.8)",
              }}
            >
              {alert.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top HUD */}
      <div className="flex justify-between z-10 drop-shadow-[0_0_4px_rgba(0,255,255,0.8)]">
        <span>RK3 SYSTEMS ONLINE</span>
        <span>SPEED: {speed}</span>
      </div>

      {/* Center HUD Crosshair */}
      <div className="flex justify-center items-center h-full z-10">
        <motion.div
          className="w-24 h-1 bg-teal-400/60 shadow-[0_0_8px_rgba(45,212,191,0.9)]"
          animate={{ x: steerOffset }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between z-10 drop-shadow-[0_0_4px_rgba(0,255,255,0.8)]">
        <span>STEER: {steerOffset}°</span>
        <span>THRUST: {thrustPower}%</span>
      </div>
    </div>
  );
}
