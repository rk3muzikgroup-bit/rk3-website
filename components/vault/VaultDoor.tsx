"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlaySound } from "@/hooks/usePlaySound";
import { useAmbient } from "@/hooks/useAmbient";

export default function VaultDoor({
  onUnlock,
  onDenied,
}: {
  onUnlock?: (ride: "street" | "soul" | "spirit") => void;
  onDenied?: () => void;
}) {
  const [status, setStatus] = useState<
    "closed" | "unlock" | "denied" | "closing_long" | "choose"
  >("closed");

  const playSound = usePlaySound();

  // loop hum (ambient slider controlled)
  useAmbient("/sounds/vault/door_hum.mp3");

  const handleUnlock = () => {
    setStatus("unlock");
    playSound("/sounds/vault/unlock.mp3");
    setTimeout(() => setStatus("choose"), 2200);
  };

  const handleDenied = () => {
    setStatus("denied");
    playSound("/sounds/vault/denied_blast.mp3");

    // 🚨 redirect to pathways hub after denied flash
    setTimeout(() => {
      if (onDenied) onDenied();
      setStatus("closed");
    }, 1800);
  };

  const handleClose = () => {
    playSound("/sounds/vault/door_close.mp3");
    setStatus("closed");
  };

  const handleCloseLong = () => {
    setStatus("closing_long");
    playSound("/sounds/vault/closing_long.mp3");
    setTimeout(() => setStatus("closed"), 6000);
  };

  const chooseRide = (ride: "street" | "soul" | "spirit") => {
    playSound("/sounds/ride/transition_whoosh.mp3");
    if (onUnlock) onUnlock(ride);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Overlays */}
      <AnimatePresence>
        {status === "unlock" && (
          <motion.div
            key="unlock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-b from-emerald-600 to-black flex items-center justify-center text-3xl font-extrabold tracking-wide"
          >
            ACCESS GRANTED 🚪✨
          </motion.div>
        )}

        {status === "denied" && (
          <motion.div
            key="denied"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-b from-red-700 to-black flex items-center justify-center text-3xl font-extrabold tracking-wide"
          >
            ACCESS DENIED ❌
          </motion.div>
        )}

        {status === "closing_long" && (
          <motion.div
            key="closing_long"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center text-xl font-semibold text-gray-200"
          >
            DOOR CLOSING...
          </motion.div>
        )}

        {status === "choose" && (
          <motion.div
            key="choose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center gap-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              Choose Your Ride 🚀
            </h2>
            <div className="flex gap-8">
              <button
                onClick={() => chooseRide("street")}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition"
              >
                Street
              </button>
              <button
                onClick={() => chooseRide("soul")}
                className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg transition"
              >
                Soul
              </button>
              <button
                onClick={() => chooseRide("spirit")}
                className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-lg transition"
              >
                Spirit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      {status === "closed" && (
        <div className="z-20 space-x-4">
          <button
            onClick={handleUnlock}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg"
          >
            Unlock
          </button>
          <button
            onClick={handleDenied}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg"
          >
            Deny
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-semibold shadow-lg"
          >
            Close
          </button>
          <button
            onClick={handleCloseLong}
            className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-lg"
          >
            Dramatic Close
          </button>
        </div>
      )}
    </div>
  );
}
