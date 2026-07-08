# RKS3 Music Catalog Scale Strategy

## Mission

Scale the RKS3 Music Portal from the current 30-record local HDWAV sample toward the full 480-record HDWAV catalog without bloating Git, breaking deployment, or forcing the 2025 catalog into categories it was not originally built for.

## Current State

- The RKS3 Music Portal is connected to a generated HDWAV-only catalog.
- The active local development sample contains 30 balanced records.
- The full external source scan found 480 HDWAV records.
- MP3 files are intentionally excluded from the RKS3.COM music layer.
- Regular WAV files are intentionally excluded from the RKS3.COM music layer.
- Mac AppleDouble metadata files are ignored.
- Generated local audio files are protected by `.gitignore`.

## Category Decision

The 2025 HDWAV catalog will keep the current real-file category structure.

Current launch categories include:

- R&B
- Rap
- Poetry
- Instrumentals
- Healing
- Remixes
- Soundscapes
- Bilingual
- Promo
- Skits
- System audio where needed

Do not force the current 2025 catalog into Street / Soul / Spirit folders.

Street, Soul, and Spirit remain master RKS3 lanes and future creative worlds.

## Street / Soul / Spirit Policy

Street / Soul / Spirit are not being used as forced retroactive music categories for the 2025 catalog.

They remain:

- Street: brand lane / future music world
- Soul: brand lane / future music world
- Spirit: brand lane / future music world
- Unified: cross-world / system-level lane

The 2027 music build may create brand-new intentional folders:

- RKS3=street
- RKS3=soul
- RKS3=spirit

Those future records should be created specifically for those lanes instead of retrofitting the 2025 library.

## Core Rule

Only HDWAV-sourced records enter the RKS3 Music Portal.

The website may serve files with a `.wav` path after ingestion because the real source files are named like `.hdwav.wav`, but the catalog classification must remain:

```txt
sourceFormat: "hdwav"
```

## Git Safety Rule

Large audio files must not be committed to Git.

Git should track:

- Source code
- Catalog metadata
- Metadata overrides
- Ingest scripts
- QC scripts
- Strategy and operational docs

Git should not track:

- `public/audio/rks3/`
- Generated full audio libraries
- Local sample audio binaries
- QC report outputs
- External drive backups

## Development Layer

The 30-record balanced sample remains the local development and testing layer.

Purpose:

- Test UI
- Test filters
- Test record rooms
- Test metadata badges
- Test timing/seek controls
- Test category spread
- Avoid heavy local repo growth

## Production Scale Layer

The full 480 HDWAV catalog should move to an external storage/CDN layer before public deployment at scale.

RKS3.COM should become:

- Interface
- Catalog brain
- Metadata layer
- Record room system
- Playback experience

RKS3.COM should not become a giant committed audio-file repository.

## Future Storage Direction

Possible future storage targets:

- Cloudflare R2
- AWS S3 + CloudFront
- Supabase Storage
- Vercel Blob
- Dedicated media CDN

Final selection should be based on:

- Cost
- Bandwidth
- File size
- Upload workflow
- Public URL stability
- Long-term RKS3 ownership

## Catalog Modes

The system should support three catalog modes.

### 1. Local Sample Mode

Used for daily development.

```txt
30 records
public/audio/rks3/
local playback
fast testing
not committed
```

### 2. Full Metadata Mode

Used to review all 480 HDWAV records without copying audio into the app.

```txt
480 records
catalog metadata generated
audio files not copied
useful for QC, title cleanup, category review, override planning
```

### 3. Production CDN Mode

Used when audio files are hosted externally.

```txt
480 records
audioSrc points to CDN/object-storage URLs
metadata tracked in Git
audio binaries outside Git
deployment-safe
```

## Ingestion Policy

Do not run full-copy mode into the repo unless there is a specific temporary reason.

Safe commands:

```bash
# Balanced local sample
node scripts/rks3-hdwav-ingest.mjs "/Volumes/RK3 DJ SET/RKS3-BACKUP folder/Music Portal" --balanced-sample=5 --copy --clean-output

# Full dry scan / metadata inspection
node scripts/rks3-hdwav-ingest.mjs "/Volumes/RK3 DJ SET/RKS3-BACKUP folder/Music Portal" --dry
```

Unsafe command pattern:

```bash
# Avoid this for production-scale work inside repo
node scripts/rks3-hdwav-ingest.mjs "/Volumes/RK3 DJ SET/RKS3-BACKUP folder/Music Portal" --copy --clean-output
```

Reason: full-copy mode may place very large audio volume into the app workspace.

## Metadata Override Strategy

Metadata overrides remain the correction layer.

Use overrides for:

- Weak titles
- Emoji-only titles
- Numeric titles
- Review visibility
- Priority labels
- Display subtitles
- Mood tags
- Public / review / hidden states

Do not rename original source files unless a separate source-library cleanup mission is approved.

## Poetry Strategy

Poetry remains a valid current category.

Later, poetry can be expanded with:

- Lyric-only versions
- Spoken-word versions
- Poem readings based on existing songs
- Companion text/audio records

This does not require changing the current music category system.

## Deployment Rule

Before deployment, verify:

```bash
git ls-files public/audio/rks3
```

Expected:

```txt
blank output
```

Also verify:

```bash
git status --short public/audio/rks3 data/rks3-audio-qc-report.json
```

Expected:

```txt
no tracked staged audio files
```

## Next Build Missions

### Mission 10M — Full Catalog Metadata Mode

Upgrade the ingest script so it can generate a 480-record catalog without copying audio files into `public/audio/rks3`.

### Mission 10N — CDN Audio Source Mode

Add an ingest option that rewrites `audioSrc` to a configured CDN/object-storage base URL.

### Mission 10O — Full Catalog QC Dashboard

Generate a review dashboard/report for all 480 records: weak titles, duplicate groups, category counts, overrides needed, and release readiness.

### Mission 10P — Production Storage Selection

Choose the external media storage target for the 480 HDWAV catalog.

## Final Decision

Proceed with the existing 2025 category infrastructure.

Do not rebuild the current catalog around Street / Soul / Spirit.

Use the current 2025 HDWAV records as the first public Music Portal library.

Build new intentional Street / Soul / Spirit music material later for the 2027 expansion.
