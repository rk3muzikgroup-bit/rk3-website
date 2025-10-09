"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePilot } from "@/context/PilotContext";
import { motion } from "framer-motion";

// Static avatar options (later replace with upload)
const avatarOptions = [
  "/avatars/default.png",
  "/avatars/astronaut.png",
  "/avatars/orb.png",
];

const portals = ["street", "soul", "spirit"];

export default function CreateProfilePage() {
  const { setPilot } = usePilot();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(avatarOptions[0]);
  const [portal, setPortal] = useState(portals[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Assign a random badge # for now (later = DB auto increment)
    const badgeNumber = Math.floor(Math.random() * 9000) + 1000;

    setPilot({
      username,
      avatar,
      badgeNumber,
      portal: portal as "street" | "soul" | "spirit",
    });

    // Warp into cockpit after profile created
    router.push("/cockpit");
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-neutral-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-emerald-300 text-center">
          🚀 Create Your Pilot Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Avatar Picker */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Choose Avatar</label>
            <div className="flex gap-4">
              {avatarOptions.map((a) => (
                <div
                  key={a}
                  onClick={() => setAvatar(a)}
                  className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                    avatar === a
                      ? "border-emerald-400 scale-110"
                      : "border-gray-600"
                  }`}
                  style={{
                    backgroundImage: `url(${a})`,
                    backgroundSize: "cover",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Portal Picker */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Choose Portal</label>
            <select
              value={portal}
              onChange={(e) => setPortal(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {portals.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-md font-semibold shadow-md"
          >
            Create Profile
          </button>
        </form>
      </motion.div>
    </main>
  );
}
