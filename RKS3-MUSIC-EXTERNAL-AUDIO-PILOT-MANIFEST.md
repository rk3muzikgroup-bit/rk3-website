# RKS3 Music External Audio Pilot Manifest

## Mission

Select 5 to 10 HDWAV records for the first external storage/CDN pilot without copying audio, uploading audio, renaming source files, deleting tracks, or changing the live 30-record Music Portal.

## Status

- Policy status: manifest-only
- Audio copied: 0
- Audio uploaded: 0
- Live portal changed: false
- Active catalog changed: false
- Active overrides changed: false
- Source files renamed: false
- Source files deleted: false

## Catalog Context

- Full metadata records: 483
- Eligible public HDWAV candidates: 193
- Review records excluded: 290
- Active local sample records: 30
- Primary storage candidate: Cloudflare R2
- Backup storage candidate: Bunny Storage + Bunny CDN
- Media domain: https://media.rks3.com

## Pilot Policy

- Pilot size: 10
- Selection rule: Select public-candidate HDWAV records across multiple categories, excluding review records and preserving source filenames.
- Upload rule: Upload manually later only after storage provider is approved. This manifest does not upload audio.
- Live portal rule: Do not connect pilot URLs to the live Music Portal until desktop/mobile playback is tested.

## Pilot Records

| # | Category | Title | Source File | Storage Object Key | Clean Public Audio Src |
|---:|---|---|---|---|---|
| 1 | rnb | Ashes in the Air | Ashes in the Air.hdwav.wav | audio/rks3/full/rnb/rnb-ashes-in-the-air-fa79b3b4/Ashes in the Air.hdwav.wav | https://media.rks3.com/audio/rks3/full/rnb/rnb-ashes-in-the-air-fa79b3b4/ashes-in-the-air.wav |
| 2 | rnb | BAE-CATION.R&B | BAE-CATION.R&B.hdwav.wav | audio/rks3/full/rnb/rnb-bae-cation-r-and-b-77fda844/BAE-CATION.R&B.hdwav.wav | https://media.rks3.com/audio/rks3/full/rnb/rnb-bae-cation-r-and-b-77fda844/bae-cation-r-and-b.wav |
| 3 | rap | 40 Projects | 40_Projects.hdwav.wav | audio/rks3/full/rap/rap-40-projects-388011db/40_Projects.hdwav.wav | https://media.rks3.com/audio/rks3/full/rap/rap-40-projects-388011db/40-projects.wav |
| 4 | rap | AllNight | AllNight.hdwav.wav | audio/rks3/full/rap/rap-allnight-8c01397b/AllNight.hdwav.wav | https://media.rks3.com/audio/rks3/full/rap/rap-allnight-8c01397b/allnight.wav |
| 5 | healing | 01.chakra energies | 01.chakra energies.hdwav.wav | audio/rks3/full/healing/healing-01-chakra-energies-063411e5/01.chakra energies.hdwav.wav | https://media.rks3.com/audio/rks3/full/healing/healing-01-chakra-energies-063411e5/01-chakra-energies.wav |
| 6 | instrumentals | ASTRAL | ASTRAL.hdwav.wav | audio/rks3/full/instrumentals/instrumentals-astral-ee282693/ASTRAL.hdwav.wav | https://media.rks3.com/audio/rks3/full/instrumentals/instrumentals-astral-ee282693/astral.wav |
| 7 | poetry | Breakthrough | Breakthrough.hdwav.wav | audio/rks3/full/poetry/poetry-breakthrough-d52a1615/Breakthrough.hdwav.wav | https://media.rks3.com/audio/rks3/full/poetry/poetry-breakthrough-d52a1615/breakthrough.wav |
| 8 | bilingual | GROW BI | GROW BI (1).hdwav.wav | audio/rks3/full/bilingual/bilingual-grow-bi-c5ee4c73/GROW BI (1).hdwav.wav | https://media.rks3.com/audio/rks3/full/bilingual/bilingual-grow-bi-c5ee4c73/grow-bi.wav |
| 9 | remixes | all 1 | all 1.hdwav.wav | audio/rks3/full/remixes/remixes-all-1-48b1bbb9/all 1.hdwav.wav | https://media.rks3.com/audio/rks3/full/remixes/remixes-all-1-48b1bbb9/all-1.wav |
| 10 | promo | COME JOIN US FAMILY | COME JOIN US FAMILY.hdwav.wav | audio/rks3/full/promo/promo-come-join-us-family-942a64be/COME JOIN US FAMILY.hdwav.wav | https://media.rks3.com/audio/rks3/full/promo/promo-come-join-us-family-942a64be/come-join-us-family.wav |

## Pilot Test Checklist

| # | Test | Status |
|---:|---|---|
| 1 | Confirm selected source files exist on external drive. | Not started |
| 2 | Create storage bucket or storage zone. | Not started |
| 3 | Upload pilot records only. | Not started |
| 4 | Confirm MIME type for WAV audio. | Not started |
| 5 | Confirm range requests / seeking. | Not started |
| 6 | Confirm Chrome desktop playback. | Not started |
| 7 | Confirm Safari desktop playback. | Not started |
| 8 | Confirm iPhone playback. | Not started |
| 9 | Confirm Samsung/Android playback. | Not started |
| 10 | Confirm cache headers. | Not started |
| 11 | Confirm clean public URL behavior. | Not started |
| 12 | Only then create a separate pilot catalog for playback testing. | Not started |

## Hard Rules

- This manifest does not upload audio.
- Do not connect pilot URLs to the live Music Portal yet.
- Do not rename source files for clean URLs.
- Do not delete excluded records.
- Do not treat review records as bad records.
- Do not commit full audio to Git.

## Next Recommended Mission

Mission 10W — External Audio Upload Checklist. Create the exact manual upload checklist for Cloudflare R2 or Bunny, including MIME type, cache headers, CORS, custom domain, and playback tests.
