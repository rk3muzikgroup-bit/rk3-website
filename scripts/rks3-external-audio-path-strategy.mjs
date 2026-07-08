import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const paths = {
  catalog: path.join(projectRoot, "data", "rks3-audio-catalog.full.json"),
  storageMatrix: path.join(projectRoot, "data", "rks3-storage-cdn-decision-matrix.json"),
  visibilityPolicy: path.join(projectRoot, "data", "rks3-audio-visibility-policy.full.json"),
  strategyJson: path.join(projectRoot, "data", "rks3-external-audio-path-strategy.json"),
  strategyMd: path.join(projectRoot, "RKS3-MUSIC-EXTERNAL-AUDIO-PATH-STRATEGY.md"),
};

for (const [name, filePath] of Object.entries(paths)) {
  if (name === "strategyJson" || name === "strategyMd") continue;

  if (!fs.existsSync(filePath)) {
    console.error(`Missing required ${name} file: ${filePath}`);
    process.exit(1);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function safeCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function slugify(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function safeCategory(category) {
  const slug = slugify(category);
  return slug || "uncategorized";
}

function extensionForWebsiteUrl(track) {
  const sourceFormat = String(track.sourceFormat ?? "").toLowerCase();

  if (sourceFormat === "hdwav") return "wav";

  return "wav";
}

function sourceFileName(track) {
  const fromOriginal = String(track.originalFileName ?? "").trim();

  if (fromOriginal) return fromOriginal;

  const audioSrc = String(track.audioSrc ?? "").trim();
  const fallback = audioSrc ? path.basename(audioSrc) : "";

  return fallback || `${track.id}.wav`;
}

function storageObjectKey(track) {
  const category = safeCategory(track.category);
  const id = slugify(track.id) || "unknown-id";
  const fileName = sourceFileName(track);

  return `audio/rks3/full/${category}/${id}/${fileName}`;
}

function publicAudioSrc(track) {
  const category = safeCategory(track.category);
  const id = slugify(track.id) || "unknown-id";
  const titleSlug = slugify(track.title) || slugify(path.basename(sourceFileName(track), path.extname(sourceFileName(track)))) || "untitled";
  const extension = extensionForWebsiteUrl(track);

  return `https://media.rks3.com/audio/rks3/full/${category}/${id}/${titleSlug}.${extension}`;
}

function directObjectUrl(track) {
  return `https://media.rks3.com/${storageObjectKey(track)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function summarizeTrack(track) {
  return {
    id: track.id,
    title: track.title,
    category: track.category,
    sourceFormat: track.sourceFormat ?? "hdwav",
    originalFileName: track.originalFileName,
    originalRelativePath: track.originalRelativePath,
    currentLocalAudioSrc: track.audioSrc,
    proposedStorageObjectKey: storageObjectKey(track),
    proposedDirectObjectUrl: directObjectUrl(track),
    proposedCleanPublicAudioSrc: publicAudioSrc(track),
  };
}

function countByCategory(records) {
  return records.reduce((counts, record) => {
    const category = record.category ?? "unknown";
    counts[category] = (counts[category] ?? 0) + 1;
    return counts;
  }, {});
}

const catalog = readJson(paths.catalog);
const storageMatrix = readJson(paths.storageMatrix);
const visibilityPolicy = readJson(paths.visibilityPolicy);

const reviewIds = new Set(
  (visibilityPolicy.reviewRecords ?? []).map((record) => record.id)
);

const publicCandidateIds = new Set(
  (visibilityPolicy.publicCandidates ?? []).map((record) => record.id)
);

const externalRecords = catalog.map((track) => ({
  ...summarizeTrack(track),
  proposedVisibility: reviewIds.has(track.id)
    ? "review"
    : publicCandidateIds.has(track.id)
      ? "public-candidate"
      : "unclassified",
}));

const sampleRecords = externalRecords.slice(0, 12);

const strategy = {
  generatedAt: new Date().toISOString(),
  mission: "Mission 10U — External Audio Path Strategy",
  policyStatus: "planning-only",
  livePortalChanged: false,
  activeCatalogChanged: false,
  audioCopied: 0,
  sourceFilesRenamed: false,
  sourceFilesDeleted: false,
  sourceFilesMoved: false,
  sourceFilesReencoded: false,
  sourceFilesCompressed: false,
  sourceFilesNormalized: false,
  sourceFilesRemastered: false,
  sourceFilesAltered: false,
  sources: {
    fullCatalog: path.relative(projectRoot, paths.catalog),
    storageMatrix: path.relative(projectRoot, paths.storageMatrix),
    visibilityPolicy: path.relative(projectRoot, paths.visibilityPolicy),
  },
  catalogContext: {
    fullMetadataRecords: catalog.length,
    activeLocalSampleRecords:
      storageMatrix.rks3CatalogContext?.activeWebsiteSampleRecords ?? 30,
    primaryStorageCandidate:
      storageMatrix.primaryRecommendation?.winner ?? "Cloudflare R2",
    backupStorageCandidate:
      storageMatrix.primaryRecommendation?.backup ?? "Bunny Storage + Bunny CDN",
    mediaDomain: "https://media.rks3.com",
  },
  pathPolicy: {
    primaryMediaDomain: "https://media.rks3.com",
    storageObjectRoot: "audio/rks3/full",
    storageObjectPattern:
      "audio/rks3/full/{category}/{recordId}/{originalFileName}",
    cleanPublicUrlPattern:
      "https://media.rks3.com/audio/rks3/full/{category}/{recordId}/{titleSlug}.wav",
    directObjectUrlPattern:
      "https://media.rks3.com/audio/rks3/full/{category}/{recordId}/{originalFileName}",
    recordIdRequired: true,
    reasonRecordIdIsRequired:
      "The full catalog contains duplicate title groups and same-category version clusters. Record IDs prevent URL collisions.",
    sourceFileNamePreservedInStorage: true,
    cleanPublicUrlCanDifferFromStorageObjectName: true,
    websiteUrlExtension: ".wav",
    sourceFormatMetadataValue: "hdwav",
    originalFileExtensionPolicy:
      "Original source files may remain named .hdwav.wav in storage, while clean public audioSrc values can end in .wav through metadata mapping or future edge routing.",
  },
  hardRules: [
    "Do not commit full audio to Git.",
    "Do not use public/audio/rks3 as the full catalog host.",
    "Do not rename source files during external storage migration.",
    "Do not delete source files during storage migration.",
    "Do not build clean public URLs without record IDs.",
    "Do not promote full catalog paths until a 5-to-10-file pilot is tested.",
    "Keep current live 30-record sample protected until external playback is proven.",
  ],
  implementationPhases: [
    {
      phase: "10U-1",
      title: "Approve canonical path shape",
      action:
        "Use category plus record ID plus slug so duplicate titles cannot collide.",
    },
    {
      phase: "10U-2",
      title: "Create external media domain",
      action:
        "Reserve media.rks3.com for audio delivery through the chosen storage/CDN provider.",
    },
    {
      phase: "10U-3",
      title: "Upload pilot only",
      action:
        "Upload 5 to 10 HDWAV files using storage object keys that preserve original filenames.",
    },
    {
      phase: "10U-4",
      title: "Generate pilot metadata",
      action:
        "Create a pilot catalog that points audioSrc to external media URLs without touching the live portal.",
    },
    {
      phase: "10U-5",
      title: "Test playback",
      action:
        "Confirm desktop, mobile, Safari, Chrome, seeking, range requests, caching, and load speed.",
    },
    {
      phase: "10U-6",
      title: "Scale after approval",
      action:
        "Only promote full catalog external audioSrc values after metadata, visibility, and storage decisions are locked.",
    },
  ],
  categoryBreakdown: countByCategory(externalRecords),
  sampleRecords,
  externalRecords,
};

const sampleRows = sampleRecords.map((record) => {
  return `| ${safeCell(record.category)} | ${safeCell(record.title)} | ${safeCell(
    record.proposedStorageObjectKey
  )} | ${safeCell(record.proposedCleanPublicAudioSrc)} |`;
});

const categoryRows = Object.entries(strategy.categoryBreakdown)
  .sort(([, a], [, b]) => b - a)
  .map(([category, count]) => `| ${safeCell(category)} | ${count} |`);

const phaseRows = strategy.implementationPhases.map((phase) => {
  return `| ${safeCell(phase.phase)} | ${safeCell(phase.title)} | ${safeCell(
    phase.action
  )} |`;
});

const md = [
  "# RKS3 Music External Audio Path Strategy",
  "",
  "## Mission",
  "",
  "Define the future external audio path structure for the full RKS3 HDWAV catalog before any upload, source-file change, or live Music Portal change occurs.",
  "",
  "## Catalog Context",
  "",
  `- Full metadata records: ${strategy.catalogContext.fullMetadataRecords}`,
  `- Active local sample records: ${strategy.catalogContext.activeLocalSampleRecords}`,
  `- Primary storage candidate: ${strategy.catalogContext.primaryStorageCandidate}`,
  `- Backup storage candidate: ${strategy.catalogContext.backupStorageCandidate}`,
  `- Future media domain: ${strategy.catalogContext.mediaDomain}`,
  "",
  "## Path Policy",
  "",
  `- Storage object root: \`${strategy.pathPolicy.storageObjectRoot}\``,
  `- Storage object pattern: \`${strategy.pathPolicy.storageObjectPattern}\``,
  `- Clean public URL pattern: \`${strategy.pathPolicy.cleanPublicUrlPattern}\``,
  `- Direct object URL pattern: \`${strategy.pathPolicy.directObjectUrlPattern}\``,
  `- Record ID required: ${strategy.pathPolicy.recordIdRequired}`,
  `- Source filename preserved in storage: ${strategy.pathPolicy.sourceFileNamePreservedInStorage}`,
  `- Website URL extension: \`${strategy.pathPolicy.websiteUrlExtension}\``,
  `- Source format metadata value: \`${strategy.pathPolicy.sourceFormatMetadataValue}\``,
  "",
  "## Why Record IDs Are Required",
  "",
  strategy.pathPolicy.reasonRecordIdIsRequired,
  "",
  "## Extension Policy",
  "",
  strategy.pathPolicy.originalFileExtensionPolicy,
  "",
  "## Hard Rules",
  "",
  ...strategy.hardRules.map((rule) => `- ${rule}`),
  "",
  "## Category Breakdown",
  "",
  "| Category | Count |",
  "|---|---:|",
  ...categoryRows,
  "",
  "## Sample Proposed Paths",
  "",
  "| Category | Title | Storage Object Key | Clean Public Audio Src |",
  "|---|---|---|---|",
  ...sampleRows,
  "",
  "## Implementation Phases",
  "",
  "| Phase | Title | Action |",
  "|---|---|---|",
  ...phaseRows,
  "",
  "## Final Decision",
  "",
  "RKS3 should use metadata-driven external audio paths. The storage layer may preserve original HDWAV filenames, while the website can use clean public audioSrc URLs that include category, record ID, and title slug. No source files should be renamed to make URLs look cleaner.",
  "",
  "## Next Recommended Mission",
  "",
  "Mission 10V — External Audio Pilot Manifest. Select 5 to 10 HDWAV records for the first Cloudflare R2/Bunny pilot upload without changing the live Music Portal.",
  "",
].join("\n");

fs.writeFileSync(paths.strategyJson, JSON.stringify(strategy, null, 2));
fs.writeFileSync(paths.strategyMd, md);

console.log("");
console.log("RKS3 EXTERNAL AUDIO PATH STRATEGY COMPLETE");
console.log("------------------------------------------");
console.log(`Full metadata records: ${strategy.catalogContext.fullMetadataRecords}`);
console.log(`Active local sample records: ${strategy.catalogContext.activeLocalSampleRecords}`);
console.log(`Primary storage candidate: ${strategy.catalogContext.primaryStorageCandidate}`);
console.log(`Backup storage candidate: ${strategy.catalogContext.backupStorageCandidate}`);
console.log(`Media domain: ${strategy.catalogContext.mediaDomain}`);
console.log(`Strategy JSON: ${paths.strategyJson}`);
console.log(`Strategy MD: ${paths.strategyMd}`);
console.log("");

console.table(
  sampleRecords.slice(0, 8).map((record) => ({
    category: record.category,
    title: record.title,
    storageKey: record.proposedStorageObjectKey,
    cleanUrl: record.proposedCleanPublicAudioSrc,
  }))
);