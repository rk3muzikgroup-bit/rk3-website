"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { usePilot } from "@/context/PilotContext";
import PilotBadge from "@/components/PilotBadge";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { pilot, setPilot, logout, fleet } = usePilot();
  const params = useParams<{ username: string }>();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [portal, setPortal] = useState<"street" | "soul" | "spirit">("street");

  useEffect(() => {
    if (pilot) {
      setUsername(pilot.username);
      setPortal(pilot.portal as any);
    }
  }, [pilot]);

  if (!pilot || pilot.username !== params.username) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>No profile found. Please create one first.</p>
      </main>
    );
  }

  const handleSave = () => {
    setPilot({
      ...pilot,
      username,
      portal,
    });
    setEditing(false);
  };

  const toggleActive = () => {
    setPilot({
      ...pilot,
      active: pilot.active === false ? true : false,
    });
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-neutral-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-lg w-full text-center"
      >
        {/* Pilot Badge */}
        <PilotBadge
          avatar={pilot.avatar}
          badgeNumber={pilot.badgeNumber}
          username={pilot.username}
          portal={pilot.portal}
        />

        {/* Info */}
        {editing ? (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <select
              value={portal}
              onChange={(e) => setPortal(e.target.value as any)}
              className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="street">Street</option>
              <option value="soul">Soul</option>
              <option value="spirit">Spirit</option>
            </select>

            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md font-semibold shadow-md"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-gray-300">Username: {pilot.username}</p>
            <p className="text-gray-300">Portal: {pilot.portal}</p>
            <p className="text-gray-300">Badge #: {pilot.badgeNumber}</p>
            <p className="text-gray-300">
              Status:{" "}
              {pilot.active === false ? "⚫ Ghost Ship" : "🟢 Active Pilot"}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow-md"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Ghost Toggle */}
        <button
          onClick={toggleActive}
          className={`mt-6 w-full px-4 py-2 rounded-md font-semibold shadow-md ${
            pilot.active === false
              ? "bg-emerald-600 hover:bg-emerald-500"
              : "bg-yellow-600 hover:bg-yellow-500"
          }`}
        >
          {pilot.active === false ? "☀️ Reactivate Ship" : "⚫ Deactivate (Ghost)"}
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            router.push("/profile/create");
          }}
          className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md shadow-md"
        >
          Log Out
        </button>
      </motion.div>
    </main>
  );
}
