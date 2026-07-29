export type AudioScriptSection = {
  sectionNumber: number;
  title: string;
  audioFile: string;
  status: "Text Drafted" | "Script Locked" | "Audio Exported" | "Audio Ready";
};

export type AudioScriptMapItem = {
  bookId: string;
  audiobookId: string;
  title: string;
  audioFolder: string;
  sections: AudioScriptSection[];
};

export const audioScriptMap: AudioScriptMapItem[] = [
  {
    bookId: "from-bones-to-breath",
    audiobookId: "from-bones-to-breath",
    title: "From Bones To Breath",
    audioFolder: "/audio/audiobooks/from-bones-to-breath",
    sections: [
      {
        sectionNumber: 1,
        title: "The Skeleton",
        audioFile: "section-1.mp3",
        status: "Text Drafted",
      },
      {
        sectionNumber: 2,
        title: "The Signal",
        audioFile: "section-2.mp3",
        status: "Text Drafted",
      },
      {
        sectionNumber: 3,
        title: "The Vault",
        audioFile: "section-3.mp3",
        status: "Text Drafted",
      },
      {
        sectionNumber: 4,
        title: "The Portal",
        audioFile: "section-4.mp3",
        status: "Text Drafted",
      },
      {
        sectionNumber: 5,
        title: "The Breath",
        audioFile: "section-5.mp3",
        status: "Text Drafted",
      },
    ],
  },
  {
    bookId: "the-rks3-initiation",
    audiobookId: "the-rks3-initiation",
    title: "The RKS3 Initiation",
    audioFolder: "/audio/audiobooks/the-rks3-initiation-v2.0",
    sections: [
      {
        sectionNumber: 1,
        title: "Opening",
        audioFile: "section-1.mp3",
        status: "Audio Ready",
      },
      {
        sectionNumber: 2,
        title: "Before You Enter",
        audioFile: "section-2.mp3",
        status: "Audio Ready",
      },
      {
        sectionNumber: 3,
        title: "Street • Soul • Spirit",
        audioFile: "section-3.mp3",
        status: "Audio Ready",
      },
      {
        sectionNumber: 4,
        title: "How to Use This World",
        audioFile: "section-4.mp3",
        status: "Audio Ready",
      },
      {
        sectionNumber: 5,
        title: "Your First Step",
        audioFile: "section-5.mp3",
        status: "Audio Ready",
      },
    ],
  },
  {
    bookId: "the-frequency-manual",
    audiobookId: "the-frequency-manual",
    title: "The Frequency Manual",
    audioFolder: "/audio/audiobooks/the-frequency-manual",
    sections: [
      {
        sectionNumber: 1,
        title: "What Frequency Means",
        audioFile: "section-1.mp3",
        status: "Text Drafted",
      },
      {
        sectionNumber: 2,
        title: "Sound and the Body",
        audioFile: "section-2.mp3",
        status: "Text Drafted",
      },
      {
        sectionNumber: 3,
        title: "Breath as the Tuner",
        audioFile: "section-3.mp3",
        status: "Text Drafted",
      },
      {
        sectionNumber: 4,
        title: "The RKS3 Frequency Portal",
        audioFile: "section-4.mp3",
        status: "Text Drafted",
      },
      {
        sectionNumber: 5,
        title: "How to Listen With Intention",
        audioFile: "section-5.mp3",
        status: "Text Drafted",
      },
    ],
  },
];

export function getAudioScriptByBookId(bookId: string) {
  return audioScriptMap.find((item) => item.bookId === bookId);
}

export function getAudioScriptByAudiobookId(audiobookId: string) {
  return audioScriptMap.find((item) => item.audiobookId === audiobookId);
}