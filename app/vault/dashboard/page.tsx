"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNowPlaying } from "@/context/NowPlayingContext";
import { useMileage } from "@/context/MileageContext";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useExitCinematic } from "@/hooks/useExitCinematic";
import EQMeter from "@/components/EQMeter";
import ProfileEditor from "@/components/ProfileEditor";
import PilotBadge from "@/components/PilotBadge";

// 🎭 Fake user until DB integration
const mockUser = {
  username: "richkiddd",
  info: "Street • Soul • Spirit Explorer",
  avatar: "/avatars/default.png",
  badgeNumber: 7,
};

export default function VaultDashboard() {
  const router = useRouter();
  const { track } = useNowPlaying();
  const { mileage } = useMileage();
  const playSound = usePlaySound();
  const { triggerExit } = useExitCinematic(); // 🎥 shared cinematic exit
  const videoRef = useRef<HTMLVideoElement>(null);

  // profile state
  const [username, setUsername] = useState(mockUser.username);
  const [info, setInfo] = useState(mockUser.info);

  // gauges + nav
  const [speed, setSpeed] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [altitude, setAltitude] = useState(137011);
  const [heading, setHeading] = useState(0);

  // cinematic entry
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // vault unlock sound + intro
    playSound("vault/unlock");
    setTimeout(() => setEntered(true), 2500);

    // cockpit hum loop
    playSound("vault/door_hum", { loop: true, volume: 0.3 });

    const speedInterval = setInterval(() => {
      setSpeed((prev) => (prev < 5 ? prev + 0.1 : prev));
    }, 500);

    const fuelInterval = setInterval(() => {
      setFuel((prev) => (prev > 0 ? prev - 0.2 : 0));
    }, 1000);

    const coordInterval = setInterval(() => {
      setLongitude((prev) => (prev + 0.05) % 360);
      setLatitude((prev) => (prev + 0.02) % 180);
      setHeading((prev) => (prev + 2) % 360);
      setAltitude((prev) => prev + 12);
    }, 1000);

    return () => {
      clearInterval(speedInterval);
      clearInterval(fuelInterval);
      clearInterval(coordInterval);
    };
  }, [playSound]);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden text-white">
      {/* 🎥 Cockpit Background */}
      <motion.video
        ref={videoRef}
        src="/videos/cockpit/cockpit_placeholder.mp4"
        autoPlay
        loop
        muted
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 0.7 : 0 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Dark overlay until entered */}
      {!entered && (
        <motion.div
          className="absolute inset-0 bg-black z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2, delay: 2 }}
        >
          <h1 className="text-4xl font-bold text-emerald-400 tracking-widest">
            🔑 ACCESS GRANTED
          </h1>
        </motion.div>
      )}

      {/* HUD Overlay */}
      {entered && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
          
          {/* 🔝 Top HUD */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full flex justify-between items-center font-mono text-sm"
          >
            <span className="drop-shadow-[0_0_8px_rgba(0,255,200,0.8)]">
              🎵 Now Playing: <strong>{track}</strong>
            </span>

            {/* 👤 Username + Info Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="text-xl font-bold text-emerald-300 flex items-center gap-2"
                style={{ textShadow: "0 0 12px rgba(0,255,200,0.9)" }}
              >
                {username.toUpperCase()}
                <ProfileEditor
                  username={username}
                  info={info}
                  onSave={(newName, newInfo) => {
                    setUsername(newName);
                    setInfo(newInfo);
                  }}
                />
              </motion.p>
              <p className="text-sm text-gray-300 italic">{info}</p>
            </div>

            <span className="drop-shadow-[0_0_8px_rgba(0,200,255,0.8)]">
              Mileage: {mileage} ✨
            </span>
          </motion.div>

          {/* 📊 Gauges + Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-center opacity-70 space-y-2"
          >
            <p>🚀 Speed: {speed.toFixed(1)} Mach</p>
            <p>⛽ Fuel: {fuel.toFixed(1)}%</p>
            <p>🌍 Coords: {longitude.toFixed(2)}° / {latitude.toFixed(2)}°</p>
            <p>🛸 Altitude: {altitude} ft</p>
            <p>🧭 Heading: {heading}°</p>
          </motion.div>

          {/* 🎛 EQ + Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 flex flex-col items-center gap-6"
          >
            <EQMeter />
            <PilotBadge badgeNumber={mockUser.badgeNumber} />
          </motion.div>

          {/* 🔙 Exit Button */}
          <motion.button
            onClick={() => triggerExit("/vault/rooms")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="mt-10 px-8 py-4 bg-gray-800 rounded-xl text-lg font-semibold hover:bg-gray-700"
          >
            ⬅ Back to Vault Rooms
          </motion.button>
        </div>
      )}
    </div>
  );
}
