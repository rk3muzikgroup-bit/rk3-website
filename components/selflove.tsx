// pages/selflove.tsx
import { useEffect, useState } from "react";
import MissionIntro from "@/components/MissionIntro";
import { motion } from "framer-motion";

export default function SelfLove() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {showIntro ? (
        <MissionIntro
          title="💖 Self-Love Mission"
          description="The deepest healing begins within.  
          This path teaches you to embrace your scars as stars.  
          Self-love is the fuel for every other mission."
        />
      ) : (
        <motion.div
          className="p-8 text-center max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold mb-4">💖 Self-Love Mission</h1>
          <p className="text-lg leading-relaxed text-gray-300">
            To love yourself is to honor the temple of spirit within.  
            This mission restores balance, dissolves judgment,  
            and teaches you to walk as your own best friend.  
          </p>
        </motion.div>
      )}
    </div>
  );
}
