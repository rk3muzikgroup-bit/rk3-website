import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const qcPath = path.join(projectRoot, "data", "rks3-audio-qc-report.full.json");

const planJsonPath = path.join(
  projectRoot,
  "data",
  "rks3-audio-weak-title-plan.full.json"
);

const planMdPath = path.join(
  projectRoot,
  "RKS3-MUSIC-WEAK-TITLE-OVERRIDE-PLAN.md"
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

function proposedDisplayTitle(track) {
  const title = String(track.title ?? "").trim();

  if (title === "0332125") return "Untitled Instrumental 0332125";
  if (title === "❤️ ☀️") return "Love & Light";
  if (title === "7") return "Seven";
  if (title.toLowerCase() === "fa") return "FA — Title Review";
  if (title === "I") return "I — Title Review";
  if (title.toLowerCase() === "lc") return "LC — Title Review";

  return `${getCategoryLabel(track.category)} — Title Review`;
}

function proposedTags(track) {
  return [
    "needs-review",
    "weak-title",
    track.category,
    ...(track.reasons ?? []),
  ];
}

const records = (qcReport.weakTitles ?? []).map((track) => ({
  id: track.id,
  category: track.category,
  currentTitle: track.title,
  originalFileName: track.originalFileName,
  originalRelativePath: track.originalRelativePath,
  reasons: track.reasons ?? [],
  proposedOverride: {
    displayTitle: proposedDisplayTitle(track),
    displaySubtitle: `${getCategoryLabel(track.category)} weak-title review`,
    mood: ["review"],
    tags: proposedTags(track),
    visibility: "review",
    priority: "normal",
    notes: [
      "Full catalog weak-title plan.",
      `Original title: ${track.title}`,
      `Original file: ${track.originalFileName}`,
      `Original relative path: ${track.originalRelativePath}`,
      `Reasons: ${(track.reasons ?? []).join(", ")}`,
    ].join(" "),
  },
}));

const plan = {
  generatedAt: new Date().toISOString(),
  sourceQcReport: path.relative(projectRoot, qcPath),
  totalWeakTitles: records.length,
  policy: {
    sourceFilesRenamed: false,
    sourceFilesDeleted: false,
    activeWebsiteOverridesChanged: false,
    activeWebsiteCatalogChanged: false,
    note: "This is a full-catalog planning file only. It is not imported by the live Music Portal.",
  },
  records,
};

function safeMarkdownCell(value) {
  return String(value ?? "").replaceAll("|", "\\|");
}

const rows = records.map((record) => {
  return `| ${safeMarkdownCell(getCategoryLabel(record.category))} | ${safeMarkdownCell(
    record.currentTitle
  )} | ${safeMarkdownCell(record.proposedOverride.displayTitle)} | ${safeMarkdownCell(
    record.originalFileName
  )} | ${safeMarkdownCell(record.reasons.join(", "))} |`;
});

const md = [
  "# RKS3 Music Weak Title Override Plan",
  "",
  "## Mission",
  "",
  "Plan clean metadata overrides for weak titles in the full HDWAV catalog without renaming source files, deleting records, or changing the active 30-record website catalog.",
  "",
  "## Policy",
  "",
  "- Do not rename source files.",
  "- Do not delete tracks.",
  "- Keep corrections in metadata overrides.",
  "- Treat this as a planning file until the full catalog is promoted.",
  "",
  "## Total Weak Titles",
  "",
  String(records.length),
  "",
  "## Weak Title Records",
  "",
  "| Category | Current Title | Proposed Display Title | File | Reasons |",
  "|---|---|---|---|---|",
  ...rows,
  "",
  "## Next Step",
  "",
  "Review the proposed display titles. Later, approved records can be promoted into the active or full metadata override system.",
  "",
].join("\n");

fs.writeFileSync(planJsonPath, JSON.stringify(plan, null, 2));
fs.writeFileSync(planMdPath, md);

console.log("");
console.log("RKS3 FULL WEAK TITLE PLAN COMPLETE");
console.log("----------------------------------");
console.log(`Weak title records planned: ${records.length}`);
console.log(`JSON plan: ${planJsonPath}`);
console.log(`Markdown plan: ${planMdPath}`);
console.log("");

console.table(
  records.map((record) => ({
    category: record.category,
    currentTitle: record.currentTitle,
    proposedTitle: record.proposedOverride.displayTitle,
    file: record.originalFileName,
  }))
);