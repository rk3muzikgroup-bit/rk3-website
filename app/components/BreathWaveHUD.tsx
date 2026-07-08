const engine = useSessionEngine();

const level = useAudioWaveform(
  engine.audioCtx,
  engine.outputNode,
  engine.state === "playing"
);

<BreathWaveHUD
  phase={engine.breath?.phase}
  level={level}
/>
