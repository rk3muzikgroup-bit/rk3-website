# RKS3 Music Storage/CDN Decision Matrix

## Mission

Choose the safest storage and CDN direction for the full RKS3 HDWAV catalog without copying audio, renaming source files, deleting tracks, or changing the live 30-record Music Portal.

## Catalog Context

- Full metadata records: 483
- Active local website sample records: 30
- Public candidates from visibility policy: 193
- Review candidates from visibility policy: 290
- Source format rule: Only HDWAV-sourced records enter the RKS3 Music Portal.
- Local audio rule: public/audio/rks3 remains a protected local 30-record sample and must not become the full catalog host.

## Primary Recommendation

- Winner: Cloudflare R2
- Backup: Bunny Storage + Bunny CDN
- Enterprise path: AWS S3 + CloudFront
- App asset path: Vercel Blob or Supabase Storage

Use Cloudflare R2 as the first serious full-catalog audio storage candidate. Keep Bunny as the low-cost CDN backup. Keep AWS for later enterprise maturity. Use Vercel Blob/Supabase Storage for app-level files, not the main HDWAV catalog.

## Provider Ranking

| Rank | Provider | Score | Role | RKS3 Decision |
|---:|---|---:|---|---|
| 1 | Cloudflare R2 | 94 | Primary candidate | Best first-choice storage layer for the full RKS3 HDWAV catalog when moving audio outside Git. |
| 2 | Bunny Storage + Bunny CDN | 90 | Best low-cost CDN alternative | Strong backup choice if RKS3 wants the simplest media CDN setup with predictable delivery pricing. |
| 3 | AWS S3 + CloudFront | 82 | Enterprise-grade option | Powerful, but probably heavier than needed for the first RKS3 full-catalog audio deployment. |
| 4 | Supabase Storage | 74 | Good if Supabase becomes the app backend | Use if Supabase becomes the RKS3 user/account/backend system. Not the first pick for primary HDWAV media CDN. |
| 5 | Vercel Blob | 67 | Convenient Next.js app storage | Useful for app-level uploads, but do not make it the main RKS3 HDWAV catalog storage unless the catalog stays small. |
| 6 | Git / Vercel public folder | 20 | Not approved for scale | Keep only for the active local 30-record sample during development. Do not use for full catalog deployment. |

## Provider Details

### 1. Cloudflare R2

**Role:** Primary candidate

**Score:** 94/100

**Best for:**

- HDWAV object storage
- audio delivery with low egress risk
- S3-compatible workflows
- custom-domain media paths
- future CDN/worker control

**Strengths:**

- No egress bandwidth charges on R2 storage classes.
- S3-compatible API makes migration/tooling easier.
- Strong fit for high-download media catalogs.
- Good match for RKS3 because the audio catalog will grow beyond local Git storage.

**Risks:**

- Still has request/operation pricing.
- Needs bucket policy, custom domain, cache headers, and upload workflow.
- Private/protected playback may require extra signed URL or worker logic later.

**RKS3 decision:** Best first-choice storage layer for the full RKS3 HDWAV catalog when moving audio outside Git.

**Launch use:** Use for full-catalog audio objects. Keep app metadata in repo/database and point audioSrc to R2 public/custom-domain URLs.

**Cost posture:** Low egress-risk; request/storage costs still need monitoring.

### 2. Bunny Storage + Bunny CDN

**Role:** Best low-cost CDN alternative

**Score:** 90/100

**Best for:**

- simple pay-as-you-go CDN
- audio delivery
- fast setup
- cost-controlled media delivery

**Strengths:**

- Simple storage/CDN model.
- Low minimum monthly cost.
- Good for straightforward public media delivery.
- Storage-to-CDN traffic is designed to work together cleanly.

**Risks:**

- Not the same ecosystem depth as AWS.
- S3-compatible migration story may be less central than R2/S3 depending on exact workflow.
- Private access and advanced authorization need careful planning.

**RKS3 decision:** Strong backup choice if RKS3 wants the simplest media CDN setup with predictable delivery pricing.

**Launch use:** Use as alternate media CDN or future dedicated public audio delivery layer.

**Cost posture:** Very cost-friendly for CDN delivery; monitor regional traffic.

### 3. AWS S3 + CloudFront

**Role:** Enterprise-grade option

**Score:** 82/100

**Best for:**

- maximum ecosystem maturity
- enterprise controls
- long-term archival structures
- advanced access/security policies

**Strengths:**

