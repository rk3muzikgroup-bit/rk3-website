import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const paths = {
  dashboard: path.join(projectRoot, "data", "rks3-audio-full-catalog-dashboard.json"),
  visibilityPolicy: path.join(projectRoot, "data", "rks3-audio-visibility-policy.full.json"),
  matrixJson: path.join(projectRoot, "data", "rks3-storage-cdn-decision-matrix.json"),
  matrixMd: path.join(projectRoot, "RKS3-MUSIC-STORAGE-CDN-DECISION-MATRIX.md"),
};

for (const [name, filePath] of Object.entries(paths)) {
  if (name === "matrixJson" || name === "matrixMd") continue;

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

const dashboard = readJson(paths.dashboard);
const visibilityPolicy = readJson(paths.visibilityPolicy);

const fullRecords =
  dashboard.executiveSummary?.fullMetadataRecords ??
  visibilityPolicy.totals?.fullCatalogRecords ??
  483;

const activeRecords =
  dashboard.executiveSummary?.activeWebsiteCatalogRecords ?? 30;

const reviewCandidates =
  visibilityPolicy.totals?.reviewCandidateCount ??
  dashboard.executiveSummary?.reviewCandidates ??
  0;

const publicCandidates =
  visibilityPolicy.totals?.publicCandidateCount ?? 0;

const providers = [
  {
    name: "Cloudflare R2",
    recommendedRole: "Primary candidate",
    rank: 1,
    score: 94,
    bestFor: [
      "HDWAV object storage",
      "audio delivery with low egress risk",
      "S3-compatible workflows",
      "custom-domain media paths",
      "future CDN/worker control",
    ],
    strengths: [
      "No egress bandwidth charges on R2 storage classes.",
      "S3-compatible API makes migration/tooling easier.",
      "Strong fit for high-download media catalogs.",
      "Good match for RKS3 because the audio catalog will grow beyond local Git storage.",
    ],
    risks: [
      "Still has request/operation pricing.",
      "Needs bucket policy, custom domain, cache headers, and upload workflow.",
      "Private/protected playback may require extra signed URL or worker logic later.",
    ],
    rks3Decision:
      "Best first-choice storage layer for the full RKS3 HDWAV catalog when moving audio outside Git.",
    launchUse:
      "Use for full-catalog audio objects. Keep app metadata in repo/database and point audioSrc to R2 public/custom-domain URLs.",
    costPosture: "Low egress-risk; request/storage costs still need monitoring.",
  },
  {
    name: "Bunny Storage + Bunny CDN",
    recommendedRole: "Best low-cost CDN alternative",
    rank: 2,
    score: 90,
    bestFor: [
      "simple pay-as-you-go CDN",
      "audio delivery",
      "fast setup",
      "cost-controlled media delivery",
    ],
    strengths: [
      "Simple storage/CDN model.",
      "Low minimum monthly cost.",
      "Good for straightforward public media delivery.",
      "Storage-to-CDN traffic is designed to work together cleanly.",
    ],
    risks: [
      "Not the same ecosystem depth as AWS.",
      "S3-compatible migration story may be less central than R2/S3 depending on exact workflow.",
      "Private access and advanced authorization need careful planning.",
    ],
    rks3Decision:
      "Strong backup choice if RKS3 wants the simplest media CDN setup with predictable delivery pricing.",
    launchUse:
      "Use as alternate media CDN or future dedicated public audio delivery layer.",
    costPosture: "Very cost-friendly for CDN delivery; monitor regional traffic.",
  },
  {
    name: "AWS S3 + CloudFront",
    recommendedRole: "Enterprise-grade option",
    rank: 3,
    score: 82,
    bestFor: [
      "maximum ecosystem maturity",
      "enterprise controls",
      "long-term archival structures",
      "advanced access/security policies",
    ],
    strengths: [
      "Industry-standard object storage and CDN stack.",
      "Excellent durability, permissions, logging, lifecycle rules, and automation options.",
      "Strong for companies already living inside AWS.",
    ],
    risks: [
      "Pricing has more moving parts: storage, requests, transfer, CloudFront delivery, logs, and optional features.",
      "More configuration complexity than RKS3 needs at the current stage.",
      "Billing mistakes can happen if caching and transfer rules are not controlled.",
    ],
    rks3Decision:
      "Powerful, but probably heavier than needed for the first RKS3 full-catalog audio deployment.",
    launchUse:
      "Keep as a later enterprise path if RKS3 needs AWS-level controls or archival automation.",
    costPosture: "Scalable but more complex; requires billing guardrails.",
  },
  {
    name: "Supabase Storage",
    recommendedRole: "Good if Supabase becomes the app backend",
    rank: 4,
    score: 74,
    bestFor: [
      "apps using Supabase auth/database",
      "member uploads",
      "controlled buckets",
      "small-to-medium media libraries",
    ],
    strengths: [
      "Storage buckets integrate with Supabase app architecture.",
      "Fine-grained access controls fit membership features.",
      "CDN caching is built into Supabase Storage delivery.",
    ],
    risks: [
      "Can become less ideal if RKS3's main need is pure high-bandwidth audio delivery.",
      "Storage and egress limits should be watched closely.",
      "May not be the cleanest primary home for 483+ HDWAV audio masters.",
    ],
    rks3Decision:
      "Use if Supabase becomes the RKS3 user/account/backend system. Not the first pick for primary HDWAV media CDN.",
    launchUse:
      "Good for user assets, portal files, private member materials, or admin uploads.",
    costPosture: "Good backend bundle; watch file storage and egress.",
  },
  {
    name: "Vercel Blob",
    recommendedRole: "Convenient Next.js app storage",
    rank: 5,
    score: 67,
    bestFor: [
      "Next.js-native uploads",
      "site assets",
      "admin uploads",
      "small or moderate file workflows",
    ],
    strengths: [
      "Directly integrated with Vercel/Next.js workflows.",
      "Supports public and private access modes.",
      "Simple developer experience for app-managed files.",
    ],
    risks: [
      "Not the strongest primary choice for a growing HDWAV music catalog.",
      "Can tie media storage too closely to the app hosting layer.",
      "Need to monitor usage limits and pricing carefully.",
    ],
    rks3Decision:
      "Useful for app-level uploads, but do not make it the main RKS3 HDWAV catalog storage unless the catalog stays small.",
    launchUse:
      "Use for portal images, admin assets, temporary uploads, or small protected files.",
    costPosture: "Convenient but not the best long-term audio-catalog posture.",
  },
  {
    name: "Git / Vercel public folder",
    recommendedRole: "Not approved for scale",
    rank: 6,
    score: 20,
    bestFor: [
      "small local test sample only",
      "temporary development playback",
    ],
    strengths: [
      "Simple local testing.",
      "Works for the current protected 30-record sample.",
    ],
    risks: [
      "Large audio should not be committed to Git.",
      "Repository bloat breaks professional deployment hygiene.",
      "Not built for 483+ HDWAV records or future 1,100+ record growth.",
    ],
    rks3Decision:
      "Keep only for the active local 30-record sample during development. Do not use for full catalog deployment.",
    launchUse:
      "Development only.",
    costPosture: "Bad scale posture even if it appears free.",
  },
];

const decisionMatrix = {
  generatedAt: new Date().toISOString(),
  mission: "Mission 10T — Full Catalog Storage/CDN Decision Matrix",
  policyStatus: "planning-only",
  livePortalChanged: false,
  activeCatalogChanged: false,
  audioCopied: 0,
  sourceFilesRenamed: false,
  sourceFilesDeleted: false,
  rks3CatalogContext: {
    fullMetadataRecords: fullRecords,
    activeWebsiteSampleRecords: activeRecords,
    publicCandidates,
    reviewCandidates,
    sourceFormatPolicy: "Only HDWAV-sourced records enter the RKS3 Music Portal.",
    currentLocalAudioPolicy:
      "public/audio/rks3 remains a protected local 30-record sample and must not become the full catalog host.",
  },
  primaryRecommendation: {
    winner: "Cloudflare R2",
    backup: "Bunny Storage + Bunny CDN",
    enterprisePath: "AWS S3 + CloudFront",
    appAssetPath: "Vercel Blob or Supabase Storage",
    decision:
      "Use Cloudflare R2 as the first serious full-catalog audio storage candidate. Keep Bunny as the low-cost CDN backup. Keep AWS for later enterprise maturity. Use Vercel Blob/Supabase Storage for app-level files, not the main HDWAV catalog.",
  },
  providerRankings: providers,
  implementationPhases: [
    {
      phase: "10T-1",
      title: "Keep live portal protected",
      action:
        "Do not replace local sample audio yet. Keep the active 30-record portal stable.",
    },
    {
      phase: "10T-2",
      title: "Choose provider",
      action:
        "Approve Cloudflare R2 as primary or Bunny as backup before uploading HDWAV audio.",
    },
    {
      phase: "10T-3",
      title: "Create bucket/storage zone",
      action:
        "Create one storage container for public audio and reserve separate containers for private/member assets later.",
    },
    {
      phase: "10T-4",
      title: "Design canonical media path",
      action:
        "Use stable URLs such as /audio/rks3/full/{category}/{slug}.wav through a custom media domain.",
    },
    {
      phase: "10T-5",
      title: "Upload small pilot",
      action:
        "Upload 5 to 10 HDWAV files only, test playback, cache headers, browser loading, and mobile playback.",
    },
    {
      phase: "10T-6",
      title: "Update metadata path strategy",
      action:
        "Generate external audioSrc values without changing source file names.",
    },
    {
      phase: "10T-7",
      title: "Scale only after review",
      action:
        "Promote full catalog only after weak titles, duplicates, visibility, and storage policy are approved.",
    },
  ],
};

const rankingRows = providers
  .sort((a, b) => a.rank - b.rank)
  .map((provider) => {
    return `| ${provider.rank} | ${safeCell(provider.name)} | ${provider.score} | ${safeCell(
      provider.recommendedRole
    )} | ${safeCell(provider.rks3Decision)} |`;
  });

const detailSections = providers
  .sort((a, b) => a.rank - b.rank)
  .flatMap((provider) => [
    `### ${provider.rank}. ${provider.name}`,
    "",
    `**Role:** ${provider.recommendedRole}`,
    "",
    `**Score:** ${provider.score}/100`,
    "",
    "**Best for:**",
    "",
    ...provider.bestFor.map((item) => `- ${item}`),
    "",
    "**Strengths:**",
    "",
    ...provider.strengths.map((item) => `- ${item}`),
    "",
    "**Risks:**",
    "",
    ...provider.risks.map((item) => `- ${item}`),
    "",
    `**RKS3 decision:** ${provider.rks3Decision}`,
    "",
    `**Launch use:** ${provider.launchUse}`,
    "",
    `**Cost posture:** ${provider.costPosture}`,
    "",
  ]);

const phaseRows = decisionMatrix.implementationPhases.map((phase) => {
  return `| ${safeCell(phase.phase)} | ${safeCell(phase.title)} | ${safeCell(
    phase.action
  )} |`;
});

const md = [
  "# RKS3 Music Storage/CDN Decision Matrix",
  "",
  "## Mission",
  "",
  "Choose the safest storage and CDN direction for the full RKS3 HDWAV catalog without copying audio, renaming source files, deleting tracks, or changing the live 30-record Music Portal.",
  "",
  "## Catalog Context",
  "",
  `- Full metadata records: ${decisionMatrix.rks3CatalogContext.fullMetadataRecords}`,
  `- Active local website sample records: ${decisionMatrix.rks3CatalogContext.activeWebsiteSampleRecords}`,
  `- Public candidates from visibility policy: ${decisionMatrix.rks3CatalogContext.publicCandidates}`,
  `- Review candidates from visibility policy: ${decisionMatrix.rks3CatalogContext.reviewCandidates}`,
  `- Source format rule: ${decisionMatrix.rks3CatalogContext.sourceFormatPolicy}`,
  `- Local audio rule: ${decisionMatrix.rks3CatalogContext.currentLocalAudioPolicy}`,
  "",
  "## Primary Recommendation",
  "",
  `- Winner: ${decisionMatrix.primaryRecommendation.winner}`,
  `- Backup: ${decisionMatrix.primaryRecommendation.backup}`,
  `- Enterprise path: ${decisionMatrix.primaryRecommendation.enterprisePath}`,
  `- App asset path: ${decisionMatrix.primaryRecommendation.appAssetPath}`,
  "",
  decisionMatrix.primaryRecommendation.decision,
  "",
  "## Provider Ranking",
  "",
  "| Rank | Provider | Score | Role | RKS3 Decision |",
  "|---:|---|---:|---|---|",
  ...rankingRows,
  "",
  "## Provider Details",
  "",
  ...detailSections,
  "## Implementation Phases",
  "",
  "| Phase | Title | Action |",
  "|---|---|---|",
  ...phaseRows,
  "",
  "## Hard Rules",
  "",
  "- Do not commit full audio to Git.",
  "- Do not host the full 483-record HDWAV catalog from public/audio/rks3.",
  "- Do not replace the live 30-record sample until external storage is tested.",
  "- Do not delete source files to reduce storage decisions.",
  "- Do not rename source files as part of CDN migration.",
  "- Use metadata audioSrc changes later instead of source-library changes.",
  "",
  "## Next Recommended Mission",
  "",
  "Mission 10U — External Audio Path Strategy. Define canonical future audioSrc paths, custom media domain structure, and metadata migration rules before any upload begins.",
  "",
].join("\n");

fs.writeFileSync(paths.matrixJson, JSON.stringify(decisionMatrix, null, 2));
fs.writeFileSync(paths.matrixMd, md);

console.log("");
console.log("RKS3 STORAGE/CDN DECISION MATRIX COMPLETE");
console.log("-----------------------------------------");
console.log(`Full metadata records: ${decisionMatrix.rks3CatalogContext.fullMetadataRecords}`);
console.log(`Active local sample records: ${decisionMatrix.rks3CatalogContext.activeWebsiteSampleRecords}`);
console.log(`Winner: ${decisionMatrix.primaryRecommendation.winner}`);
console.log(`Backup: ${decisionMatrix.primaryRecommendation.backup}`);
console.log(`JSON matrix: ${paths.matrixJson}`);
console.log(`Markdown matrix: ${paths.matrixMd}`);
console.log("");

console.table(
  providers
    .sort((a, b) => a.rank - b.rank)
    .map((provider) => ({
      rank: provider.rank,
      provider: provider.name,
      score: provider.score,
      role: provider.recommendedRole,
    }))
);