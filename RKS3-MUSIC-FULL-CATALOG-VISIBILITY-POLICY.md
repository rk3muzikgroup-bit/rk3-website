# RKS3 Music Full Catalog Visibility Policy

## Mission

Define how the full HDWAV metadata catalog will later move into Public, Review, and Hidden visibility states without deleting source files, renaming records, copying audio, or changing the live 30-record Music Portal.

## Current Status

- Full catalog records: 483
- Public candidates: 193
- Review candidates: 290
- Hidden candidates: 0
- Unknown category records: 0
- Weak-title records: 10
- Odd filename records: 16
- Future lane records: 3
- Duplicate title groups: 83
- Same-category version clusters: 57

## Production Rule

The live Music Portal remains protected on the 30-record sample. The full 483-record catalog stays metadata-only until storage/CDN, metadata overrides, duplicate review, and visibility decisions are approved.

## Public Rules

- Record is HDWAV-sourced.
- Record has a clean category.
- Record does not have weak-title flags.
- Record does not have unresolved duplicate/version-review flags.
- Record does not require manual review for filename, category, or lane policy.
- Record is approved for public listening.

## Review Rules

- Weak title records stay in review until display title is approved.
- Duplicate/title version clusters stay in review until main/alternate/remix status is decided.
- Street/Soul/Spirit legacy records stay in review until future-lane policy is approved.
- Odd filenames stay in review until confirmed safe.
- Records may be playable later but should not be treated as final public launch records yet.

## Hidden Rules

- Hidden is never automatic.
- Use hidden only for confirmed duplicate clutter, test records, broken audio, private records, or records intentionally excluded from public launch.
- Hidden records should remain in metadata rather than being deleted from source storage.

## Category Visibility Breakdown

| Category | Full Count | Public Candidates | Review Candidates | Hidden Candidates |
|---|---:|---:|---:|---:|
| rnb | 135 | 51 | 84 | 0 |
| rap | 86 | 41 | 45 | 0 |
| healing | 68 | 29 | 39 | 0 |
| instrumentals | 58 | 8 | 50 | 0 |
| poetry | 37 | 13 | 24 | 0 |
| remixes | 34 | 7 | 27 | 0 |
| skits | 29 | 20 | 9 | 0 |
| bilingual | 14 | 5 | 9 | 0 |
| music | 10 | 10 | 0 | 0 |
| promo | 6 | 6 | 0 | 0 |
| mixtapes | 3 | 3 | 0 | 0 |
| soul | 1 | 0 | 1 | 0 |
| spirit | 1 | 0 | 1 | 0 |
| street | 1 | 0 | 1 | 0 |

## Review Reason Counts

| Reason | Count |
|---|---:|
| duplicate-title-group | 273 |
| same-category-version-cluster | 156 |
| non-ascii-file-name | 11 |
| very-short-title | 7 |
| double-space | 5 |
| future-street-soul-spirit-lane | 3 |
| number-only-title | 2 |
| no-alphanumeric-title | 2 |
| weak-audio-slug | 2 |

## Next Actions

- Approve weak-title display names.
- Review duplicate/version clusters.
- Choose public main versions for repeated titles.
- Mark confirmed extras as alternate, remix, review, or hidden.
- Choose CDN/storage before full-catalog promotion.
- Promote full catalog only after metadata and storage policy are approved.

## Final Decision

RKS3 should use metadata visibility to organize the full catalog. Do not delete tracks to clean the catalog. Do not rename source files unless a separate source-library cleanup mission is approved.
