import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const useFullCatalog = process.argv.includes("--full");

const catalogFileName = useFullCatalog
  ? "rks3-audio-catalog.full.json"
  : "rks3-audio-catalog.json";

const catalogPath = path.join(projectRoot, "data", catalogFileName);
const overridesPath = path.join(projectRoot, "data", "rks3-audio-overrides.json");

if (!fs.existsSync(catalogPath)) {
  console.error(`Missing catalog file: ${catalogPath}`);
  process.exit(1);
}

if (!fs.existsSync(overridesPath)) {
  console.error(`Missing overrides file: ${overridesPath}`);
  console.error("Create: data/rks3-audio-overrides.json");
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const overrides = JSON.parse(fs.readFileSync(overridesPath, "utf8"));

const catalogIds = new Set(catalog.map((track) => track.id));
const overrideIds = Object.keys(overrides);

const orphanOverrides = overrideIds.filter((id) => !catalogIds.has(id));

const emptyDisplayTitles = overrideIds.filter((id) => {
  const item = overrides[id];
  return "displayTitle" in item && !String(item.displayTitle ?? "").trim();
});

const invalidVisibility = overrideIds.filter((id) => {
  const value = overrides[id]?.visibility;
  return value && !["public", "review", "hidden"].includes(value);
});

const invalidPriority = overrideIds.filter((id) => {
  const value = overrides[id]?.priority;
  return value && !["low", "normal", "high", "featured"].includes(value);
});

console.log("");
console.log("RKS3 AUDIO OVERRIDES CHECK");
console.log("--------------------------");
console.log(`Mode: ${useFullCatalog ? "full" : "active"}`);
console.log(`Catalog records: ${catalog.length}`);
console.log(`Override records: ${overrideIds.length}`);
console.log(`Orphan overrides: ${orphanOverrides.length}`);
console.log(`Empty display titles: ${emptyDisplayTitles.length}`);
console.log(`Invalid visibility values: ${invalidVisibility.length}`);
console.log(`Invalid priority values: ${invalidPriority.length}`);

if (orphanOverrides.length > 0) {
  console.log("");
  console.log("Orphan override IDs:");
  console.table(orphanOverrides.map((id) => ({ id })));
}

if (emptyDisplayTitles.length > 0) {
  console.log("");
  console.log("Overrides needing displayTitle:");
  console.table(
    emptyDisplayTitles.map((id) => {
      const track = catalog.find((item) => item.id === id);

      return {
        id,
        sourceTitle: track?.title ?? "unknown",
        file: track?.originalFileName ?? "unknown",
      };
    })
  );
}

if (invalidVisibility.length > 0) {
  console.log("");
  console.log("Invalid visibility values:");
  console.table(
    invalidVisibility.map((id) => ({
      id,
      visibility: overrides[id]?.visibility,
    }))
  );
}

if (invalidPriority.length > 0) {
  console.log("");
  console.log("Invalid priority values:");
  console.table(
    invalidPriority.map((id) => ({
      id,
      priority: overrides[id]?.priority,
    }))
  );
}

if (
  orphanOverrides.length === 0 &&
  emptyDisplayTitles.length === 0 &&
  invalidVisibility.length === 0 &&
  invalidPriority.length === 0
) {
  console.log("");
  console.log("RKS3 audio overrides clean ✅");
}