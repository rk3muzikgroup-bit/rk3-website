# RKS3 Music Full Catalog Dashboard

## Executive Summary

- Full metadata catalog records: 483
- Active live website catalog records: 30
- Audio copied during full metadata review: 0
- Source root: /Volumes/RK3 DJ SET/RKS3-BACKUP folder/Music Portal
- Category count: 14
- Unknown category records: 0
- Weak-title records: 10
- Odd filename records: 16
- Future lane records: 3
- Duplicate title groups: 83
- Same-category version clusters: 57
- Review candidates: 290

## Production Rule

The full HDWAV catalog remains metadata-only until storage/CDN, public/review/hidden rules, and metadata override strategy are approved. The live Music Portal remains protected on the 30-record sample.

## Category Distribution

| Category | Count | Share |
|---|---:|---:|
| rnb | 135 | 28% |
| rap | 86 | 17.8% |
| healing | 68 | 14.1% |
| instrumentals | 58 | 12% |
| poetry | 37 | 7.7% |
| remixes | 34 | 7% |
| skits | 29 | 6% |
| bilingual | 14 | 2.9% |
| music | 10 | 2.1% |
| promo | 6 | 1.2% |
| mixtapes | 3 | 0.6% |
| soul | 1 | 0.2% |
| spirit | 1 | 0.2% |
| street | 1 | 0.2% |

## Top Categories

- rnb: 135 records (28%)
- rap: 86 records (17.8%)
- healing: 68 records (14.1%)
- instrumentals: 58 records (12%)
- poetry: 37 records (7.7%)
- remixes: 34 records (7%)
- skits: 29 records (6%)
- bilingual: 14 records (2.9%)

## Weak Title Plan

| Category | Current Title | Proposed Title | File |
|---|---|---|---|
| healing | fa | FA — Title Review | fa (1).hdwav.wav |
| instrumentals | 0332125 | Untitled Instrumental 0332125 | 0332125.hdwav.wav |
| poetry | ❤️ ☀️ | Love & Light | ❤️ ☀️ (5).hdwav.wav |
| poetry | fa | FA — Title Review | fa (2).hdwav.wav |
| poetry | I | I — Title Review | I (3).hdwav.wav |
| remixes | I | I — Title Review | I.hdwav.wav |
| rnb | ❤️ ☀️ | Love & Light | ❤️ ☀️ (8).hdwav.wav |
| rnb | 7 | Seven | 7 (12).hdwav.wav |
| rnb | fa | FA — Title Review | fa (9).hdwav.wav |
| rnb | LC | LC — Title Review | LC (1).hdwav.wav |

## Top Duplicate Title Groups

| Normalized Title | Count | Categories | Recommendation |
|---|---:|---|---|
| crystal code | 9 | Instrumentals | same-title-version-review |
| heart | 7 | Instrumentals | same-title-version-review |
| level up | 7 | Bilingual, Rap, Remixes, R&B | cross-category-title-review |
| hurt | 6 | Remixes, R&B | cross-category-title-review |
| law | 6 | Healing, Instrumentals, Rap, Remixes, R&B | cross-category-title-review |
| throat | 6 | Instrumentals | same-title-version-review |
| women | 6 | Poetry, Rap, R&B | cross-category-title-review |
| yoga down | 6 | Healing | same-title-version-review |
| yourself | 6 | Healing, Poetry, Remixes, R&B | cross-category-title-review |
| 3rd eye | 5 | Instrumentals | same-title-version-review |
| fo sho | 5 | Rap, R&B | cross-category-title-review |
| l o v e | 5 | Healing, Poetry, Rap, R&B | cross-category-title-review |

## Top Same-Category Version Clusters

| Category | Normalized Title | Count | Recommendation |
|---|---|---:|---|
| instrumentals | crystal code | 9 | same-category-version-review |
| instrumentals | heart | 7 | same-category-version-review |
| healing | yoga down | 6 | same-category-version-review |
| instrumentals | throat | 6 | same-category-version-review |
| instrumentals | 3rd eye | 5 | same-category-version-review |
| rnb | fo sho | 4 | same-category-version-review |
| rnb | hurt | 4 | same-category-version-review |
| bilingual | bi lingual | 3 | same-category-version-review |
| bilingual | reggaetone | 3 | same-category-version-review |
| healing | mastery | 3 | same-category-version-review |
| healing | tester | 3 | same-category-version-review |
| instrumentals | crown | 3 | same-category-version-review |

## Cleanup Phases

| Phase | Title | Status | Notes |
|---|---|---|---|
| Phase 1 | Protect the live portal | Complete | Live Music Portal stays on the 30-record local sample while full catalog review continues. |
| Phase 2 | Correct category aliases | Complete | english:spanish now maps to bilingual. Unknown category count is zero. |
| Phase 3 | Plan weak-title overrides | Complete | 10 weak-title records have proposed display titles. No source files renamed. |
| Phase 4 | Review duplicate/version groups | Planned | 83 duplicate title groups and 57 same-category version clusters need main/alternate/remix/review decisions. |
| Phase 5 | Choose storage/CDN | Pending | Full HDWAV audio should move to external object storage/CDN before scale deployment. |
| Phase 6 | Promote full catalog safely | Pending | Only after metadata, storage, and public/review/hidden rules are approved. |

## Next Recommended Mission

Mission 10S — Full Catalog Public / Review / Hidden Policy. Define how records move from full metadata review into public launch lanes without deleting files or breaking the live portal.
