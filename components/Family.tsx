// pages/family.tsx
import { motion } from "framer-motion";

export default function FamilyFee() {
  const tiers = [
    {
      name: "Silver",
      price: "$5 / month",
      desc: "Stream-only access, limited site access, basic news updates.",
      color: "from-gray-400 to-gray-600",
    },
    {
      name: "Gold",
      price: "$10 / month",
      desc: "Includes Silver + 10 downloads per month + early access features.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "Platinum",
      price: "$25 / month",
      desc: "Full RK3 World access, 25 downloads/mo, exclusive DJ sets, healing library, behind-the-scenes, Vault Journal.",
      color: "from-emerald-400 to-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center py-16 px-6 text-white">
      <h1 className="text-4xl font-bold mb-12">Join the Family Fee</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-8 shadow-2xl bg-gradient-to-br ${tier.color} flex flex-col justify-between`}
          >
            <h2 className="text-2xl font-bold mb-4">{tier.name}</h2>
            <p className="text-lg mb-6">{tier.price}</p>
            <p className="flex-grow mb-6">{tier.desc}</p>
            <button className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:opacity-80 transition">
              Join {tier.name}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
// pages/family.tsx
import { motion } from "framer-motion";

export default function FamilyFee() {
  const tiers = [
    {
      name: "Silver",
      price: "$5 / month",
      desc: "Stream-only access, limited site access, basic news updates.",
      color: "from-gray-400 to-gray-600",
    },
    {
      name: "Gold",
      price: "$10 / month",
      desc: "Includes Silver + 10 downloads per month + early access features.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "Platinum",
      price: "$25 / month",
      desc: "Full RK3 World access, 25 downloads/mo, exclusive DJ sets, healing library, behind-the-scenes, Vault Journal.",
      color: "from-emerald-400 to-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center py-16 px-6 text-white">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-12">Join the Family Fee</h1>

      {/* Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-8 shadow-2xl bg-gradient-to-br ${tier.color} flex flex-col justify-between`}
          >
            <h2 className="text-2xl font-bold mb-4">{tier.name}</h2>
            <p className="text-lg mb-6">{tier.price}</p>
            <p className="flex-grow mb-6">{tier.desc}</p>
            <button className="px-6 py-3 bg-black text-white font-bold rounded-lg hover:opacity-80 transition">
              Join {tier.name}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
// pages/family.tsx
import { useRouter } from "next/router";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold text-red-500 mb-6">
        ❌ Subscription Cancelled
      </h1>
      <p className="text-lg text-center mb-4">
        No worries—your spot in <span className="text-yellow-400">RK3 World</span> will always be here when you’re ready.
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full text-white font-bold shadow-xl hover:scale-105 transform transition"
      >
        Back to Vault
      </button>
    </div>
  );
}
