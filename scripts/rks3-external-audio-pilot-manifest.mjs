import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const paths = {
  catalog: path.join(projectRoot, "data", "rks3-audio-catalog.full.json"),
  dashboard: path.join(projectRoot, "data", "rks3-audio-full-catalog-dashboard.json"),
  visibilityPolicy: path.join(projectRoot, "data", "rks3-audio-visibility-policy.full.json"),
  pathStrategy: path.join(projectRoot, "data", "rks3-external-audio-path-strategy.json"),
  pilotJson: path.join(projectRoot, "data", "rks3-external-audio-pilot-manifest.json"),
  pilotMd: path.join(projectRoot, "RKS3-MUSIC-EXTERNAL-AUDIO-PILOT-MANIFEST.md"),
};

for (const [name, filePath] of Object.entries(paths)) {
  if (name === "pilotJson" || name === "pilotMd") continue;

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

function sourceAbsolutePath(sourceRoot, record) {
  const relativePath = record.originalRelativePath ?? record.originalFileName ?? "";
  return sourceRoot ? path.join(sourceRoot, relativePath) : relativePath;
}

function cleanTitleScore(track) {
  const title = String(track.title ?? "");
  let score = 100;

  if (title.length < 3) score -= 40;
  if (/^\d+$/.test(title)) score -= 40;
  if (!/[a-zA-Z0-9]/.test(title)) score -= 40;
  if (/[()]/.test(String(track.originalFileName ?? ""))) score -= 5;
  if (title.toLowerCase().includes("landr")) score -= 10;

  return score;
}

function sortForPilot(a, b) {
  const scoreDiff = cleanTitleScore(b) - cleanTitleScore(a);
  if (scoreDiff !== 0) return scoreDiff;

  return String(a.title ?? "").localeCompare(String(b.title ?? ""));
}

function pickFromCategory(candidates, category, count, alreadyPickedIds) {
  return candidates
    .filter((track) => track.category === category)
    .filter((track) => !alreadyPickedIds.has(track.id))
    .sort(sortForPilot)
    .slice(0, count);
}

const catalog = readJson(paths.catalog);
const dashboard = readJson(paths.dashboard);
const visibilityPolicy = readJson(paths.visibilityPolicy);
const pathStrategy = readJson(paths.pathStrategy);

const sourceRoot = dashboard.executiveSummary?.sourceRoot ?? "";

const publicCandidateIds = new Set(
  (visibilityPolicy.publicCandidates ?? []).map((record) => record.id)
);

const reviewIds = new Set(
  (visibilityPolicy.reviewRecords ?? []).map((record) => record.id)
);

const externalById = new Map(
  (pathStrategy.externalRecords ?? []).map((record) => [record.id, record])
);

const eligibleCandidates = catalog
  .filter((track) => publicCandidateIds.has(track.id))
  .filter((track) => !reviewIds.has(track.id))
  .filter((track) => String(track.sourceFormat ?? "hdwav").toLowerCase() === "hdwav")
  .filter((track) => externalById.has(track.id));

const desiredSlots = [
  { category: "rnb", count: 2 },
  { category: "rap", count: 2 },
  { category: "healing", count: 1 },
  { category: "instrumentals", count: 1 },
  { category: "poetry", count: 1 },
  { category: "bilingual", count: 1 },
  { category: "remixes", count: 1 },
  { category: "promo", count: 1 },
];

const pickedIds = new Set();
const selected = [];

for (const slot of desiredSlots) {
  const picks = pickFromCategory(
    eligibleCandidates,
    slot.category,
    slot.count,
    pickedIds
  );

  for (const pick of picks) {
    selected.push(pick);
    pickedIds.add(pick.id);
  }
}

if (selected.length < 5) {
  const fallback = eligibleCandidates
    .filter((track) => !pickedIds.has(track.id))
    .sort(sortForPilot)
    .slice(0, 10 - selected.length);

  for (const pick of fallback) {
    selected.push(pick);
    pickedIds.add(pick.id);
  }
}

const pilotRecords = selected.slice(0, 10).map((track, index) => {
  const external = externalById.get(track.id);

  return {
    pilotOrder: index + 1,
    id: track.id,
    title: track.title,
    category: track.category,
    sourceFormat: track.sourceFormat ?? "hdwav",
    originalFileName: track.originalFileName,
    originalRelativePath: track.originalRelativePath,
    plannedSourceAbsolutePath: sourceAbsolutePath(sourceRoot, track),
    proposedStorageObjectKey: external.proposedStorageObjectKey,
    proposedDirectObjectUrl: external.proposedDirectObjectUrl,
    proposedCleanPublicAudioSrc: external.proposedCleanPublicAudioSrc,
    proposedVisibility: "pilot-public-candidate",
    uploadStatus: "not-uploaded",
    playbackTestStatus: "not-tested",
    livePortalStatus: "not-connected",
    notes:
      "Selected for first external storage/CDN pilot manifest. This record has not been uploaded and does not change the live Music Portal.",
  };
});

const manifest = {
  generatedAt: new Date().toISOString(),
  mission: "Mission 10V — External Audio Pilot Manifest",
  policyStatus: "manifest-only",
  livePortalChanged: false,
  activeCatalogChanged: false,
  activeOverridesChanged: false,
  audioCopied: 0,
  audioUploaded: 0,
  sourceFilesRenamed: false,
  sourceFilesDeleted: false,
  sourceFilesMoved: false,
  sourceFilesReencoded: false,
  sourceFilesAltered: false,
  sources: {
    catalog: path.relative(projectRoot, paths.catalog),
    dashboard: path.relative(projectRoot, paths.dashboard),
    visibilityPolicy: path.relative(projectRoot, paths.visibilityPolicy),
    pathStrategy: path.relative(projectRoot, paths.pathStrategy),
  },
  catalogContext: {
    fullMetadataRecords: catalog.length,
    eligiblePublicHdwavCandidates: eligibleCandidates.length,
    reviewRecordsExcluded: reviewIds.size,
    activeLocalSampleRecords: dashboard.executiveSummary?.activeWebsiteCatalogRecords ?? 30,
    sourceRoot,
    primaryStorageCandidate:
      pathStrategy.catalogContext?.primaryStorageCandidate ?? "Cloudflare R2",
    backupStorageCandidate:
      pathStrategy.catalogContext?.backupStorageCandidate ?? "Bunny Storage + Bunny CDN",
    mediaDomain: pathStrategy.catalogContext?.mediaDomain ?? "https://media.rks3.com",
  },
  pilotPolicy: {
    pilotSize: pilotRecords.length,
    minimumPilotSize: 5,
    maximumPilotSize: 10,
    selectionRule:
      "Select public-candidate HDWAV records across multiple categories, excluding review records and preserving source filenames.",
    uploadRule:
      "Upload manually later only after storage provider is approved. This manifest does not upload audio.",
    livePortalRule:
      "Do not connect pilot URLs to the live Music Portal until desktop/mobile playback is tested.",
  },
  pilotTestChecklist: [
    "Confirm selected source files exist on external drive.",
    "Create storage bucket or storage zone.",
    "Upload pilot records only.",
    "Confirm MIME type for WAV audio.",
    "Confirm range requests / seeking.",
    "Confirm Chrome desktop playback.",
    "Confirm Safari desktop playback.",
    "Confirm iPhone playback.",
    "Confirm Samsung/Android playback.",
    "Confirm cache headers.",
    "Confirm clean public URL behavior.",
    "Only then create a separate pilot catalog for playback testing.",
  ],
  pilotRecords,
};

const recordRows = pilotRecords.map((record) => {
  return `| ${record.pilotOrder} | ${safeCell(record.category)} | ${safeCell(
    record.title
  )} | ${safeCell(record.originalFileName)} | ${safeCell(
    record.proposedStorageObjectKey
  )} | ${safeCell(record.proposedCleanPublicAudioSrc)} |`;
});

const checklistRows = manifest.pilotTestChecklist.map((item, index) => {
  return `| ${index + 1} | ${safeCell(item)} | Not started |`;
});

const md = [
  "# RKS3 Music External Audio Pilot Manifest",
  "",
  "## Mission",
  "",
  "Select 5 to 10 HDWAV records for the first external storage/CDN pilot without copying audio, uploading audio, renaming source files, deleting tracks, or changing the live 30-record Music Portal.",
  "",
  "## Status",
  "",
  `- Policy status: ${manifest.policyStatus}`,
  `- Audio copied: ${manifest.audioCopied}`,
  `- Audio uploaded: ${manifest.audioUploaded}`,
  `- Live portal changed: ${manifest.livePortalChanged}`,
  `- Active catalog changed: ${manifest.activeCatalogChanged}`,
  `- Active overrides changed: ${manifest.activeOverridesChanged}`,
  `- Source files renamed: ${manifest.sourceFilesRenamed}`,
  `- Source files deleted: ${manifest.sourceFilesDeleted}`,
  "",
  "## Catalog Context",
  "",
  `- Full metadata records: ${manifest.catalogContext.fullMetadataRecords}`,
  `- Eligible public HDWAV candidates: ${manifest.catalogContext.eligiblePublicHdwavCandidates}`,
  `- Review records excluded: ${manifest.catalogContext.reviewRecordsExcluded}`,
  `- Active local sample records: ${manifest.catalogContext.activeLocalSampleRecords}`,
  `- Primary storage candidate: ${manifest.catalogContext.primaryStorageCandidate}`,
  `- Backup storage candidate: ${manifest.catalogContext.backupStorageCandidate}`,
  `- Media domain: ${manifest.catalogContext.mediaDomain}`,
  "",
  "## Pilot Policy",
  "",
  `- Pilot size: ${manifest.pilotPolicy.pilotSize}`,
  `- Selection rule: ${manifest.pilotPolicy.selectionRule}`,
  `- Upload rule: ${manifest.pilotPolicy.uploadRule}`,
  `- Live portal rule: ${manifest.pilotPolicy.livePortalRule}`,
  "",
  "## Pilot Records",
  "",
  "| # | Category | Title | Source File | Storage Object Key | Clean Public Audio Src |",
  "|---:|---|---|---|---|---|",
  ...recordRows,
  "",
  "## Pilot Test Checklist",
  "",
  "| # | Test | Status |",
  "|---:|---|---|",
  ...checklistRows,
  "",
  "## Hard Rules",
  "",
  "- This manifest does not upload audio.",
  "- Do not connect pilot URLs to the live Music Portal yet.",
  "- Do not rename source files for clean URLs.",
  "- Do not delete excluded records.",
  "- Do not treat review records as bad records.",
  "- Do not commit full audio to Git.",
  "",
  "## Next Recommended Mission",
  "",
  "Mission 10W — External Audio Upload Checklist. Create the exact manual upload checklist for Cloudflare R2 or Bunny, including MIME type, cache headers, CORS, custom domain, and playback tests.",
  "",
].join("\n");

fs.writeFileSync(paths.pilotJson, JSON.stringify(manifest, null, 2));
fs.writeFileSync(paths.pilotMd, md);

console.log("");
console.log("RKS3 EXTERNAL AUDIO PILOT MANIFEST COMPLETE");
console.log("-------------------------------------------");
console.log(`Full metadata records: ${manifest.catalogContext.fullMetadataRecords}`);
console.log(`Eligible public HDWAV candidates: ${manifest.catalogContext.eligiblePublicHdwavCandidates}`);
console.log(`Review records excluded: ${manifest.catalogContext.reviewRecordsExcluded}`);
console.log(`Pilot records selected: ${manifest.pilotPolicy.pilotSize}`);
console.log(`Primary storage candidate: ${manifest.catalogContext.primaryStorageCandidate}`);
console.log(`Backup storage candidate: ${manifest.catalogContext.backupStorageCandidate}`);
console.log(`Manifest JSON: ${paths.pilotJson}`);
console.log(`Manifest MD: ${paths.pilotMd}`);
console.log("");

console.table(
  pilotRecords.map((record) => ({
    order: record.pilotOrder,
    category: record.category,
    title: record.title,
    file: record.originalFileName,
  }))
);