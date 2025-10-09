"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useNowPlaying } from "@/context/NowPlayingContext";
import { useMileage } from "@/context/MileageContext";
import { usePlaySound } from "@/hooks/usePlaySound";
"use client";

import { useEffect, useRef } from "react";

export default function EQMeter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const audioEl = document.getElementById("now-playing-audio") as HTMLAudioElement | null;
    if (!audioEl) return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = ctx.createMediaElementSource(audioEl);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64; // fewer bars = smoother
    source.connect(analyser);
    analyser.connect(ctx.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext("2d");

    const draw = () => {
      if (!canvas || !canvasCtx) return;
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        const gradient = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#00ffcc");
        gradient.addColorStop(1, "#003366");

        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={100}
      className="rounded-md border border-indigo-400 shadow-md bg-black"
    />
  );
}

export default function VaultDashboard() {
  const router = useRouter();
  const { track } = useNowPlaying();
  const { mileage } = useMileage();
  const playSound = usePlaySound();

  const videoRef = useRef<HTMLVideoElement>(null);

  // Gauges
  const [eq, setEq] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [fuel, setFuel] = useState(100);

  useEffect(() => {
    playSound("vault/door_hum");

    // Warp speed ramp
    const speedInterval = setInterval(() => {
      setSpeed((prev) => (prev < 5 ? prev + 0.1 : prev));
    }, 500);

    // Fuel drain
    const fuelInterval = setInterval(() => {
      setFuel((prev) => (prev > 0 ? prev - 0.2 : 0));
    }, 1000);

    // Live EQ analyser
    const audioEl = document.getElementById("now-playing-audio") as HTMLAudioElement | null;
    if (audioEl) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = ctx.createMediaElementSource(audioEl);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyser.connect(ctx.destination);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const tick = () => {
        analyser.getByteFrequencyData(dataArray);
        // Average all freqs
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
        const avg = sum / bufferLength;
        // Normalize to -10 to +10 dB scale
        setEq(Math.floor((avg / 255) * 20) - 10);
        requestAnimationFrame(tick);
      };
      tick();
    }

    return () => {
      clearInterval(speedInterval);
      clearInterval(fuelInterval);
    };
  }, [playSound]);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden text-white">
      {/* Background Cockpit Video */}
      <video
        ref={videoRef}
        src="/videos/cockpit/cockpit_placeholder.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
      />

      {/* HUD */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
        {/* Top HUD */}
        <div className="flex justify-between w-full items-center">
          <span className="font-mono text-sm">
            🎵 Now Playing: <strong>{track}</strong>
          </span>
          <span className="font-mono text-sm">Mileage: {mileage} ✨</span>
        </div>

        {/* Gauges */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div className="w-80 h-80 rounded-full border-8 border-emerald-400 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,200,0.6)]">
            <p className="text-3xl font-bold tracking-wider">COCKPIT DASH</p>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-indigo-900/40 rounded-xl border border-indigo-400 shadow-md">
              <p className="text-sm text-indigo-300">EQ</p>
              <p className="text-lg font-bold">{eq} dB</p>
            </div>
            <div className="p-4 bg-emerald-900/40 rounded-xl border border-emerald-400 shadow-md">
              <p className="text-sm text-emerald-300">SPEED</p>
              <p className="text-lg font-bold">Warp {speed.toFixed(1)}</p>
            </div>
            <div className="p-4 bg-yellow-900/40 rounded-xl border border-yellow-400 shadow-md">
              <p className="text-sm text-yellow-300">FUEL</p>
              <p className="text-lg font-bold">{fuel.toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full flex justify-between">
          <button
            onClick={() => router.push("/pathways")}
            className="px-6 py-3 bg-red-700/80 rounded-xl"
          >
            Exit to Pathways
          </button>
          <button
            onClick={() => router.push("/vault/world")}
            className="px-6 py-3 bg-emerald-700/80 rounded-xl"
          >
            Enter Vault World
          </button>
        </div>
      </div>
    </div>
  );
}
