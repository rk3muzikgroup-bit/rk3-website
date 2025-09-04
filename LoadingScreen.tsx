// components/LoadingScreen.tsx
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mb-6"
      />
      <h1 className="text-xl font-bold tracking-wider text-yellow-400">
        Loading RK3 Portal...
      </h1>
      <p className="mt-2 text-gray-400 text-sm">Street • Soul • Spirit</p>
    </div>
  );
}
