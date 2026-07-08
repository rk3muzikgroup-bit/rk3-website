import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const qcPath = path.join(projectRoot, "data", "rks3-audio-qc-report.full.json");

const planJsonPath = path.join(
  projectRoot,
  "data",
  "rks3-audio-duplicate-version-plan.full.json"
);

const planMdPath = path.join(
  projectRoot,
  "RKS3-MUSIC-DUPLICATE-VERSION-REVIEW-PLAN.md"
);

if (!fs.existsSync(qcPath)) {
  console.error(`Missing full QC report: ${qcPath}`);
  process.exit(1);
}

const qcReport = JSON.parse(fs.readFileSync(qcPath, "utf8"));

const CATEGORY_LABELS = {
  bilingual: "Bilingual",
  healing: "Healing",
  instrumentals: "Instrumentals",
  mixtapes: "Mixtapes",
  music: "Music",
  poetry: "Poetry",
  promo: "Promo",
  rap: "Rap",
  remixes: "Remixes",
  rnb: "R&B",
  skits: "Skits",
  soul: "Soul",
  spirit: "Spirit",
  street: "Street",
  "site-transitions": "Site Transitions",
  soundscapes: "Soundscapes",
};

function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category;
}

function safeCell(value) {
  return String(value ?? "").replaceAll("|", "\\|");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function groupSummary(group) {
  const categories = unique(group.tracks.map((track) => track.category));
  const titles = unique(group.tracks.map((track) => track.title));
  const files = group.tracks.map((track) => track.originalFileName);

  return {
    normalizedTitle: group.normalizedTitle,
    count: group.count,
    categories,
    categoryLabels: categories.map(getCategoryLabel),
    titles,
    files,
    tracks: group.tracks,
    recommendation:
      categories.length > 1
        ? "cross-category-title-review"
        : "same-title-version-review",
    policy:
      categories.length > 1
        ? "Same title appears across multiple categories. Confirm whether these are intentional versions, remixes, poetry/spoken-word versions, or duplicates."
        : "Same title appears more than once in one category. Confirm main version, alternate versions, remixes, or hidden/review status.",
  };
}

const duplicateTitleGroups = (qcReport.duplicateTitleGroups ?? []).map(
  groupSummary
);

const sameCategoryVersionClusters = (
  qcReport.sameCategoryVersionClusters ?? []
).map((cluster) => ({
  category: cluster.category,
  categoryLabel: getCategoryLabel(cluster.category),
  normalizedTitle: cluster.normalizedTitle,
  count: cluster.count,
  tracks: cluster.tracks,
  recommendation: "same-category-version-review",
  policy:
    "Multiple records share the same normalized title inside the same category. Later decide which record is the main public version and which records are alternates, remixes, review, or hidden.",
}));

const highCountDuplicateGroups = duplicateTitleGroups.filter(
  (group) => group.count >= 4
);

const crossCategoryDuplicateGroups = duplicateTitleGroups.filter(
  (group) => group.categories.length > 1
);

const plan = {
  generatedAt: new Date().toISOString(),
  sourceQcReport: path.relative(projectRoot, qcPath),
  policy: {
    sourceFilesRenamed: false,
    sourceFilesDeleted: false,
    activeWebsiteCatalogChanged: false,
    activeWebsiteOverridesChanged: false,
    note: "This is a full-catalog planning file only. It is not imported by the live Music Portal.",
  },
  totals: {
    totalRecords: qcReport.totalRecords,
    duplicateTitleGroupCount: duplicateTitleGroups.length,
    sameCategoryVersionClusterCount: sameCategoryVersionClusters.length,
    highCountDuplicateGroupCount: highCountDuplicateGroups.length,
    crossCategoryDuplicateGroupCount: crossCategoryDuplicateGroups.length,
  },
  duplicateTitleGroups,
  sameCategoryVersionClusters,
  highCountDuplicateGroups,
  crossCategoryDuplicateGroups,
};

const topDuplicateRows = duplicateTitleGroups.slice(0, 30).map((group) => {
  return `| ${safeCell(group.normalizedTitle)} | ${group.count} | ${safeCell(
    group.categoryLabels.join(", ")
  )} | ${safeCell(group.recommendation)} |`;
});

const versionClusterRows = sameCategoryVersionClusters
  .slice(0, 40)
  .map((cluster) => {
    return `| ${safeCell(cluster.categoryLabel)} | ${safeCell(
      cluster.normalizedTitle
    )} | ${cluster.count} | ${safeCell(cluster.recommendation)} |`;
  });

const md = [
  "# RKS3 Music Duplicate & Version Review Plan",
  "",
  "## Mission",
  "",
  "Organize duplicate title groups and same-category version clusters from the full HDWAV metadata catalog without deleting records, renaming files, or changing the live Music Portal.",
  "",
  "## Policy",
  "",
  "- Do not delete source files.",
  "- Do not rename source files.",
  "- Do not collapse versions automatically.",
  "- Do not force records into Street / Soul / Spirit lanes.",
  "- Use this plan to decide public, review, hidden, remix, alternate take, or main-version status later.",
  "",
  "## Totals",
  "",
  `- Total full-catalog records: ${plan.totals.totalRecords}`,
  `- Duplicate title groups: ${plan.totals.duplicateTitleGroupCount}`,
  `- Same-category version clusters: ${plan.totals.sameCategoryVersionClusterCount}`,
  `- High-count duplicate groups: ${plan.totals.highCountDuplicateGroupCount}`,
  `- Cross-category duplicate groups: ${plan.totals.crossCategoryDuplicateGroupCount}`,
  "",
  "## Top Duplicate Title Groups",
  "",
  "| Normalized Title | Count | Categories | Recommendation |",
  "|---|---:|---|---|",
  ...topDuplicateRows,
  "",
  "## Top Same-Category Version Clusters",
  "",
  "| Category | Normalized Title | Count | Recommendation |",
  "|---|---|---:|---|",
  ...versionClusterRows,
  "",
  "## Later Review Actions",
  "",
  "For each group, decide one of the following:",
  "",
  "- Main public version",
  "- Alternate version",
  "- Remix",
  "- Poetry / spoken-word version",
  "- Metadata review",
  "- Hidden duplicate",
  "- Keep all as intentional versions",
  "",
  "## Next Step",
  "",
  "Use the JSON plan for detailed record-level review before creating full-catalog overrides.",
  "",
].join("\n");

fs.writeFileSync(planJsonPath, JSON.stringify(plan, null, 2));
fs.writeFileSync(planMdPath, md);

console.log("");
console.log("RKS3 DUPLICATE & VERSION PLAN COMPLETE");
console.log("--------------------------------------");
console.log(`Total records: ${plan.totals.totalRecords}`);
console.log(`Duplicate title groups: ${plan.totals.duplicateTitleGroupCount}`);
console.log(`Same-category version clusters: ${plan.totals.sameCategoryVersionClusterCount}`);
console.log(`High-count duplicate groups: ${plan.totals.highCountDuplicateGroupCount}`);
console.log(`Cross-category duplicate groups: ${plan.totals.crossCategoryDuplicateGroupCount}`);
console.log(`JSON plan: ${planJsonPath}`);
console.log(`Markdown plan: ${planMdPath}`);
console.log("");

console.table(
  duplicateTitleGroups.slice(0, 15).map((group) => ({
    normalizedTitle: group.normalizedTitle,
    count: group.count,
    categories: group.categoryLabels.join(", "),
    recommendation: group.recommendation,
  }))
);