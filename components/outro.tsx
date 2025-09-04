import { motion } from "framer-motion";
import NeonTitle from "../../components/NeonTitle";
import AmbientScore from "../../components/AmbientScore";
import { soundMap } from "../../src/styles/utils/soundLoader";
import { imageMap } from "../../src/styles/utils/imageLoader";

export default function Outro() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <AmbientScore src={soundMap.outro} />

      <motion.img
        src={imageMap.outro}
        alt="Final Outro"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="w-72 h-72 object-contain mb-8"
      />

      <NeonTitle>🌌 Outro</NeonTitle>
    </div>
  );
}