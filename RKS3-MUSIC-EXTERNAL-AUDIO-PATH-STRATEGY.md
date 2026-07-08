# RKS3 Music External Audio Path Strategy

## Mission

Define the future external audio path structure for the full RKS3 HDWAV catalog before any upload, source-file change, or live Music Portal change occurs.

## Catalog Context

- Full metadata records: 483
- Active local sample records: 30
- Primary storage candidate: Cloudflare R2
- Backup storage candidate: Bunny Storage + Bunny CDN
- Future media domain: https://media.rks3.com

## Path Policy

- Storage object root: `audio/rks3/full`
- Storage object pattern: `audio/rks3/full/{category}/{recordId}/{originalFileName}`
- Clean public URL pattern: `https://media.rks3.com/audio/rks3/full/{category}/{recordId}/{titleSlug}.wav`
- Direct object URL pattern: `https://media.rks3.com/audio/rks3/full/{category}/{recordId}/{originalFileName}`
- Record ID required: true
- Source filename preserved in storage: true
- Website URL extension: `.wav`
- Source format metadata value: `hdwav`

## Why Record IDs Are Required

The full catalog contains duplicate title groups and same-category version clusters. Record IDs prevent URL collisions.

## Extension Policy

Original source files may remain named .hdwav.wav in storage, while clean public audioSrc values can end in .wav through metadata mapping or future edge routing.

## Hard Rules

- Do not commit full audio to Git.
- Do not use public/audio/rks3 as the full catalog host.
- Do not rename source files during external storage migration.
- Do not delete source files during storage migration.
- Do not build clean public URLs without record IDs.
- Do not promote full catalog paths until a 5-to-10-file pilot is tested.
- Keep current live 30-record sample protected until external playback is proven.

## Category Breakdown

| Category | Count |
|---|---:|
| rnb | 135 |
| rap | 86 |
| healing | 68 |
| instrumentals | 58 |
| poetry | 37 |
| remixes | 34 |
| skits | 29 |
| bilingual | 14 |
| music | 10 |
| promo | 6 |
| mixtapes | 3 |
| soul | 1 |
| spirit | 1 |
| street | 1 |

## Sample Proposed Paths

| Category | Title | Storage Object Key | Clean Public Audio Src |
|---|---|---|---|
| bilingual | Bi-Lingual | audio/rks3/full/bilingual/bilingual-bi-lingual-8e959e7e/Bi-Lingual (1).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-bi-lingual-8e959e7e/bi-lingual.wav |
| bilingual | Bi-Lingual | audio/rks3/full/bilingual/bilingual-bi-lingual-09ae936f/Bi-Lingual (10).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-bi-lingual-09ae936f/bi-lingual.wav |
| bilingual | Bi-Lingual | audio/rks3/full/bilingual/bilingual-bi-lingual-5bdcad5c/Bi-Lingual (3).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-bi-lingual-5bdcad5c/bi-lingual.wav |
| bilingual | FREE | audio/rks3/full/bilingual/bilingual-free-727bfdae/FREE (1).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-free-727bfdae/free.wav |
| bilingual | FREE | audio/rks3/full/bilingual/bilingual-free-4970aa3e/FREE (2).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-free-4970aa3e/free.wav |
| bilingual | GROW BI | audio/rks3/full/bilingual/bilingual-grow-bi-c5ee4c73/GROW BI (1).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-grow-bi-c5ee4c73/grow-bi.wav |
| bilingual | grow whole Bi | audio/rks3/full/bilingual/bilingual-grow-whole-bi-f8154183/grow whole Bi (3).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-grow-whole-bi-f8154183/grow-whole-bi.wav |
| bilingual | L.O.T.U. bi | audio/rks3/full/bilingual/bilingual-l-o-t-u-bi-cce3d4af/L.O.T.U. bi (1).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-l-o-t-u-bi-cce3d4af/l-o-t-u-bi.wav |
| bilingual | LEVEL UP | audio/rks3/full/bilingual/bilingual-level-up-865b0467/LEVEL UP (27) .hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-level-up-865b0467/level-up.wav |
| bilingual | LONG RUN NEO SOUL | audio/rks3/full/bilingual/bilingual-long-run-neo-soul-8d1fdfb2/LONG RUN NEO SOUL (1).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-long-run-neo-soul-8d1fdfb2/long-run-neo-soul.wav |
| bilingual | REGGAETONE | audio/rks3/full/bilingual/bilingual-reggaetone-59768173/REGGAETONE (1).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-reggaetone-59768173/reggaetone.wav |
| bilingual | REGGAETONE | audio/rks3/full/bilingual/bilingual-reggaetone-3883752c/REGGAETONE (2).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-reggaetone-3883752c/reggaetone.wav |

## Implementation Phases

| Phase | Title | Action |
|---|---|---|
| 10U-1 | Approve canonical path shape | Use category plus record ID plus slug so duplicate titles cannot collide. |
| 10U-2 | Create external media domain | Reserve media.rks3.com for audio delivery through the chosen storage/CDN provider. |
| 10U-3 | Upload pilot only | Upload 5 to 10 HDWAV files using storage object keys that preserve original filenames. |
| 10U-4 | Generate pilot metadata | Create a pilot catalog that points audioSrc to external media URLs without touching the live portal. |
| 10U-5 | Test playback | Confirm desktop, mobile, Safari, Chrome, seeking, range requests, caching, and load speed. |
| 10U-6 | Scale after approval | Only promote full catalog external audioSrc values after metadata, visibility, and storage decisions are locked. |

## Final Decision

RKS3 should use metadata-driven external audio paths. The storage layer may preserve original HDWAV filenames, while the website can use clean public audioSrc URLs that include category, record ID, and title slug. No source files should be renamed to make URLs look cleaner.

## Next Recommended Mission

Mission 10V — External Audio Pilot Manifest. Select 5 to 10 HDWAV records for the first Cloudflare R2/Bunny pilot upload without changing the live Music Portal.
