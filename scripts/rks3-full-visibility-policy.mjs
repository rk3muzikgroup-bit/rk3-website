import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const paths = {
  catalog: path.join(projectRoot, "data", "rks3-audio-catalog.full.json"),
  qcReport: path.join(projectRoot, "data", "rks3-audio-qc-report.full.json"),
  dashboard: path.join(projectRoot, "data", "rks3-audio-full-catalog-dashboard.json"),
  policyJson: path.join(projectRoot, "data", "rks3-audio-visibility-policy.full.json"),
  policyMd: path.join(projectRoot, "RKS3-MUSIC-FULL-CATALOG-VISIBILITY-POLICY.md"),
};

for (const [name, filePath] of Object.entries(paths)) {
  if (name === "policyJson" || name === "policyMd") continue;

  if (!fs.existsSync(filePath)) {
    console.error(`Missing required ${name} file: ${filePath}`);
    process.exit(1);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function safeCell(value) {
  return String(value ?? "").replaceAll("|", "\\|");
}

function summarizeTrack(track) {
  return {
    id: track.id,
    title: track.title,
    category: track.category,
    versionLabel: track.versionLabel,
    originalFileName: track.originalFileName,
    originalRelativePath: track.originalRelativePath,
    audioSrc: track.audioSrc,
  };
}

function countByCategory(records) {
  return records.reduce((counts, record) => {
    counts[record.category] = (counts[record.category] ?? 0) + 1;
    return counts;
  }, {});
}

const catalog = readJson(paths.catalog);
const qcReport = readJson(paths.qcReport);
const dashboard = readJson(paths.dashboard);

const reviewCandidates = qcReport.reviewCandidates ?? [];
const reviewCandidateIds = new Set(reviewCandidates.map((record) => record.id));

const reviewReasonCounts = {};

for (const candidate of reviewCandidates) {
  for (const reason of candidate.reasons ?? []) {
    const baseReason = String(reason).split(":")[0];
    reviewReasonCounts[baseReason] = (reviewReasonCounts[baseReason] ?? 0) + 1;
  }
}

const publicCandidates = catalog
  .filter((track) => !reviewCandidateIds.has(track.id))
  .map(summarizeTrack);

const reviewRecords = reviewCandidates.map((candidate) => ({
  ...summarizeTrack(candidate),
  reasons: candidate.reasons ?? [],
}));

const hiddenCandidates = [];

const visibilityPolicy = {
  generatedAt: new Date().toISOString(),
  sourceFiles: {
    catalog: path.relative(projectRoot, paths.catalog),
    qcReport: path.relative(projectRoot, paths.qcReport),
    dashboard: path.relative(projectRoot, paths.dashboard),
  },
  policyStatus: "planning-only",
  livePortalChanged: false,
  activeCatalogChanged: false,
  audioCopied: 0,
  sourceFilesRenamed: false,
  sourceFilesDeleted: false,
  rules: {
    public: [
      "Record is HDWAV-sourced.",
      "Record has a clean category.",
      "Record does not have weak-title flags.",
      "Record does not have unresolved duplicate/version-review flags.",
      "Record does not require manual review for filename, category, or lane policy.",
      "Record is approved for public listening.",
    ],
    review: [
      "Weak title records stay in review until display title is approved.",
      "Duplicate/title version clusters stay in review until main/alternate/remix status is decided.",
      "Street/Soul/Spirit legacy records stay in review until future-lane policy is approved.",
      "Odd filenames stay in review until confirmed safe.",
      "Records may be playable later but should not be treated as final public launch records yet.",
    ],
    hidden: [
      "Hidden is never automatic.",
      "Use hidden only for confirmed duplicate clutter, test records, broken audio, private records, or records intentionally excluded from public launch.",
      "Hidden records should remain in metadata rather than being deleted from source storage.",
    ],
  },
  totals: {
    fullCatalogRecords: catalog.length,
    publicCandidateCount: publicCandidates.length,
    reviewCandidateCount: reviewRecords.length,
    hiddenCandidateCount: hiddenCandidates.length,
    weakTitleCount: qcReport.weakTitleCount,
    oddFilenameCount: qcReport.oddFilenameCount,
    unknownCategoryCount: qcReport.unknownCategoryCount,
    futureLaneRecordCount: qcReport.futureLaneRecordCount,
    duplicateTitleGroupCount: qcReport.duplicateTitleGroupCount,
    sameCategoryVersionClusterCount: qcReport.sameCategoryVersionClusterCount,
  },
  categoryBreakdown: {
    fullCatalog: qcReport.categoryCounts ?? {},
    publicCandidates: countByCategory(publicCandidates),
    reviewCandidates: countByCategory(reviewRecords),
    hiddenCandidates: countByCategory(hiddenCandidates),
  },
  reviewReasonCounts,
  publicCandidates,
  reviewRecords,
  hiddenCandidates,
  nextActions: [
    "Approve weak-title display names.",
    "Review duplicate/version clusters.",
    "Choose public main versions for repeated titles.",
    "Mark confirmed extras as alternate, remix, review, or hidden.",
    "Choose CDN/storage before full-catalog promotion.",
    "Promote full catalog only after metadata and storage policy are approved.",
  ],
};

const categoryRows = Object.entries(visibilityPolicy.categoryBreakdown.fullCatalog)
  .sort(([, a], [, b]) => b - a)
  .map(([category, count]) => {
    const publicCount = visibilityPolicy.categoryBreakdown.publicCandidates[category] ?? 0;
    const reviewCount = visibilityPolicy.categoryBreakdown.reviewCandidates[category] ?? 0;
    const hiddenCount = visibilityPolicy.categoryBreakdown.hiddenCandidates[category] ?? 0;

    return `| ${safeCell(category)} | ${count} | ${publicCount} | ${reviewCount} | ${hiddenCount} |`;
  });

const reasonRows = Object.entries(reviewReasonCounts)
  .sort(([, a], [, b]) => b - a)
  .map(([reason, count]) => `| ${safeCell(reason)} | ${count} |`);

const md = [
  "# RKS3 Music Full Catalog Visibility Policy",
  "",
  "## Mission",
  "",
  "Define how the full HDWAV metadata catalog will later move into Public, Review, and Hidden visibility states without deleting source files, renaming records, copying audio, or changing the live 30-record Music Portal.",
  "",
  "## Current Status",
  "",
  `- Full catalog records: ${visibilityPolicy.totals.fullCatalogRecords}`,
  `- Public candidates: ${visibilityPolicy.totals.publicCandidateCount}`,
  `- Review candidates: ${visibilityPolicy.totals.reviewCandidateCount}`,
  `- Hidden candidates: ${visibilityPolicy.totals.hiddenCandidateCount}`,
  `- Unknown category records: ${visibilityPolicy.totals.unknownCategoryCount}`,
  `- Weak-title records: ${visibilityPolicy.totals.weakTitleCount}`,
  `- Odd filename records: ${visibilityPolicy.totals.oddFilenameCount}`,
  `- Future lane records: ${visibilityPolicy.totals.futureLaneRecordCount}`,
  `- Duplicate title groups: ${visibilityPolicy.totals.duplicateTitleGroupCount}`,
  `- Same-category version clusters: ${visibilityPolicy.totals.sameCategoryVersionClusterCount}`,
  "",
  "## Production Rule",
  "",
  "The live Music Portal remains protected on the 30-record sample. The full 483-record catalog stays metadata-only until storage/CDN, metadata overrides, duplicate review, and visibility decisions are approved.",
  "",
  "## Public Rules",
  "",
  ...visibilityPolicy.rules.public.map((rule) => `- ${rule}`),
  "",
  "## Review Rules",
  "",
  ...visibilityPolicy.rules.review.map((rule) => `- ${rule}`),
  "",
  "## Hidden Rules",
  "",
  ...visibilityPolicy.rules.hidden.map((rule) => `- ${rule}`),
  "",
  "## Category Visibility Breakdown",
  "",
  "| Category | Full Count | Public Candidates | Review Candidates | Hidden Candidates |",
  "|---|---:|---:|---:|---:|",
  ...categoryRows,
  "",
  "## Review Reason Counts",
  "",
  "| Reason | Count |",
  "|---|---:|",
  ...reasonRows,
  "",
  "## Next Actions",
  "",
  ...visibilityPolicy.nextActions.map((action) => `- ${action}`),
  "",
  "## Final Decision",
  "",
  "RKS3 should use metadata visibility to organize the full catalog. Do not delete tracks to clean the catalog. Do not rename source files unless a separate source-library cleanup mission is approved.",
  "",
].join("\n");

fs.writeFileSync(paths.policyJson, JSON.stringify(visibilityPolicy, null, 2));
fs.writeFileSync(paths.policyMd, md);

console.log("");
console.log("RKS3 FULL CATALOG VISIBILITY POLICY COMPLETE");
console.log("--------------------------------------------");
console.log(`Full catalog records: ${visibilityPolicy.totals.fullCatalogRecords}`);
console.log(`Public candidates: ${visibilityPolicy.totals.publicCandidateCount}`);
console.log(`Review candidates: ${visibilityPolicy.totals.reviewCandidateCount}`);
console.log(`Hidden candidates: ${visibilityPolicy.totals.hiddenCandidateCount}`);
console.log(`Unknown category records: ${visibilityPolicy.totals.unknownCategoryCount}`);
console.log(`Weak-title records: ${visibilityPolicy.totals.weakTitleCount}`);
console.log(`Duplicate title groups: ${visibilityPolicy.totals.duplicateTitleGroupCount}`);
console.log(`Version clusters: ${visibilityPolicy.totals.sameCategoryVersionClusterCount}`);
console.log(`Policy JSON: ${paths.policyJson}`);
console.log(`Policy MD: ${paths.policyMd}`);
console.log("");

console.table(
  Object.entries(visibilityPolicy.categoryBreakdown.fullCatalog).map(
    ([category, count]) => ({
      category,
      full: count,
      public: visibilityPolicy.categoryBreakdown.publicCandidates[category] ?? 0,
      review: visibilityPolicy.categoryBreakdown.reviewCandidates[category] ?? 0,
      hidden: visibilityPolicy.categoryBreakdown.hiddenCandidates[category] ?? 0,
    })
  )
);