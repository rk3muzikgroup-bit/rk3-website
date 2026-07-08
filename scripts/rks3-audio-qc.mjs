import fs from "node:fs";
import path from "node:path";

const useFullCatalog = process.argv.includes("--full");

const projectRoot = process.cwd();

const catalogFileName = useFullCatalog
  ? "rks3-audio-catalog.full.json"
  : "rks3-audio-catalog.json";

const qcReportFileName = useFullCatalog
  ? "rks3-audio-qc-report.full.json"
  : "rks3-audio-qc-report.json";

const catalogPath = path.join(projectRoot, "data", catalogFileName);
const qcReportPath = path.join(projectRoot, "data", qcReportFileName);

const EXPECTED_CATEGORIES = new Set([
  "bilingual",
  "healing",
  "instrumentals",
  "mixtapes",
  "music",
  "poetry",
  "promo",
  "rap",
  "remixes",
  "rnb",
  "skits",
  "soul",
  "spirit",
  "street",
  "site-transitions",
  "soundscapes",
]);

const FUTURE_LANE_CATEGORIES = new Set(["street", "soul", "spirit"]);

if (!fs.existsSync(catalogPath)) {
  console.error(`Missing catalog file: ${catalogPath}`);
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

function normalizeTitle(title) {
  return String(title ?? "")
    .toLowerCase()
    .replace(/\bversion\b/g, "")
    .replace(/\bv\d+\b/g, "")
    .replace(/\(\d+\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWeakTitleReasons(track) {
  const title = String(track.title ?? "").trim();
  const audioSrc = String(track.audioSrc ?? "");
  const reasons = [];

  if (!title) reasons.push("missing-title");
  if (title === "-") reasons.push("dash-title");
  if (title.length > 0 && title.length <= 2) reasons.push("very-short-title");
  if (/^[0-9]+$/.test(title)) reasons.push("number-only-title");
  if (/^[-_\s]+$/.test(title)) reasons.push("symbol-only-title");
  if (title && !/[a-zA-Z0-9]/.test(title)) reasons.push("no-alphanumeric-title");
  if (audioSrc.includes("/-")) reasons.push("weak-audio-slug");

  return reasons;
}

function isWeakTitle(track) {
  return getWeakTitleReasons(track).length > 0;
}

function getOddFilenameReasons(track) {
  const fileName = String(track.originalFileName ?? "");
  const originalPath = String(track.originalRelativePath ?? "");
  const reasons = [];

  if (fileName.startsWith(".")) reasons.push("hidden-file-name");
  if (fileName.includes("._")) reasons.push("mac-appledouble-marker");
  if (fileName.includes("  ")) reasons.push("double-space");
  if (fileName.includes("__")) reasons.push("double-underscore");
  if (originalPath.includes("//")) reasons.push("double-slash-path");
  if (/[^\x20-\x7E]/.test(fileName)) reasons.push("non-ascii-file-name");

  return reasons;
}

function isOddFilename(track) {
  return getOddFilenameReasons(track).length > 0;
}

function toTrackSummary(track) {
  return {
    id: track.id,
    title: track.title,
    category: track.category,
    versionLabel: track.versionLabel,
    audioSrc: track.audioSrc,
    originalFileName: track.originalFileName,
    originalRelativePath: track.originalRelativePath,
  };
}

function sortByCategoryThenTitle(a, b) {
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return String(a.title).localeCompare(String(b.title));
}

const categoryCounts = {};
const weakTitles = [];
const oddFilenames = [];
const unknownCategoryRecords = [];
const futureLaneRecords = [];
const duplicateGroups = {};
const versionClusters = {};
const reviewCandidateMap = new Map();

function addReviewCandidate(track, reason) {
  const existing = reviewCandidateMap.get(track.id) ?? {
    ...toTrackSummary(track),
    reasons: [],
  };

  if (!existing.reasons.includes(reason)) {
    existing.reasons.push(reason);
  }

  reviewCandidateMap.set(track.id, existing);
}

for (const track of catalog) {
  categoryCounts[track.category] = (categoryCounts[track.category] ?? 0) + 1;

  if (isWeakTitle(track)) {
    const reasons = getWeakTitleReasons(track);

    weakTitles.push({
      ...toTrackSummary(track),
      reasons,
    });

    for (const reason of reasons) {
      addReviewCandidate(track, reason);
    }
  }

  if (isOddFilename(track)) {
    const reasons = getOddFilenameReasons(track);

    oddFilenames.push({
      ...toTrackSummary(track),
      reasons,
    });

    for (const reason of reasons) {
      addReviewCandidate(track, reason);
    }
  }

  if (!EXPECTED_CATEGORIES.has(track.category)) {
    unknownCategoryRecords.push(toTrackSummary(track));
    addReviewCandidate(track, "unknown-category");
  }

  if (FUTURE_LANE_CATEGORIES.has(track.category)) {
    futureLaneRecords.push(toTrackSummary(track));
    addReviewCandidate(track, "future-street-soul-spirit-lane");
  }

  const normalized = normalizeTitle(track.title);
  if (!duplicateGroups[normalized]) duplicateGroups[normalized] = [];
  duplicateGroups[normalized].push(toTrackSummary(track));

  const categoryKey = `${track.category}::${normalized}`;
  if (!versionClusters[categoryKey]) versionClusters[categoryKey] = [];
  versionClusters[categoryKey].push(toTrackSummary(track));
}

const duplicateTitleGroups = Object.entries(duplicateGroups)
  .filter(([title, tracks]) => title && tracks.length > 1)
  .map(([normalizedTitle, tracks]) => ({
    normalizedTitle,
    count: tracks.length,
    tracks: tracks.sort(sortByCategoryThenTitle),
  }))
  .sort((a, b) => b.count - a.count || a.normalizedTitle.localeCompare(b.normalizedTitle));

for (const group of duplicateTitleGroups) {
  for (const track of group.tracks) {
    addReviewCandidate(track, `duplicate-title-group:${group.normalizedTitle}`);
  }
}

const sameCategoryVersionClusters = Object.entries(versionClusters)
  .filter(([key, tracks]) => tracks.length > 1)
  .map(([key, tracks]) => {
    const [category, normalizedTitle] = key.split("::");
    return {
      category,
      normalizedTitle,
      count: tracks.length,
      tracks: tracks.sort(sortByCategoryThenTitle),
    };
  })
  .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));

for (const cluster of sameCategoryVersionClusters) {
  for (const track of cluster.tracks) {
    addReviewCandidate(
      track,
      `same-category-version-cluster:${cluster.category}/${cluster.normalizedTitle}`
    );
  }
}

const sortedCategoryCounts = Object.fromEntries(
  Object.entries(categoryCounts).sort(([a], [b]) => a.localeCompare(b))
);

const reviewCandidates = Array.from(reviewCandidateMap.values()).sort(
  sortByCategoryThenTitle
);

const report = {
  generatedAt: new Date().toISOString(),
  mode: useFullCatalog ? "full" : "active-sample",
  catalogPath,
  qcReportPath,
  totalRecords: catalog.length,
  categoryCounts: sortedCategoryCounts,
  weakTitleCount: weakTitles.length,
  weakTitles: weakTitles.sort(sortByCategoryThenTitle),
  oddFilenameCount: oddFilenames.length,
  oddFilenames: oddFilenames.sort(sortByCategoryThenTitle),
  unknownCategoryCount: unknownCategoryRecords.length,
  unknownCategoryRecords: unknownCategoryRecords.sort(sortByCategoryThenTitle),
  futureLaneRecordCount: futureLaneRecords.length,
  futureLaneRecords: futureLaneRecords.sort(sortByCategoryThenTitle),
  duplicateTitleGroupCount: duplicateTitleGroups.length,
  duplicateTitleGroups,
  sameCategoryVersionClusterCount: sameCategoryVersionClusters.length,
  sameCategoryVersionClusters,
  reviewCandidateCount: reviewCandidates.length,
  reviewCandidates,
};

fs.writeFileSync(qcReportPath, JSON.stringify(report, null, 2));

console.log("");
console.log("RKS3 AUDIO QC COMPLETE");
console.log("----------------------");
console.log(`Mode: ${report.mode}`);
console.log(`Catalog: ${catalogPath}`);
console.log(`Total records checked: ${report.totalRecords}`);
console.log(`Weak titles: ${report.weakTitleCount}`);
console.log(`Odd filenames: ${report.oddFilenameCount}`);
console.log(`Unknown category records: ${report.unknownCategoryCount}`);
console.log(`Future lane records: ${report.futureLaneRecordCount}`);
console.log(`Duplicate title groups: ${report.duplicateTitleGroupCount}`);
console.log(`Same-category version clusters: ${report.sameCategoryVersionClusterCount}`);
console.log(`Review candidates: ${report.reviewCandidateCount}`);
console.log(`Report: ${qcReportPath}`);
console.log("");
console.table(
  Object.entries(sortedCategoryCounts).map(([category, count]) => ({
    category,
    count,
  }))
);
