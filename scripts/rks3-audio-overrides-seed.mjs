import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const qcReportPath = path.join(projectRoot, "data", "rks3-audio-qc-report.json");
const overridesPath = path.join(projectRoot, "data", "rks3-audio-overrides.json");

if (!fs.existsSync(qcReportPath)) {
  console.error(`Missing QC report: ${qcReportPath}`);
  console.error("Run: node scripts/rks3-audio-qc.mjs");
  process.exit(1);
}

const qcReport = JSON.parse(fs.readFileSync(qcReportPath, "utf8"));

let overrides = {};

if (fs.existsSync(overridesPath)) {
  overrides = JSON.parse(fs.readFileSync(overridesPath, "utf8"));
}

for (const track of qcReport.weakTitles ?? []) {
  if (!track.id) continue;

  if (!overrides[track.id]) {
    overrides[track.id] = {
      displayTitle: "",
      displaySubtitle: "Needs metadata review",
      mood: [],
      tags: ["needs-review"],
      visibility: "review",
      priority: "normal",
      notes: `Original weak title: ${track.title}. Original file: ${track.originalFileName}`,
    };
  }
}

fs.writeFileSync(overridesPath, JSON.stringify(overrides, null, 2));

console.log("");
console.log("RKS3 AUDIO OVERRIDES SEED COMPLETE");
console.log("----------------------------------");
console.log(`Weak-title overrides prepared: ${Object.keys(overrides).length}`);
console.log(`Overrides file: ${overridesPath}`);
console.log("");
console.log("Next: open data/rks3-audio-overrides.json and fill displayTitle values.");