- Industry-standard object storage and CDN stack.
- Excellent durability, permissions, logging, lifecycle rules, and automation options.
- Strong for companies already living inside AWS.

**Risks:**

- Pricing has more moving parts: storage, requests, transfer, CloudFront delivery, logs, and optional features.
- More configuration complexity than RKS3 needs at the current stage.
- Billing mistakes can happen if caching and transfer rules are not controlled.

**RKS3 decision:** Powerful, but probably heavier than needed for the first RKS3 full-catalog audio deployment.

**Launch use:** Keep as a later enterprise path if RKS3 needs AWS-level controls or archival automation.

**Cost posture:** Scalable but more complex; requires billing guardrails.

### 4. Supabase Storage

**Role:** Good if Supabase becomes the app backend

**Score:** 74/100

**Best for:**

- apps using Supabase auth/database
- member uploads
- controlled buckets
- small-to-medium media libraries

**Strengths:**

- Storage buckets integrate with Supabase app architecture.
- Fine-grained access controls fit membership features.
- CDN caching is built into Supabase Storage delivery.

**Risks:**

- Can become less ideal if RKS3's main need is pure high-bandwidth audio delivery.
- Storage and egress limits should be watched closely.
- May not be the cleanest primary home for 483+ HDWAV audio masters.

**RKS3 decision:** Use if Supabase becomes the RKS3 user/account/backend system. Not the first pick for primary HDWAV media CDN.

**Launch use:** Good for user assets, portal files, private member materials, or admin uploads.

**Cost posture:** Good backend bundle; watch file storage and egress.

### 5. Vercel Blob

**Role:** Convenient Next.js app storage

**Score:** 67/100

**Best for:**

- Next.js-native uploads
- site assets
- admin uploads
- small or moderate file workflows

**Strengths:**

- Directly integrated with Vercel/Next.js workflows.
- Supports public and private access modes.
- Simple developer experience for app-managed files.

**Risks:**

- Not the strongest primary choice for a growing HDWAV music catalog.
- Can tie media storage too closely to the app hosting layer.
- Need to monitor usage limits and pricing carefully.

**RKS3 decision:** Useful for app-level uploads, but do not make it the main RKS3 HDWAV catalog storage unless the catalog stays small.

**Launch use:** Use for portal images, admin assets, temporary uploads, or small protected files.

**Cost posture:** Convenient but not the best long-term audio-catalog posture.

### 6. Git / Vercel public folder

**Role:** Not approved for scale

**Score:** 20/100

**Best for:**

- small local test sample only
- temporary development playback

**Strengths:**

- Simple local testing.
- Works for the current protected 30-record sample.

**Risks:**

- Large audio should not be committed to Git.
- Repository bloat breaks professional deployment hygiene.
- Not built for 483+ HDWAV records or future 1,100+ record growth.

**RKS3 decision:** Keep only for the active local 30-record sample during development. Do not use for full catalog deployment.

**Launch use:** Development only.

**Cost posture:** Bad scale posture even if it appears free.

## Implementation Phases

| Phase | Title | Action |
|---|---|---|
| 10T-1 | Keep live portal protected | Do not replace local sample audio yet. Keep the active 30-record portal stable. |
| 10T-2 | Choose provider | Approve Cloudflare R2 as primary or Bunny as backup before uploading HDWAV audio. |
| 10T-3 | Create bucket/storage zone | Create one storage container for public audio and reserve separate containers for private/member assets later. |
| 10T-4 | Design canonical media path | Use stable URLs such as /audio/rks3/full/{category}/{slug}.wav through a custom media domain. |
| 10T-5 | Upload small pilot | Upload 5 to 10 HDWAV files only, test playback, cache headers, browser loading, and mobile playback. |
| 10T-6 | Update metadata path strategy | Generate external audioSrc values without changing source file names. |
| 10T-7 | Scale only after review | Promote full catalog only after weak titles, duplicates, visibility, and storage policy are approved. |

## Hard Rules

- Do not commit full audio to Git.
- Do not host the full 483-record HDWAV catalog from public/audio/rks3.
- Do not replace the live 30-record sample until external storage is tested.
- Do not delete source files to reduce storage decisions.
- Do not rename source files as part of CDN migration.
- Use metadata audioSrc changes later instead of source-library changes.

## Next Recommended Mission

Mission 10U — External Audio Path Strategy. Define canonical future audioSrc paths, custom media domain structure, and metadata migration rules before any upload begins.
