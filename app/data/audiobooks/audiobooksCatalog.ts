export type RKS3AudiobookStatus =
  | "Blueprint"
  | "In Progress"
  | "Audio Ready"
  | "Published";

export type RKS3Audiobook = {
  id: string;
  title: string;
  category: string;
  narrator: string;
  runtime: string;
  status: RKS3AudiobookStatus;
  frequency?: string;
  audioBasePath?: string;
  relatedBookId?: string;
  sections: string[];
};

const AUDIOBOOK_R2_BASE =
  "https://pub-da716ca4c7ab49abbc22db919c726c8b.r2.dev/audio/rks3/audiobooks";

export const audiobooksCatalog: RKS3Audiobook[] = [
  {
    id: "kybalion",
    title: "The Kybalion",
    category: "Sacred Codex",
    narrator: "RKS3 Guide Voice",
    runtime: "Multi-section",
    status: "Audio Ready",
    frequency: "Hermetic Law • Mentalism • Vibration",
    audioBasePath: `${AUDIOBOOK_R2_BASE}/kybalion`,
    sections: [
      "All Is Mind",
      "Principle of Awareness",
      "Principle of Mentalism",
      "Principle of Pattern",
      "Principle of Reflection",
      "Principle of Alignment",
      "Principle of Transformation",
      "Principle of Vibration",
    ],
  },
  {
  id: "the-rks3-initiation",
  title: "The RKS3 Initiation",
  category: "Orientation Manual",
  narrator: "Jane — Professional Audiobook Reader",
  runtime: "7:21",
  status: "Audio Ready",
  frequency: "Entry • Alignment • Awareness",
  audioBasePath: `${AUDIOBOOK_R2_BASE}/the-rks3-initiation-v2.0`,
  relatedBookId: "the-rks3-initiation",
  sections: [
    "Opening",
    "Before You Enter",
    "Street • Soul • Spirit",
    "How to Use This World",
    "Your First Step",
  ],
},
 {
  id: "orientation-chamber",
  title: "Orientation Chamber",
  category: "RKS3 Entry",
  narrator: "RKS3 Guide Voice",
  runtime: "Orientation",
  status: "Audio Ready",
  frequency: "Entry • Grounding • Alignment",
  audioBasePath: "/audio/audiobooks/orientation-chamber",
  sections: ["Orientation"],
},
{
  id: "from-bones-to-breath",
  title: "From Bones To Breath",
  category: "Living Archive",
  narrator: "RK3",
  runtime: "5 Sections",
  status: "Audio Ready",
  frequency: "Creation • Memory • Resurrection",
  audioBasePath: `${AUDIOBOOK_R2_BASE}/from-bones-to-breath`,
  relatedBookId: "from-bones-to-breath",
  sections: [
    "The Skeleton",
    "The Signal",
    "The Vault",
    "The Portal",
    "The Breath",
  ],
},
{
  id: "the-frequency-manual",
  title: "The Frequency Manual",
  category: "Frequency Manual",
  narrator: "RKS3 Guide Voice",
  runtime: "5 Sections",
  status: "Audio Ready",
  frequency: "Resonance • Breath • Nervous System",
  audioBasePath: `${AUDIOBOOK_R2_BASE}/the-frequency-manual`,
  relatedBookId: "the-frequency-manual",
  sections: [
    "What Frequency Means",
    "Sound and the Body",
    "Breath as the Tuner",
    "The RKS3 Frequency Portal",
    "How to Listen With Intention",
  ],
},
];

export function getAudiobookById(id: string) {
  return audiobooksCatalog.find((book) => book.id === id);
}