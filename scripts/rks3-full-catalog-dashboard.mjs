import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const paths = {
  catalog: path.join(projectRoot, "data", "rks3-audio-catalog.full.json"),
  ingestReport: path.join(projectRoot, "data", "rks3-audio-report.full.json"),
  qcReport: path.join(projectRoot, "data", "rks3-audio-qc-report.full.json"),
  weakTitlePlan: path.join(
    projectRoot,
    "data",
    "rks3-audio-weak-title-plan.full.json"
  ),
  duplicatePlan: path.join(
    projectRoot,
    "data",
    "rks3-audio-duplicate-version-plan.full.json"
  ),
  dashboardJson: path.join(
    projectRoot,
    "data",
    "rks3-audio-full-catalog-dashboard.json"
  ),
  dashboardMd: path.join(projectRoot, "RKS3-MUSIC-FULL-CATALOG-DASHBOARD.md"),
};

for (const [name, filePath] of Object.entries(paths)) {
  if (name === "dashboardJson" || name === "dashboardMd") continue;

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

const catalog = readJson(paths.catalog);
const ingestReport = readJson(paths.ingestReport);
const qcReport = readJson(paths.qcReport);
const weakTitlePlan = readJson(paths.weakTitlePlan);
const duplicatePlan = readJson(paths.duplicatePlan);

const categoryCounts = qcReport.categoryCounts ?? {};
const categoryRows = Object.entries(categoryCounts)
  .sort(([, a], [, b]) => b - a)
  .map(([category, count]) => ({
    category,
    count,
    percentage:
      catalog.length > 0 ? Number(((count / catalog.length) * 100).toFixed(1)) : 0,
  }));

const topCategories = categoryRows.slice(0, 8);

const weakTitleRows = (weakTitlePlan.records ?? []).map((record) => ({
  category: record.category,
  currentTitle: record.currentTitle,
  proposedTitle: record.proposedOverride?.displayTitle ?? "",
  file: record.originalFileName,
}));

const topDuplicateGroups = (duplicatePlan.duplicateTitleGroups ?? [])
  .slice(0, 12)
  .map((group) => ({
    normalizedTitle: group.normalizedTitle,
    count: group.count,
    categories: group.categoryLabels ?? [],
    recommendation: group.recommendation,
  }));

const topVersionClusters = (duplicatePlan.sameCategoryVersionClusters ?? [])
  .slice(0, 12)
  .map((cluster) => ({
    category: cluster.category,
    normalizedTitle: cluster.normalizedTitle,
    count: cluster.count,
    recommendation: cluster.recommendation,
  }));

const dashboard = {
  generatedAt: new Date().toISOString(),
  sourceFiles: {
    catalog: path.relative(projectRoot, paths.catalog),
    ingestReport: path.relative(projectRoot, paths.ingestReport),
    qcReport: path.relative(projectRoot, paths.qcReport),
    weakTitlePlan: path.relative(projectRoot, paths.weakTitlePlan),
    duplicatePlan: path.relative(projectRoot, paths.duplicatePlan),
  },
  executiveSummary: {
    totalRecords: catalog.length,
    sourceRoot: ingestReport.sourceRoot,
    audioCopied: ingestReport.audioCopied,
    activeWebsiteCatalogChanged: false,
    activeWebsiteCatalogRecords: 30,
    fullMetadataRecords: catalog.length,
    currentCategoryCount: Object.keys(categoryCounts).length,
    unknownCategoryRecords: qcReport.unknownCategoryCount,
    weakTitleRecords: qcReport.weakTitleCount,
    oddFilenameRecords: qcReport.oddFilenameCount,
    futureLaneRecords: qcReport.futureLaneRecordCount,
    duplicateTitleGroups: qcReport.duplicateTitleGroupCount,
    sameCategoryVersionClusters: qcReport.sameCategoryVersionClusterCount,
    reviewCandidates: qcReport.reviewCandidateCount,
  },
  categoryRows,
  weakTitleRows,
  topDuplicateGroups,
  topVersionClusters,
  cleanupPhases: [
    {
      phase: "Phase 1",
      title: "Protect the live portal",
      status: "Complete",
      notes:
        "Live Music Portal stays on the 30-record local sample while full catalog review continues.",
    },
    {
      phase: "Phase 2",
      title: "Correct category aliases",
      status: "Complete",
      notes: "english:spanish now maps to bilingual. Unknown category count is zero.",
    },
    {
      phase: "Phase 3",
      title: "Plan weak-title overrides",
      status: "Complete",
      notes:
        "10 weak-title records have proposed display titles. No source files renamed.",
    },
    {
      phase: "Phase 4",
      title: "Review duplicate/version groups",
      status: "Planned",
      notes:
        "83 duplicate title groups and 57 same-category version clusters need main/alternate/remix/review decisions.",
    },
    {
      phase: "Phase 5",
      title: "Choose storage/CDN",
      status: "Pending",
      notes:
        "Full HDWAV audio should move to external object storage/CDN before scale deployment.",
    },
    {
      phase: "Phase 6",
      title: "Promote full catalog safely",
      status: "Pending",
      notes:
        "Only after metadata, storage, and public/review/hidden rules are approved.",
    },
  ],
};

const categoryTable = categoryRows.map(
  (row) => `| ${safeCell(row.category)} | ${row.count} | ${row.percentage}% |`
);

const weakTitleTable = weakTitleRows.map(
  (row) =>
    `| ${safeCell(row.category)} | ${safeCell(row.currentTitle)} | ${safeCell(
      row.proposedTitle
    )} | ${safeCell(row.file)} |`
);

const duplicateTable = topDuplicateGroups.map(
  (group) =>
    `| ${safeCell(group.normalizedTitle)} | ${group.count} | ${safeCell(
      group.categories.join(", ")
    )} | ${safeCell(group.recommendation)} |`
);

const versionTable = topVersionClusters.map(
  (cluster) =>
    `| ${safeCell(cluster.category)} | ${safeCell(
      cluster.normalizedTitle
    )} | ${cluster.count} | ${safeCell(cluster.recommendation)} |`
);

const phaseTable = dashboard.cleanupPhases.map(
  (phase) =>
    `| ${safeCell(phase.phase)} | ${safeCell(phase.title)} | ${safeCell(
      phase.status
    )} | ${safeCell(phase.notes)} |`
);

const md = [
  "# RKS3 Music Full Catalog Dashboard",
  "",
  "## Executive Summary",
  "",
  `- Full metadata catalog records: ${dashboard.executiveSummary.fullMetadataRecords}`,
  `- Active live website catalog records: ${dashboard.executiveSummary.activeWebsiteCatalogRecords}`,
  `- Audio copied during full metadata review: ${dashboard.executiveSummary.audioCopied}`,
  `- Source root: ${dashboard.executiveSummary.sourceRoot}`,
  `- Category count: ${dashboard.executiveSummary.currentCategoryCount}`,
  `- Unknown category records: ${dashboard.executiveSummary.unknownCategoryRecords}`,
  `- Weak-title records: ${dashboard.executiveSummary.weakTitleRecords}`,
  `- Odd filename records: ${dashboard.executiveSummary.oddFilenameRecords}`,
  `- Future lane records: ${dashboard.executiveSummary.futureLaneRecords}`,
  `- Duplicate title groups: ${dashboard.executiveSummary.duplicateTitleGroups}`,
  `- Same-category version clusters: ${dashboard.executiveSummary.sameCategoryVersionClusters}`,
  `- Review candidates: ${dashboard.executiveSummary.reviewCandidates}`,
  "",
  "## Production Rule",
  "",
  "The full HDWAV catalog remains metadata-only until storage/CDN, public/review/hidden rules, and metadata override strategy are approved. The live Music Portal remains protected on the 30-record sample.",
  "",
  "## Category Distribution",
  "",
  "| Category | Count | Share |",
  "|---|---:|---:|",
  ...categoryTable,
  "",
  "## Top Categories",
  "",
  ...topCategories.map(
    (row) => `- ${row.category}: ${row.count} records (${row.percentage}%)`
  ),
  "",
  "## Weak Title Plan",
  "",
  "| Category | Current Title | Proposed Title | File |",
  "|---|---|---|---|",
  ...weakTitleTable,
  "",
  "## Top Duplicate Title Groups",
  "",
  "| Normalized Title | Count | Categories | Recommendation |",
  "|---|---:|---|---|",
  ...duplicateTable,
  "",
  "## Top Same-Category Version Clusters",
  "",
  "| Category | Normalized Title | Count | Recommendation |",
  "|---|---|---:|---|",
  ...versionTable,
  "",
  "## Cleanup Phases",
  "",
  "| Phase | Title | Status | Notes |",
  "|---|---|---|---|",
  ...phaseTable,
  "",
  "## Next Recommended Mission",
  "",
  "Mission 10S — Full Catalog Public / Review / Hidden Policy. Define how records move from full metadata review into public launch lanes without deleting files or breaking the live portal.",
  "",
].join("\n");

fs.writeFileSync(paths.dashboardJson, JSON.stringify(dashboard, null, 2));
fs.writeFileSync(paths.dashboardMd, md);

console.log("");
console.log("RKS3 FULL CATALOG DASHBOARD COMPLETE");
console.log("------------------------------------");
console.log(`Full records: ${dashboard.executiveSummary.fullMetadataRecords}`);
console.log(`Live sample records: ${dashboard.executiveSummary.activeWebsiteCatalogRecords}`);
console.log(`Unknown categories: ${dashboard.executiveSummary.unknownCategoryRecords}`);
console.log(`Weak titles: ${dashboard.executiveSummary.weakTitleRecords}`);
console.log(`Duplicate title groups: ${dashboard.executiveSummary.duplicateTitleGroups}`);
console.log(`Version clusters: ${dashboard.executiveSummary.sameCategoryVersionClusters}`);
console.log(`Dashboard JSON: ${paths.dashboardJson}`);
console.log(`Dashboard MD: ${paths.dashboardMd}`);
console.log("");
console.table(topCategories);