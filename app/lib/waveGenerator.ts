import {
  type FrequencyEntry,
  type PureFrequency,
  type BaseBathFrequency,
  type BinaryFrequency,
  type ChainFrequency,
  getFrequencyById,
} from "@/lib/frequencyCatalog";

/* ───────────── ENGINE TYPES ───────────── */

export type WaveLayer = {
  hz: number;
  gain?: number;
  pan?: number; // -1 left | 0 center | 1 right
};

export type WaveStep = {
  layers: WaveLayer[];
  /**
   * Duration in milliseconds.
   * Undefined = continuous (engine-controlled)
   */
  durationMs?: number;
};

export type WavePlan = {
  id: string;
  label: string;
  steps: WaveStep[];
};

/* ───────────── GENERATOR ───────────── */

export function generateWavePlan(
  entry: FrequencyEntry
): WavePlan {
  switch (entry.type) {
    case "pure":
      return generatePure(entry);

    case "base-bath":
      return generateBaseBath(entry);

    case "binary":
      return generateBinary(entry);

    case "chain":
      return generateChain(entry);

    default:
      // Exhaustive guard (future-proof)
      throw new Error(
        `Unsupported frequency type: ${(entry as any)?.type}`
      );
  }
}

/* ───────────── PURE ───────────── */

function generatePure(
  entry: PureFrequency
): WavePlan {
  return {
    id: entry.id,
    label: entry.label,
    steps: [
      {
        layers: [
          {
            hz: entry.hz,
            gain: 1,
            pan: 0,
          },
        ],
      },
    ],
  };
}

/* ───────────── BASE BATH ───────────── */

function generateBaseBath(
  entry: BaseBathFrequency
): WavePlan {
  return {
    id: entry.id,
    label: entry.label,
    steps: [
      {
        layers: entry.layers.map(l => ({
          hz: l.hz,
          gain: l.gain ?? 0.5,
          pan: l.pan ?? 0,
        })),
      },
    ],
  };
}

/* ───────────── BINARY ───────────── */

function generateBinary(
  entry: BinaryFrequency
): WavePlan {
  const layers: WaveLayer[] = [
    {
      hz: entry.leftHz,
      pan: -1,
      gain: 0.5,
    },
    {
      hz: entry.rightHz,
      pan: 1,
      gain: 0.5,
    },
  ];

  if (entry.carrierHz) {
    layers.push({
      hz: entry.carrierHz,
      pan: 0,
      gain: 0.3,
    });
  }

  return {
    id: entry.id,
    label: entry.label,
    steps: [{ layers }],
  };
}

/* ───────────── CHAINS ───────────── */

function generateChain(
  entry: ChainFrequency
): WavePlan {
  const steps: WaveStep[] = [];

  for (const step of entry.steps) {
    const ref = getFrequencyById(step.refId);
    if (!ref) continue;

    const plan = generateWavePlan(ref);

    plan.steps.forEach(s => {
      steps.push({
        layers: s.layers,
        durationMs: step.durationMs,
      });
    });
  }

  return {
    id: entry.id,
    label: entry.label,
    steps,
  };
}
