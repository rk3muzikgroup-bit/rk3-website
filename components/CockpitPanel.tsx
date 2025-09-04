// components/CockpitPanel.tsx
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function CockpitPanel() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const buttons = [
    { label: "🚦 Street", path: "/street" },
    { label: "💜 Soul", path: "/soul" },
    { label: "✨ Spirit", path: "/spirit" },
    { label: "⚡ God Mode", path: "/godmode" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {buttons.map((btn, index) => (
        <motion.button
          key={index}
          onClick={() => handleNavigation(btn.path)}
          className="px-6 py-4 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {btn.label}
        </motion.button>
      ))}
    </div>
  );
}
