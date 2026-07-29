export type RKS3BookStatus =
  | "Blueprint"
  | "In Progress"
  | "Audio Ready"
  | "Published";

export type RKS3BookType =
  | "Flagship"
  | "Codex"
  | "Frequency Manual"
  | "Healing Guide"
  | "Creator Journal"
  | "Poetry"
  | "Archive";

export type RKS3ReadingMode = "Read Ready" | "Audio Ready" | "Living Book";

export type RKS3BookSection = {
  title: string;
  subtitle?: string;
  body: string[];
};

export type RKS3StudyKeyTerm = {
  term: string;
  definition: string;
};

export type RKS3SectionStudy = {
  title: string;
  coreIdea: string;
  esotericLayer: string;
  practicalLayer: string;
  prompts: string[];
  integrationPractice: string;
};

export type RKS3StudyGuide = {
  thesis: string;
  esotericNotes: string[];
  practicalApplications: string[];
  keyTerms: RKS3StudyKeyTerm[];
  sectionStudies: RKS3SectionStudy[];
  crossReferences: string[];
  researchStandard: string;
  rks3Position: string;
};

export type RKS3Book = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  type: RKS3BookType;
  status: RKS3BookStatus;
  readingMode: RKS3ReadingMode;
  portalLane: "Street" | "Soul" | "Spirit" | "Unified";
  frequency: string;
  mood: string;
  coverSrc: string;
  audiobookId?: string;
  sections: string[];
  description: string;
  readerSections: RKS3BookSection[];
  studyGuide?: RKS3StudyGuide;
};

