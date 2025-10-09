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
