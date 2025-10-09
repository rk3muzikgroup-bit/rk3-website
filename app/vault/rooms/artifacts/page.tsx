"use client";

import CosmicBackground from "@/components/CosmicBackground";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const artifacts = [
  { slug: "aztec-sunstone", name: "Aztec Sun Stone", desc: "The calendar stone — a cosmic map of cycles and time.", img: "/assets/artifacts/aztec_sunstone.png" },
  { slug: "mayan-jade-mask", name: "Mayan Jade Mask", desc: "Carved mask used in rituals of kings and gods.", img: "/assets/artifacts/mayan_jade.png" },
  { slug: "incan-llama", name: "Incan Golden Llama", desc: "Symbol of wealth, sacrifice, and cosmic balance.", img: "/assets/artifacts/incan_llama.png" },
  { slug: "olmec-head", name: "Olmec Colossal Head", desc: "Mysterious stone giant — guardians of the ancient world.", img: "/assets/artifacts/olmec_head.png" },
];

export default function ArtifactsRoomPage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <CosmicBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex flex-col items-center justify-start z-10 p-8 overflow-y-auto"
      >
        <h1 className="text-5xl font-bold mb-10">🏺 Artifacts Wing</h1>
        <div className="grid grid-cols-2 gap-12">
          {artifacts.map((item, i) => (
            <motion.div key={item.slug} className="bg-black/50 backdrop-blur-md rounded-2xl p-6 shadow-xl text-center"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3 }}>
              <div className="w-full h-40 bg-gray-800 rounded-xl flex items-center justify-center mb-4">
                <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
              <p className="text-sm opacity-75 mb-4">{item.desc}</p>
              <button onClick={() => router.push(`/vault/rooms/artifacts/${item.slug}`)} className="px-6 py-3 bg-indigo-600 rounded-xl text-lg shadow-lg hover:scale-105 transition-transform">View Artifact</button>
            </motion.div>
          ))}
        </div>
        <button onClick={() => router.push("/vault/rooms")} className="mt-12 px-8 py-4 bg-gray-800 rounded-xl">⬅ Back to Vault</button>
      </motion.div>
    </div>
  );
}
