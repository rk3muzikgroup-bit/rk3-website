// lib/frequencyContent.ts

export type EvidenceBadge =
  | "observed"
  | "studied"
  | "emerging"
  | "traditional";

export type FrequencyContent = {
  id: string;
  title: string;
  category: string;
  primaryUse: string;
  badges: EvidenceBadge[];
  sections: {
    heading: string;
    body: string;
  }[];
};

/* ───────────── TIER 1 — CANONICAL CONTENT ───────────── */

export const FREQUENCY_CONTENT: Record<string, FrequencyContent> = {
  "174": {
    id: "174",
    title: "174 Hz — Somatic Grounding",
    category: "Low-frequency tone",
    primaryUse: "Physical relaxation & nervous system down-regulation",
    badges: ["observed", "studied"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "174 Hz sits at the lower end of the audible spectrum. Lower frequencies are commonly associated with grounding sensations and physical calm due to how the body perceives vibration and sound pressure.",
      },
      {
        heading: "What research suggests",
        body:
          "While 174 Hz itself is not clinically validated as a treatment, studies in sound therapy and music psychology show that low-frequency audio can influence muscle relaxation, perceived physical comfort, and parasympathetic nervous system activity. These effects are context-dependent and vary by individual.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "This frequency is offered as a somatic grounding tool, not a medical intervention. Many users report reduced bodily tension, a sense of physical presence, and easier transition into stillness.",
      },
      {
        heading: "Important clarity",
        body:
          "This session does not treat pain or injury. It supports relaxation and awareness, which may indirectly influence how discomfort is experienced.",
      },
    ],
  },

  "285": {
    id: "285",
    title: "285 Hz — Somatic Restoration",
    category: "Low–mid frequency tone",
    primaryUse: "Physical relaxation & body awareness",
    badges: ["emerging", "traditional"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "285 Hz is traditionally associated with physical restoration themes within alternative sound traditions.",
      },
      {
        heading: "Evidence context",
        body:
          "There is no direct clinical research validating tissue repair or regeneration from this frequency. Its use is based on experiential and symbolic frameworks.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "This frequency is offered as a body-awareness and relaxation environment. Some users report heightened physical awareness, a sense of bodily ease, and improved relaxation during rest.",
      },
      {
        heading: "Important clarity",
        body:
          "This session does not repair tissue or treat injury. It supports calm attention toward bodily sensation only.",
      },
    ],
  },

  "396": {
    id: "396",
    title: "396 Hz — Emotional Grounding",
    category: "Low–mid frequency tone",
    primaryUse: "Emotional grounding & stress reduction",
    badges: ["observed", "traditional"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "396 Hz is commonly used in emotional-release and grounding practices.",
      },
      {
        heading: "Evidence context",
        body:
          "There is no clinical evidence linking this frequency to fear reduction as a medical effect. Reported outcomes are subjective and experiential.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "Users often describe emotional settling, a grounded internal state, and reduced mental agitation.",
      },
      {
        heading: "Important clarity",
        body:
          "This session supports emotional awareness, not psychological treatment.",
      },
    ],
  },

  "417": {
    id: "417",
    title: "417 Hz — Cognitive Reset",
    category: "Mid-range frequency tone",
    primaryUse: "Mental clearing & transition support",
    badges: ["observed", "traditional"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "417 Hz is traditionally framed as a reset or transition frequency.",
      },
      {
        heading: "Evidence context",
        body:
          "Scientific literature does not validate frequency-based cognitive reset. Effects are best understood as attention-based and perceptual.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "This session may support mental quieting, transition between tasks or states, and reflective pause.",
      },
      {
        heading: "Important clarity",
        body:
          "This session does not alter cognition clinically. It provides a neutral auditory field for rest and reset.",
      },
    ],
  },

  "528": {
    id: "528",
    title: "528 Hz — Emotional Coherence",
    category: "Mid-range frequency tone",
    primaryUse: "Emotional regulation & focused attention",
    badges: ["studied", "emerging", "traditional"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "528 Hz is part of the Solfeggio tradition and is often discussed in both scientific and spiritual contexts. It has become widely misrepresented online.",
      },
      {
        heading: "What research actually shows",
        body:
          "Some laboratory studies explore sound, vibration, and biological systems, but no clinical evidence proves DNA repair via 528 Hz. Most strong claims are extrapolations or symbolic interpretations.",
      },
      {
        heading: "Why it is included here",
        body:
          "Users often report emotional steadiness, increased focus, and a sense of internal alignment. These effects are best understood as psychological and perceptual.",
      },
      {
        heading: "Important clarity",
        body:
          "528 Hz is offered as an emotional coherence environment, not a biochemical or medical intervention.",
      },
    ],
  },

  "639": {
    id: "639",
    title: "639 Hz — Emotional Attunement",
    category: "Mid-range frequency tone",
    primaryUse: "Emotional regulation & relational awareness",
    badges: ["observed", "traditional"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "639 Hz is associated with emotional connection and attunement in contemplative traditions.",
      },
      {
        heading: "Evidence context",
        body:
          "There is no clinical evidence for relationship improvement through frequency exposure. Effects are subjective and context-based.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "Users may experience emotional steadiness, reflective awareness, and improved internal regulation.",
      },
      {
        heading: "Important clarity",
        body:
          "This session does not influence relationships directly. It supports internal emotional balance only.",
      },
    ],
  },

  "741": {
    id: "741",
    title: "741 Hz — Mental Clarity",
    category: "Upper-mid frequency tone",
    primaryUse: "Focus & attentive listening",
    badges: ["observed", "traditional"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "741 Hz is often associated with clarity and expression in alternative sound traditions.",
      },
      {
        heading: "Evidence context",
        body:
          "There is no scientific validation for frequency-driven cognitive enhancement.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "Users sometimes report heightened focus, clearer internal dialogue, and sustained attention.",
      },
      {
        heading: "Important clarity",
        body:
          "This session does not improve cognition or speech clinically.",
      },
    ],
  },

  "852": {
    id: "852",
    title: "852 Hz — Introspective Awareness",
    category: "High-mid frequency tone",
    primaryUse: "Quiet introspection & attentional sensitivity",
    badges: ["observed", "traditional"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "852 Hz is traditionally linked with introspection and inward attention.",
      },
      {
        heading: "Evidence context",
        body:
          "There is no clinical evidence supporting intuition enhancement through frequency exposure.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "Users often experience increased listening sensitivity, reflective awareness, and internal stillness.",
      },
      {
        heading: "Important clarity",
        body:
          "This session is experiential and contemplative, not diagnostic.",
      },
    ],
  },

  "963": {
    id: "963",
    title: "963 Hz — Contemplative Awareness",
    category: "High-frequency tone",
    primaryUse: "Deep listening & contemplative states",
    badges: ["observed", "traditional"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "963 Hz occupies the higher range of human hearing and is traditionally associated with contemplative practices.",
      },
      {
        heading: "Evidence context",
        body:
          "There is no clinical research validating 963 Hz as a therapeutic agent.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "Users often describe quieting of internal dialogue and spacious awareness.",
      },
      {
        heading: "Important clarity",
        body:
          "This session is intended for stillness and reflection only.",
      },
    ],
  },

  "432": {
    id: "432",
    title: "432 Hz — Perceptual Harmony",
    category: "Musical reference frequency",
    primaryUse: "Relaxed listening & perceptual balance",
    badges: ["studied", "observed"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "432 Hz is an alternative tuning reference studied in music perception research.",
      },
      {
        heading: "Evidence context",
        body:
          "Research suggests subtle differences in mood and listener perception compared to standard tuning, with no therapeutic claims.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "This frequency provides a calm listening environment and perceptual ease.",
      },
    ],
  },

  "440": {
    id: "440",
    title: "440 Hz — Reference Standard",
    category: "Musical reference frequency",
    primaryUse: "Neutral auditory baseline",
    badges: ["studied"],
    sections: [
      {
        heading: "What this frequency is",
        body:
          "440 Hz is the global standard reference pitch for musical tuning.",
      },
      {
        heading: "Evidence context",
        body:
          "It has no therapeutic function and is included for reference and comparison.",
      },
      {
        heading: "How this session is intended to be used",
        body:
          "As a neutral baseline listening environment only.",
      },
    ],
  },
};
