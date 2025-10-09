"use client";

import { useEQ } from "@/context/EQContext";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const labels = ["Low", "Low-Mid", "Mid", "High-Mid", "High"];

export default function CockpitEQ() {
  const { bands, setBand, resetEQ } = useEQ();
  const [freqData, setFreqData] = useState<number[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current = analyser;

    const update = () => {
      analyser.getByteFrequencyData(dataArray);
      setFreqData(Array.from(dataArray));
      requestAnimationFrame(update);
    };
    update();
  }, []);

  const colorMap = ["#f87171", "#34d399", "#60a5fa", "#a78bfa", "#ec4899"];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 
                    bg-black/70 backdrop-blur-xl 
                    p-6 rounded-2xl shadow-2xl flex gap-10 z-50 border border-emerald-400/40">
      
      {/* EQ Sliders */}
      <div className="flex gap-6">
        {bands.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.input
              type="range"
              min={-12}
              max={12}
              value={val}
              onChange={(e) => setBand(i, parseFloat(e.target.value))}
              className="w-28 h-2 rotate-[-90deg] accent-emerald-400"
              whileTap={{ scale: 1.1 }}
            />
            <span className="mt-4 text-xs text-white opacity-80">{labels[i]}</span>
          </div>
        ))}
      </div>

      {/* Visualizer Bars */}
      <div className="flex items-end gap-2 w-56 h-32">
        {freqData.slice(0, 20).map((val, i) => (
          <motion.div
            key={i}
            className="rounded-md shadow-lg"
            style={{
              width: "6px",
              background: `linear-gradient(to top, ${colorMap[i % colorMap.length]}, transparent)`,
            }}
            animate={{ height: `${(val / 255) * 100}%` }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetEQ}
        className="ml-6 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm shadow-[0_0_12px_rgba(16,185,129,0.8)]"
      >
        Reset
      </button>
    </div>
  );
}