export const booksCatalog: RKS3Book[] = [
  {
    id: "from-bones-to-breath",
    title: "From Bones To Breath",
    subtitle: "The Making of a Living Digital World",
    author: "RK3",
    type: "Flagship",
    status: "Audio Ready",
readingMode: "Living Book",
    portalLane: "Unified",
    frequency: "Creation • Memory • Resurrection",
    mood: "Cinematic, reflective, sacred, futuristic",
    coverSrc: "/books/covers/from-bones-to-breath.jpg",
    audiobookId: "from-bones-to-breath",
    sections: ["The Skeleton", "The Signal", "The Vault", "The Portal", "The Breath"],
    description:
      "The flagship RKS3 book and documentary blueprint tracing the journey from raw framework to living experience.",
    readerSections: [
      {
        title: "The Skeleton",
        subtitle: "Where the framework became the first body.",
        body: [
          "Before RKS3 had breath, it had bones. The bones were the routes, the folders, the first portals, the first rooms, the first sounds, and the first decisions that refused to stay as ideas.",
          "A skeleton does not look alive to everybody. To the builder, it is already speaking. Every file, every route, every working page becomes a rib in the body of the world.",
          "Most people only see the finished structure. They do not see the thousands of tiny alignments required before a system begins responding like a living organism.",
          "The first victories were not glamorous. A route finally loading. A portal transition finally stabilizing. A frequency session finally flowing without breaking. These moments became proof that the world wanted to exist.",
          "The skeleton phase teaches discipline. It teaches patience. It teaches the difference between fantasy and architecture.",
          "From Bones To Breath begins here: with structure. Not glamour. Not perfection. Structure. Because every living digital world needs a frame strong enough to hold spirit.",
        ],
      },
      {
        title: "The Signal",
        subtitle: "When the system started answering back.",
        body: [
          "The signal appeared when the pieces began connecting. The Frequency Portal was no longer just sound. The Codex was no longer just text. The Audiobook Room was no longer just playback.",
          "The signal was the moment RKS3 started behaving like an ecosystem instead of disconnected pages.",
          "Atmosphere began responding to intention. Rooms began carrying emotional identity. Navigation stopped feeling mechanical and started feeling cinematic.",
          "The signal is important because this is where belief changes. The builder no longer feels like they are constructing an idea. They realize they are tuning a living field.",
          "Some signals arrive as visuals. Others arrive as sound, timing, rhythm, memory, alignment, or emotional confirmation.",
          "That signal became proof: the world was no longer being imagined. It was being tuned.",
        ],
      },
      {
        title: "The Vault",
        subtitle: "The chamber where memory is preserved.",
        body: [
          "Every meaningful world eventually requires a vault. A protected place where the mission, the archives, the sounds, the books, and the truths can survive beyond trends.",
          "The vault is not only storage. It is continuity. It is memory with intention.",
          "Inside RKS3, the vault became symbolic of preservation. Not hoarding. Preservation.",
          "The music, the codex, the frequencies, the books, the avatars, the portals, the philosophies, and the experiences all needed a place where they could evolve without losing identity.",
          "The vault mindset changes the way creators build. Instead of creating for temporary attention, the builder starts creating for legacy.",
          "That shift changes everything.",
        ],
      },
      {
        title: "The Portal",
        subtitle: "Where entry becomes transformation.",
        body: [
          "A normal website delivers information. A portal delivers transition.",
          "The difference matters. RKS3 was never meant to feel like static media. It was designed as movement between emotional, spiritual, educational, and sensory states.",
          "A portal changes atmosphere before it changes information.",
          "This realization transformed the architecture completely. Every room began carrying emotional intention. Every transition became part of the story.",
          "The Living Room, the Frequency Wing, the Sacred Library, the Audiobook Chambers, and the future worlds all became pieces of a larger journey instead of isolated pages.",
          "The portal phase is where the ecosystem stops behaving like content and begins behaving like experience.",
        ],
      },
      {
        title: "The Breath",
        subtitle: "When the machine became an experience.",
        body: [
          "Breath is what happens when structure gains presence.",
          "The user enters, listens, reads, studies, moves, returns, and slowly begins forming a relationship with the world.",
          "The breath is not hidden in the code. It is hidden in pacing, atmosphere, emotional continuity, sound, silence, light, movement, and intention.",
          "This is the RKS3 lane: not dead files, not flat pages, not basic media. Living rooms. Living books. Living portals.",
          "The breath is the promise that every piece of the ecosystem will serve the mind, the body, and the heart.",
          "And once a digital world gains breath, it is no longer just software.",
          "It becomes presence.",
        ],
      },
    ],
  },
    {
  id: "the-rks3-initiation",
  title: "The RKS3 Initiation",
  subtitle: "Street • Soul • Spirit Entry Guide",
  author: "RK3",
  type: "Archive",
  status: "Audio Ready",
  readingMode: "Audio Ready",
  portalLane: "Unified",
  frequency: "Alignment • Entry • Awakening",
  mood: "Grounded, clear, welcoming, direct",
  coverSrc: "/books/covers/rks3-initiation.jpg",
  audiobookId: "the-rks3-initiation",
  sections: [
    "Before You Enter",
    "Street • Soul • Spirit",
    "How to Use This World",
    "Your First Step",
  ],
  description:
    "A first-entry guide explaining why RKS3 exists, how to approach it, and what to do first.",
  readerSections: [
    {
      title: "Before You Enter",
      body: [
        "Before you enter, understand this:",
        "RKS3 was not built to give you more content.",
        "It was built to give you a different relationship with content.",
        "Most digital spaces are designed to capture attention, accelerate movement, and keep people consuming. RKS3 was designed with another purpose: to create room for music, knowledge, reflection, creativity, healing practices, and conscious personal growth to exist together inside one intentional world.",
        "Every chamber has a reason. Every sound has a purpose. Every transition is part of the experience.",
        "You are not expected to rush through everything, understand everything immediately, or visit every room in one session. RKS3 is not a checklist. It is an environment you can return to as your needs, questions, and awareness change.",
        "This world was also built with a vault mindset.",
        "A vault is more than storage. It protects continuity. It preserves music, writings, teachings, experiences, memories, and ideas so they are not lost beneath temporary trends or algorithms.",
        "RKS3 was built for that kind of continuity.",
        "It is a growing digital archive, creative sanctuary, study environment, and living record of what we discover while building, healing, questioning, creating, and becoming.",
        "The initiation begins when you stop treating this as another website and begin approaching it as a place.",
      ],
    },
    {
      title: "Street • Soul • Spirit",
      body: [
        "RKS3 moves through three connected lanes: Street, Soul, and Spirit.",
        "They are not rankings. One is not higher than another. They represent different dimensions of the same human experience.",
        "Street is lived reality.",
        "It includes survival, discipline, pressure, responsibility, movement, rhythm, struggle, work, and the lessons learned through direct experience. Street keeps the system grounded. It reminds us that wisdom must remain connected to real life.",
        "Soul is the emotional and creative dimension.",
        "It includes music, memory, relationships, expression, beauty, grief, love, imagination, and restoration. Soul gives language to what people feel but may not always know how to explain.",
        "Spirit is the dimension of awareness and deeper inquiry.",
        "It includes philosophy, sacred study, consciousness, symbolism, contemplation, purpose, and the questions that reach beyond immediate appearances.",
        "Many systems separate these dimensions.",
        "RKS3 reconnects them.",
        "You may enter through music and discover reflection. You may enter through study and uncover emotion. You may enter through lived experience and begin asking spiritual questions.",
        "The lanes are not boxes. They are pathways.",
        "Move through the lane that meets you where you are.",
      ],
    },
    {
      title: "How to Use This World",
      body: [
        "You do not need to consume RKS3 all at once.",
        "Begin with one honest question:",
        "What do I need from this space today?",
        "You may need energy.",
        "You may need stillness.",
        "You may need music, information, perspective, creative momentum, spiritual study, or a place to breathe and reset.",
        "Choose one chamber that matches that need.",
        "Enter it without pressure. Give it your attention. Stay for five minutes, ten minutes, or longer when the experience calls for it. When something speaks to you, pause. Reflect. Write it down. Return to it later.",
        "Do not measure the value of a session by how much material you completed.",
        "One useful insight is enough.",
        "One honest emotional release is enough.",
        "One new question is enough.",
        "One action you can carry back into your life is enough.",
        "RKS3 does not ask you to accept every idea without examination. It is not a doctrine, a competition for spiritual status, or a replacement for qualified medical, psychological, legal, or religious guidance.",
        "Some chambers present documented history or established knowledge. Others explore traditional teachings, personal experience, interpretation, creative expression, or original RKS3 synthesis.",
        "Pay attention to those distinctions.",
        "Study carefully. Question responsibly. Keep what produces clarity, integrity, and constructive growth. Continue researching what remains uncertain.",
        "Awareness is the path—not blind agreement.",
      ],
    },
    {
      title: "Your First Step",
      body: [
        "The Living Room is the center of the RKS3 experience.",
        "It was designed as a place to pause, orient yourself, and choose your direction before entering deeper chambers.",
        "When you arrive, do not worry about seeing everything.",
        "Look through the available portals. Notice what naturally holds your attention. Choose one.",
        "You might enter the Music Portal and allow sound to shift the atmosphere around you.",
        "You might enter an Audiobook Chamber and study one section slowly.",
        "You might visit the Frequency Portal for focused listening, breathing, or reflection.",
        "You might enter a knowledge chamber because a question has been following you.",
        "Whatever you choose, enter with intention.",
        "Before the session, name what you are seeking.",
        "During the session, remain present.",
        "After the session, identify one thing you learned, felt, questioned, or intend to practice.",
        "Then leave space for integration.",
        "RKS3 will continue growing. New rooms, books, music, studies, tools, and experiences will emerge over time. You are not required to chase every expansion.",
        "The purpose is not to become lost inside another digital world.",
        "The purpose is to use this world to return more consciously to your own.",
        "The door is open.",
        "Enter the Living Room.",
        "Choose one chamber.",
        "Begin where your awareness leads you.",
      ],
    },
  ],
},
  {
    id: "the-frequency-manual",
    title: "The Frequency Manual",
    subtitle: "Sound, Breath, Focus, and Inner Alignment",
    author: "RK3",
    type: "Frequency Manual",
    status: "Audio Ready",
    readingMode: "Audio Ready",
    portalLane: "Spirit",
    frequency: "Resonance • Breath • Nervous System",
    mood: "Clean, calm, scientific, spiritual",
    coverSrc: "/books/covers/frequency-manual.jpg",
    audiobookId: "the-frequency-manual",
    sections: ["What Frequency Means", "Sound and the Body", "Breath as the Tuner", "The RKS3 Frequency Portal", "How to Listen With Intention"],
    description:
      "The official companion manual for the Frequency Portal, designed to teach users how to work with sound intentionally.",
    readerSections: [
      {
        title: "What Frequency Means",
        subtitle: "The first language of the field.",
        body: [
          "Frequency is not only a sound. It is a pattern of movement, repetition, pressure, rhythm, and response.",
          "Everything in existence expresses some form of frequency: thought, emotion, breath, light, sound, nervous system activity, biological cycles, and environmental resonance.",
          "Inside RKS3, frequency becomes a practical tool instead of abstract theory.",
          "The goal is not blind belief. The goal is intentional observation.",
          "Different frequencies can influence atmosphere, emotional pacing, attention, relaxation, meditation depth, breath rhythm, and mental focus.",
          "The first step is learning how to listen with awareness instead of passive consumption.",
        ],
      },
      {
        title: "Sound and the Body",
        subtitle: "The nervous system is always listening.",
        body: [
          "The human body constantly responds to sound whether the listener notices it consciously or not.",
          "Music can increase tension or release it. Rhythm can activate movement or slow the nervous system. Atmosphere can create stress or restoration.",
          "Inside RKS3, sound is treated as environmental architecture.",
          "This means frequencies are not used only for entertainment. They are used to shape emotional space, mental focus, breathing pace, and energetic tone.",
          "Even silence becomes important because silence changes how sound is perceived.",
          "The body does not only hear frequency. The body experiences it.",
        ],
      },
      {
        title: "Breath as the Tuner",
        subtitle: "Breathing changes the experience.",
        body: [
          "Breath is one of the fastest ways to influence physical and emotional state.",
          "Fast breathing can increase stimulation and urgency. Slow breathing can encourage calm, regulation, and internal awareness.",
          "This is why the RKS3 Frequency Portal often pairs breath pacing with audio environments.",
          "Breath becomes the tuning mechanism between the body and the sound field.",
          "When breathing and sound begin synchronizing, the user often experiences deeper immersion and stronger emotional continuity.",
          "The breath is not separate from the experience. The breath is part of the interface itself.",
        ],
      },
      {
        title: "The RKS3 Frequency Portal",
        subtitle: "A living sound environment.",
        body: [
          "The Frequency Portal was designed as more than a playlist system.",
          "It operates as a living environment where sound, atmosphere, transitions, breath pacing, visuals, timing, and intention all work together.",
          "Some sessions are grounding. Some are restorative. Some encourage focus. Others support reflection, meditation, or creative flow.",
          "The goal is not overwhelming complexity. The goal is meaningful alignment.",
          "This is why the portal includes evolving modes, ambient transitions, breathing systems, intelligent session flow, and emotional pacing.",
          "The Frequency Portal transforms listening into environmental experience.",
        ],
      },
      {
        title: "How to Listen With Intention",
        subtitle: "Awareness changes the effect.",
        body: [
          "Intentional listening means paying attention to how sound changes thought, emotion, breath, memory, and physical sensation.",
          "Different sessions may affect the listener differently depending on stress levels, mood, focus, environment, and timing.",
          "This is why RKS3 encourages observation instead of rigid claims.",
          "The listener becomes an active participant in the experience instead of a passive consumer.",
          "Sometimes the correct frequency is stimulation. Sometimes it is silence. Sometimes it is grounding. Sometimes it is expansion.",
          "Intentional listening is ultimately the practice of awareness itself.",
        ],
      },
    ],
  },
  {
    id: "the-law-of-one",
    title: "The Law of One",
    subtitle: "Unity, Consciousness, and Intelligent Infinity",
    author: "RKS3 Archive",
    type: "Codex",
    status: "Blueprint",
    readingMode: "Read Ready",
    portalLane: "Spirit",
    frequency: "Unity • Awareness • Expansion",
    mood: "Cosmic, deep, reflective, expansive",
    coverSrc: "/books/covers/law-of-one.jpg",
    sections: ["The Nature of Unity", "Consciousness and Creation", "Density and Evolution", "Service to Others", "Intelligent Infinity"],
    description:
      "A Living Codex exploring unity consciousness, spiritual evolution, and the architecture of awareness.",
    readerSections: [],
  },
  {
    id: "the-dhammapada",
    title: "The Dhammapada",
    subtitle: "Mind, Suffering, Peace, and Discipline",
    author: "RKS3 Archive",
    type: "Codex",
    status: "Blueprint",
    readingMode: "Read Ready",
    portalLane: "Soul",
    frequency: "Stillness • Wisdom • Discipline",
    mood: "Calm, focused, reflective",
    coverSrc: "/books/covers/dhammapada.jpg",
    sections: ["The Mind", "Awareness", "Discipline", "Peace", "The Path"],
    description:
      "A contemplative codex exploring mental discipline, suffering, awareness, and inner peace.",
    readerSections: [],
  },
  {
    id: "the-gospel-of-thomas",
    title: "The Gospel of Thomas",
    subtitle: "The Kingdom Within",
    author: "RKS3 Archive",
    type: "Codex",
    status: "Blueprint",
    readingMode: "Read Ready",
    portalLane: "Spirit",
    frequency: "Inner Knowing • Reflection • Consciousness",
    mood: "Mystic, symbolic, contemplative",
    coverSrc: "/books/covers/gospel-of-thomas.jpg",
    sections: ["The Hidden Sayings", "The Kingdom Within", "Self Knowledge", "The Inner Light", "Awakening"],
    description:
      "A symbolic and reflective codex centered on inner awareness and spiritual insight.",
    readerSections: [],
  },
  {
    id: "the-upanishads",
    title: "The Upanishads",
    subtitle: "The Self, Consciousness, and Reality",
    author: "RKS3 Archive",
    type: "Codex",
    status: "Blueprint",
    readingMode: "Read Ready",
    portalLane: "Spirit",
    frequency: "Self • Reality • Awareness",
    mood: "Sacred, philosophical, expansive",
    coverSrc: "/books/covers/upanishads.jpg",
    sections: ["The Self", "Brahman", "The Illusion", "Consciousness", "Liberation"],
    description:
      "Ancient philosophical teachings exploring consciousness, reality, and the nature of self.",
    readerSections: [],
  },
  {
    id: "the-creator-journal",
    title: "The Creator Journal",
    subtitle: "Building, Discipline, Purpose, and Vision",
    author: "RK3",
    type: "Creator Journal",
    status: "In Progress",
    readingMode: "Living Book",
    portalLane: "Unified",
    frequency: "Creation • Purpose • Momentum",
    mood: "Motivational, strategic, reflective",
    coverSrc: "/books/covers/creator-journal.jpg",
    audiobookId: "the-creator-journal",
    sections: ["The Beginning", "Discipline", "Momentum", "Failure and Vision", "Legacy"],
    description:
      "A Living Book documenting the psychology, discipline, and emotional journey of creators building long-term visions.",
    readerSections: [],
  },
];

export function getBookById(id: string) {
  return booksCatalog.find((book) => book.id === id);
}