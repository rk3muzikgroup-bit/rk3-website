#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");
const DOCS_DIR = path.join(ROOT, "docs");

const OUTPUT_JSON = path.join(DATA_DIR, "rks3-external-audio-upload-checklist.json");
const OUTPUT_FULL_JSON = path.join(DATA_DIR, "rks3-external-audio-upload-checklist.full.json");
const OUTPUT_MD = path.join(DOCS_DIR, "rks3-external-audio-upload-checklist.md");

function readJson(filePath, fallback = null) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.warn(`⚠️ Could not read JSON: ${path.relative(ROOT, filePath)}`);
    console.warn(`   ${error.message}`);
    return fallback;
  }
}

function findDataFile(prefix) {
  if (!fs.existsSync(DATA_DIR)) return null;

  const files = fs.readdirSync(DATA_DIR);
  const exact = files.find((file) => file === `${prefix}.json`);
  if (exact) return path.join(DATA_DIR, exact);

  const fuzzy = files.find((file) => file.startsWith(prefix) && file.endsWith(".json"));
  return fuzzy ? path.join(DATA_DIR, fuzzy) : null;
}

function normalizeToArray(raw) {
  if (!raw) return [];

  if (Array.isArray(raw)) return raw;

  const keys = [
    "tracks",
    "items",
    "files",
    "records",
    "catalog",
    "manifest",
    "uploadQueue",
    "audio",
  ];

  for (const key of keys) {
    if (Array.isArray(raw[key])) return raw[key];
  }

  return Object.entries(raw)
    .filter(([, value]) => value && typeof value === "object" && !Array.isArray(value))
    .map(([key, value]) => ({
      id: key,
      ...value,
    }));
}

function getValue(item, keys, fallback = "") {
  for (const key of keys) {
    if (item[key] !== undefined && item[key] !== null && item[key] !== "") {
      return item[key];
    }
  }
  return fallback;
}

