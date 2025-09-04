import { motion } from "framer-motion";
import NeonTitle from "../../components/NeonTitle";
import AmbientScore from "../../components/AmbientScore";
import { soundMap } from "../../src/styles/utils/soundLoader";
import { imageMap } from "../../src/styles/utils/imageLoader";

export default function Intro() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
      <AmbientScore src={soundMap.intro} />

      <motion.img
        src={imageMap.intro}
        alt="Vault Door Intro"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="w-72 h-72 object-contain mb-8"
      />

      <NeonTitle>🚪 Vault Door Intro</NeonTitle>
    </div>
  );
}
