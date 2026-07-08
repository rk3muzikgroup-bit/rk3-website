import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const sourceRoot = process.argv[2];
const shouldCopy = process.argv.includes("--copy");
const shouldCleanOutput = process.argv.includes("--clean-output");
const metadataOnly = process.argv.includes("--metadata-only");

const sampleArg = process.argv.find((arg) => arg.startsWith("--sample="));
const sampleLimit = sampleArg ? Number(sampleArg.replace("--sample=", "")) : null;

const balancedSampleArg = process.argv.find((arg) =>
  arg.startsWith("--balanced-sample=")
);
const balancedSampleLimit = balancedSampleArg
  ? Number(balancedSampleArg.replace("--balanced-sample=", ""))
  : null;

const sampleCategoriesArg = process.argv.find((arg) =>
  arg.startsWith("--sample-categories=")
);

const defaultBalancedCategories = [
  "healing",
  "rnb",
  "rap",
  "instrumentals",
  "poetry",
  "remixes",
];

const balancedCategories = sampleCategoriesArg
  ? sampleCategoriesArg
      .replace("--sample-categories=", "")
      .split(",")
      .map((category) => category.trim())
      .filter(Boolean)
  : defaultBalancedCategories;

if (sampleLimit !== null && (!Number.isFinite(sampleLimit) || sampleLimit <= 0)) {
  console.error("Invalid --sample value. Use something like --sample=20");
  process.exit(1);
}

if (
  balancedSampleLimit !== null &&
  (!Number.isFinite(balancedSampleLimit) || balancedSampleLimit <= 0)
) {
  console.error(
    "Invalid --balanced-sample value. Use something like --balanced-sample=5"
  );
  process.exit(1);
}

if (sampleLimit !== null && balancedSampleLimit !== null) {
  console.error("Use either --sample or --balanced-sample, not both.");
  process.exit(1);
}

if (metadataOnly && shouldCopy) {
  console.error("Use either --metadata-only or --copy, not both.");
  process.exit(1);
}

if (metadataOnly && shouldCleanOutput) {
  console.error("--metadata-only does not use --clean-output because no audio is copied.");
  process.exit(1);
}

if (metadataOnly && (sampleLimit !== null || balancedSampleLimit !== null)) {
  console.error(
    "--metadata-only is for the full catalog. Do not combine it with --sample or --balanced-sample."
  );
  process.exit(1);
}

if (!sourceRoot) {
  console.error(`
Missing source folder.

Usage:
node scripts/rks3-hdwav-ingest.mjs "/path/to/Music Portal"
node scripts/rks3-hdwav-ingest.mjs "/path/to/Music Portal" --sample=20
node scripts/rks3-hdwav-ingest.mjs "/path/to/Music Portal" --balanced-sample=5
node scripts/rks3-hdwav-ingest.mjs "/path/to/Music Portal" --balanced-sample=5 --copy --clean-output
node scripts/rks3-hdwav-ingest.mjs "/path/to/Music Portal" --metadata-only
`);
  process.exit(1);
}

const resolvedSourceRoot = path.resolve(sourceRoot);
const projectRoot = process.cwd();

const outputAudioRoot = path.join(projectRoot, "public", "audio", "rks3");
const outputDataRoot = path.join(projectRoot, "data");

const activeCatalogPath = path.join(outputDataRoot, "rks3-audio-catalog.json");
const activeReportPath = path.join(outputDataRoot, "rks3-audio-report.json");
const fullCatalogPath = path.join(outputDataRoot, "rks3-audio-catalog.full.json");
const fullReportPath = path.join(outputDataRoot, "rks3-audio-report.full.json");

const catalogPath = metadataOnly ? fullCatalogPath : activeCatalogPath;
const reportPath = metadataOnly ? fullReportPath : activeReportPath;

const CATEGORY_ALIASES = {
  "english/spanish": "bilingual",
  "english-spanish": "bilingual",
  "english:spanish": "bilingual",
  healing: "healing",
  instrumentals: "instrumentals",
  "mix-tapes": "mixtapes",
  mixtapes: "mixtapes",
  music: "music",
  poetry: "poetry",
  promo: "promo",
  "r&b": "rnb",
  rnb: "rnb",
  rap: "rap",
  remixes: "remixes",
  renixes: "remixes",
  "rks3.com skits": "skits",
  "rks3=soul": "soul",
  "rks3-soul": "soul",
  "rks3=spirit": "spirit",
  "rks3-spirit": "spirit",
  "rks3=street": "street",
  "rks3-street": "street",
  "site transitions": "site-transitions",
  soundscapes: "soundscapes",
};

function walkDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkDirectory(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function titleFromFileName(fileName) {
  const parsed = path.parse(fileName);
  let name = parsed.name;

  if (name.toLowerCase().endsWith(".hdwav")) {
    name = name.slice(0, -".hdwav".length);
  }

  return name.replace(/_/g, " ").replace(/\s+/g, " ").trim();
}

function cleanBaseTitle(title) {
  return title
    .replace(/\s*\(\d+\)\s*$/g, "")
    .replace(/\s*-\s*$/g, "")
    .trim();
}

function extractVersionLabel(title) {
  const parenMatch = title.match(/\((\d+)\)\s*$/);
  if (parenMatch) return `Version ${parenMatch[1]}`;

  const trailingNumberMatch = title.match(/\s+(\d+)$/);
  if (trailingNumberMatch) return `Version ${trailingNumberMatch[1]}`;

  return "Main";
}

function getCategory(relativePath) {
  const parts = relativePath.split(path.sep).filter(Boolean);
  const first = (parts[0] ?? "uncategorized").toLowerCase();

  if (parts.length >= 2) {
    const firstTwo = `${parts[0]}/${parts[1]}`.toLowerCase();
    if (CATEGORY_ALIASES[firstTwo]) return CATEGORY_ALIASES[firstTwo];
  }

  return CATEGORY_ALIASES[first] ?? slugify(first) ?? "uncategorized";
}

function shortHash(value) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 8);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function isMacSystemFile(fileName) {
  return (
    fileName.startsWith("._") ||
    fileName === ".DS_Store" ||
    fileName.startsWith(".Spotlight") ||
    fileName.startsWith(".Trashes")
  );
}

function isRks3HdwavFile(fileName, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const parsedFile = path.parse(fileName);
  const lowerFileName = fileName.toLowerCase();
  const lowerParsedName = parsedFile.name.toLowerCase();

  return (
    ext === ".hdwav" ||
    lowerFileName.endsWith(".hdwav.wav") ||
    lowerParsedName.endsWith(".hdwav")
  );
}

function createCatalogItem(filePath, relativePath) {
  const fileName = path.basename(filePath);
  const rawTitle = titleFromFileName(fileName);

  if (!rawTitle || rawTitle === "." || rawTitle.startsWith(".")) {
    return null;
  }

  const category = getCategory(relativePath);
  const baseTitle = cleanBaseTitle(rawTitle);
  const versionLabel = extractVersionLabel(rawTitle);
  const hash = shortHash(relativePath);

  const safeFileName = `${slugify(baseTitle)}-${hash}.wav`;
  const audioSrc = `/audio/rks3/${category}/${safeFileName}`;

  return {
    id: `${category}-${slugify(baseTitle)}-${hash}`,
    title: baseTitle,
    originalTitle: rawTitle,
    versionLabel,
    category,
    sourceFormat: "hdwav",
    actualFileExtension: path.extname(fileName).toLowerCase(),
    audioSrc,
    originalFileName: fileName,
    originalRelativePath: relativePath,
    includeInRKS3: true,
    __sourceFilePath: filePath,
    __outputFileName: safeFileName,
  };
}

function sortCatalog(a, b) {
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.title.localeCompare(b.title);
}

function selectCatalogItems(allItems) {
  const sortedItems = [...allItems].sort(sortCatalog);

  if (metadataOnly) {
    return sortedItems;
  }

  if (balancedSampleLimit !== null) {
    const selected = [];

    for (const category of balancedCategories) {
      const categoryItems = sortedItems.filter(
        (item) => item.category === category
      );

      selected.push(...categoryItems.slice(0, balancedSampleLimit));
    }

    return selected;
  }

  if (sampleLimit !== null) {
    return sortedItems.slice(0, sampleLimit);
  }

  return sortedItems;
}

function removePrivateFields(item) {
  const { __sourceFilePath, __outputFileName, ...publicItem } = item;
  return publicItem;
}

function copySelectedAudio(selectedItems) {
  if (shouldCleanOutput && fs.existsSync(outputAudioRoot)) {
    fs.rmSync(outputAudioRoot, { recursive: true, force: true });
  }

  ensureDir(outputAudioRoot);

  for (const item of selectedItems) {
    const outputCategoryDir = path.join(outputAudioRoot, item.category);
    const outputFilePath = path.join(outputCategoryDir, item.__outputFileName);

    ensureDir(outputCategoryDir);
    fs.copyFileSync(item.__sourceFilePath, outputFilePath);
  }
}