function slugify(value) {
  return String(value || "untitled")
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function getExtension(value) {
  const ext = path.extname(String(value || "")).toLowerCase();
  return ext || ".mp3";
}

function hasExternalUrl(item) {
  return Boolean(
    getValue(item, [
      "externalUrl",
      "externalURL",
      "cdnUrl",
      "cdnURL",
      "publicUrl",
      "publicURL",
      "remoteUrl",
      "remoteURL",
      "storageUrl",
      "storageURL",
      "url",
    ])
  );
}

function resolveTitle(item) {
  return getValue(
    item,
    [
      "displayTitle",
      "title",
      "name",
      "trackTitle",
      "songTitle",
      "filename",
      "fileName",
      "sourceFilename",
      "masterFilename",
    ],
    "Untitled Audio"
  );
}

function resolveSourceFile(item) {
  const raw = getValue(item, [
    "sourceFile",
    "sourceFilename",
    "masterFile",
    "masterFilename",
    "filename",
    "fileName",
    "localPath",
    "path",
    "audioPath",
    "src",
  ]);

  return raw ? path.basename(String(raw)) : "";
}

function resolveCurrentPath(item) {
  return getValue(item, [
    "localPath",
    "path",
    "audioPath",
    "sourcePath",
    "masterPath",
    "originalPath",
    "src",
  ]);
}

function buildTargetFolder(item) {
  const category = getValue(item, ["category", "genre", "lane", "portal"], "uncategorized");
  return `audio/music/${slugify(category)}`;
}

function buildTargetFilename(item) {
  const sourceFile = resolveSourceFile(item);
  const title = resolveTitle(item);
  const ext = getExtension(sourceFile || title);
  return `${slugify(title)}${ext}`;
}

function uniqueById(items) {
  const seen = new Set();

  return items.filter((item) => {
    const id = getValue(item, ["id", "trackId", "slug", "audioId"], "");
    const source = resolveSourceFile(item);
    const key = id || source || JSON.stringify(item);

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function makeChecklistItem(item, index) {
  const id =
    getValue(item, ["id", "trackId", "slug", "audioId"], "") ||
    `external-audio-${String(index + 1).padStart(3, "0")}`;

  const title = resolveTitle(item);
  const sourceFile = resolveSourceFile(item);
  const currentPath = resolveCurrentPath(item);
  const externalUrl = getValue(item, [
    "externalUrl",
    "externalURL",
    "cdnUrl",
    "cdnURL",
    "publicUrl",
    "publicURL",
    "remoteUrl",
    "remoteURL",
    "storageUrl",
    "storageURL",
    "url",
  ]);

  const targetFolder = getValue(item, ["targetFolder", "externalFolder", "uploadFolder"], buildTargetFolder(item));

  const targetFilename = getValue(item, ["targetFilename", "externalFilename", "uploadFilename"], buildTargetFilename(item));

  const uploadNeeded = !externalUrl;
  const mapNeeded = Boolean(externalUrl) && !getValue(item, ["externalAudioEnabled", "externalEnabled"], false);

  const warnings = [];

  if (!title || title === "Untitled Audio") warnings.push("missing title");
  if (!sourceFile && !currentPath && !externalUrl) warnings.push("missing source file/path/url");
  if (!path.extname(targetFilename)) warnings.push("target filename has no extension");

  return {
    number: index + 1,
    id,
    title,
    category: getValue(item, ["category", "genre", "lane", "portal"], "uncategorized"),
    visibility: getValue(item, ["visibility"], "review"),
    sourceFile,
    currentPath,
    targetFolder,
    targetFilename,
    externalUrl,
    uploadNeeded,
    mapNeeded,
    readyForUpload: warnings.length === 0 && uploadNeeded,
    readyForCatalogMapping: Boolean(externalUrl),
    warnings,
  };
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function makeMarkdown(report) {
  const lines = [];

  lines.push("# RKS3 External Audio Upload Checklist");
  lines.push("");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Total records checked: ${report.summary.total}`);
  lines.push(`- Ready for upload: ${report.summary.readyForUpload}`);
  lines.push(`- Already has external URL: ${report.summary.readyForCatalogMapping}`);
  lines.push(`- Needs review: ${report.summary.needsReview}`);
  lines.push("");

  lines.push("## Upload Checklist");
  lines.push("");
  lines.push("| # | Title | Category | Target Folder | Target Filename | Status |");
  lines.push("|---:|---|---|---|---|---|");

  for (const item of report.items) {
    const status = item.readyForUpload
      ? "UPLOAD"
      : item.readyForCatalogMapping
        ? "MAP URL"
        : "REVIEW";

    lines.push(
      `| ${item.number} | ${item.title} | ${item.category} | ${item.targetFolder} | ${item.targetFilename} | ${status} |`
    );
  }

  lines.push("");
  lines.push("## Review Notes");
  lines.push("");

  const reviewItems = report.items.filter((item) => item.warnings.length > 0);

  if (reviewItems.length === 0) {
    lines.push("No review warnings found.");
  } else {
    for (const item of reviewItems) {
      lines.push(`- ${item.number}. ${item.title}: ${item.warnings.join(", ")}`);
    }
  }

  lines.push("");

  return lines.join("\n");
}

function main() {
  const pilotManifestFile = findDataFile("rks3-external-audio-pilot-manifest");
  const catalogFile = findDataFile("rks3-audio-catalog");
  const fullCatalogFile = findDataFile("rks3-audio-catalog.full");
  const pathStrategyFile = findDataFile("rks3-external-audio-path-strategy");

  const pilotManifest = readJson(pilotManifestFile, null);
  const catalog = readJson(fullCatalogFile, readJson(catalogFile, null));
  const pathStrategy = readJson(pathStrategyFile, null);

  const sourceItems = normalizeToArray(pilotManifest).length
    ? normalizeToArray(pilotManifest)
    : normalizeToArray(catalog);

  const uniqueItems = uniqueById(sourceItems);
  const checklistItems = uniqueItems.map(makeChecklistItem);

  const report = {
    generatedAt: new Date().toISOString(),
    mission: "RKS3 external audio upload checklist",
    inputs: {
      pilotManifestFile: pilotManifestFile ? path.relative(ROOT, pilotManifestFile) : null,
      catalogFile: fullCatalogFile
        ? path.relative(ROOT, fullCatalogFile)
        : catalogFile
          ? path.relative(ROOT, catalogFile)
          : null,
      pathStrategyFile: pathStrategyFile ? path.relative(ROOT, pathStrategyFile) : null,
      pathStrategyLoaded: Boolean(pathStrategy),
    },
    summary: {
      total: checklistItems.length,
      readyForUpload: checklistItems.filter((item) => item.readyForUpload).length,
      readyForCatalogMapping: checklistItems.filter((item) => item.readyForCatalogMapping).length,
      needsReview: checklistItems.filter((item) => item.warnings.length > 0).length,
      byCategory: countBy(checklistItems, "category"),
      byVisibility: countBy(checklistItems, "visibility"),
    },
    items: checklistItems,
  };

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(DOCS_DIR, { recursive: true });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(report, null, 2));
  fs.writeFileSync(OUTPUT_FULL_JSON, JSON.stringify(report, null, 2));
  fs.writeFileSync(OUTPUT_MD, makeMarkdown(report));

  console.log("✅ RKS3 external audio upload checklist complete");
  console.log(`Checked: ${report.summary.total}`);
  console.log(`Ready for upload: ${report.summary.readyForUpload}`);
  console.log(`Already mapped with external URL: ${report.summary.readyForCatalogMapping}`);
  console.log(`Needs review: ${report.summary.needsReview}`);
  console.log("");
  console.log(`Wrote: ${path.relative(ROOT, OUTPUT_JSON)}`);
  console.log(`Wrote: ${path.relative(ROOT, OUTPUT_FULL_JSON)}`);
  console.log(`Wrote: ${path.relative(ROOT, OUTPUT_MD)}`);
}

main();