function getMode() {
  if (metadataOnly) return "metadata-only";
  if (shouldCopy) return "copy";
  return "dry-run";
}

if (!fs.existsSync(resolvedSourceRoot)) {
  console.error(`Source folder does not exist: ${resolvedSourceRoot}`);
  process.exit(1);
}

ensureDir(outputDataRoot);

const allFiles = walkDirectory(resolvedSourceRoot);

const report = {
  sourceRoot: resolvedSourceRoot,
  mode: getMode(),
  activeCatalogTouched: !metadataOnly,
  metadataOnly,
  copyEnabled: shouldCopy,
  audioCopied: 0,
  sampleLimit: sampleLimit ?? "none",
  balancedSampleLimit: balancedSampleLimit ?? "none",
  balancedCategories:
    balancedSampleLimit !== null ? balancedCategories : "not-used",
  cleanOutput: shouldCleanOutput,
  totalFilesScanned: allFiles.length,
  totalHdwavFound: 0,
  importedHdwav: 0,
  ignoredMp3: 0,
  ignoredWav: 0,
  ignoredMacSystemFiles: 0,
  ignoredOther: 0,
  invalidHdwavFiles: [],
  totalHdwavByCategory: {},
  categories: {},
};

const allHdwavItems = [];

for (const filePath of allFiles) {
  const fileName = path.basename(filePath);
  const relativePath = path.relative(resolvedSourceRoot, filePath);

  if (isMacSystemFile(fileName)) {
    report.ignoredMacSystemFiles += 1;
    continue;
  }

  const ext = path.extname(filePath).toLowerCase();
  const isRks3Hdwav = isRks3HdwavFile(fileName, filePath);

  if (ext === ".mp3") {
    report.ignoredMp3 += 1;
    continue;
  }

  if (ext === ".wav" && !isRks3Hdwav) {
    report.ignoredWav += 1;
    continue;
  }

  if (!isRks3Hdwav) {
    report.ignoredOther += 1;
    continue;
  }

  report.totalHdwavFound += 1;

  const item = createCatalogItem(filePath, relativePath);

  if (!item) {
    report.invalidHdwavFiles.push(relativePath);
    continue;
  }

  allHdwavItems.push(item);
  report.totalHdwavByCategory[item.category] =
    (report.totalHdwavByCategory[item.category] ?? 0) + 1;
}

const selectedItems = selectCatalogItems(allHdwavItems).sort(sortCatalog);

if (shouldCopy) {
  copySelectedAudio(selectedItems);
  report.audioCopied = selectedItems.length;
}

const publicCatalog = selectedItems.map(removePrivateFields);

for (const item of publicCatalog) {
  report.importedHdwav += 1;
  report.categories[item.category] = (report.categories[item.category] ?? 0) + 1;
}

fs.writeFileSync(catalogPath, JSON.stringify(publicCatalog, null, 2));
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log("");
console.log("RKS3 HDWAV INGEST COMPLETE");
console.log("--------------------------");
console.log(`Mode: ${report.mode}`);
console.log(`Sample limit: ${sampleLimit ?? "none"}`);
console.log(`Balanced sample limit: ${balancedSampleLimit ?? "none"}`);
console.log(
  `Balanced categories: ${
    balancedSampleLimit !== null ? balancedCategories.join(", ") : "not-used"
  }`
);
console.log(`Clean output: ${shouldCleanOutput ? "yes" : "no"}`);
console.log(`Source: ${resolvedSourceRoot}`);
console.log(`Total HDWAV found: ${report.totalHdwavFound}`);
console.log(`HDWAV imported/cataloged: ${report.importedHdwav}`);
console.log(`Audio copied: ${report.audioCopied}`);
console.log(`MP3 ignored: ${report.ignoredMp3}`);
console.log(`WAV ignored: ${report.ignoredWav}`);
console.log(`Mac system files ignored: ${report.ignoredMacSystemFiles}`);
console.log(`Other ignored: ${report.ignoredOther}`);
console.log(`Catalog: ${catalogPath}`);
console.log(`Report: ${reportPath}`);

if (metadataOnly) {
  console.log("");
  console.log("Metadata-only mode complete. No audio files were copied.");
  console.log("Active website catalog was not touched.");
} else if (!shouldCopy) {
  console.log("");
  console.log("Dry run only. No audio files were copied.");
  console.log("Run again with --copy when ready.");
}