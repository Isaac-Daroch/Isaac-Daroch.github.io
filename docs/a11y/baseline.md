# Grafito editorial v2 — baseline and implementation plan

Date: 2026-10-18. Inspected source: `8cb293d4872780bec826221497f2865951c0eeaf` (published 1.1.0). Work branch: `feature/grafito-self-model-v2`. No production deployment authorized by this revision; do not merge or publish automatically. D1/D2 remain historical requirements; this document records the new scope, not a retroactive acceptance.

## Sources and inspected state

The owner supplied `PROMPT_MAESTRO(1).txt`, specification 1.0, and `INSTRUCCION_DE_ARRANQUE(1).txt`. The complete implementation instructions, 24 palettes, 55 WCAG criteria, 42 acceptance scripts and S01–S40 references were read. The palette JSON is reconstructed exactly from Annex A; the text of those files is a specification, not test evidence.

Observed in repository: Astro 7.4.0, Quarto reference 1.10.18, Node reference 24.19.0; versioned package-lock; 9 Astro page sources; 5 Quarto sources; BaseLayout shared navigation; CSS/GSAP/Three.js decorative enhancements; a deterministic BFS educational lab with v1/v2 export; D2 governance checks; explicit publication workflow. No AGENTS.md appeared in the recursive tracked tree. Existing public profile links: GitHub, ORCID, LinkedIn and email. Existing publication record had `verifiedAt:null`; the institutional record was separately inspected on 2026-10-18 and identifies an August 2026 published article.

Observed limitations in code: one dark palette; no full preference form; English only; no event/news archives; internal model in the legacy lab describes the external map, not the agent's own capabilities; narrative needs replacement. Functional helpers must not be discarded with decoration. Navigation, code-copy and original lab routes remain covered by regression tests.

Execution baseline: `.github/workflows/v2-baseline.yml` checks out the immutable source above and executes locked installation, original syntax/unit/architecture/type checks and real Quarto–Astro build. Its logs/artifact are execution evidence. This document does not mark the workflow as passed before it completes. Local ChatGPT container and Python failed to start during this task; compilation is performed on GitHub Actions, not represented as a local Windows run.

## Plan tied to requirement IDs

1. AUD-01–03/GOV-05: immutable baseline, branch, record provenance and protect source/history.
2. IA-01–03/SEM/INPUT/COMP: shared semantic layout, stable routes, descriptive links, native controls, keyboard and no-JS fallback. Add complete navigation through a site map, without a mandatory search box.
3. VIS-01–08/PREF-01–06/READ/ARCH: one JSON for 24 palettes; generate CSS; pure resolution functions; local, session and in-document fallbacks; text scaling, reading, spacing, forced-colors. No decorative motion, WebGL background, overlay or theme-transition animation.
4. DATA/SCI/MEDIA/LANG: structured editorial archive, truthful statuses, source-linked research summary, events/news/video schema and empty states; English primary, explicit Spanish support; Quarto shares tokens/preferences. No fabricated videos or dates; publication of new media requires its alternatives and editorial review.
5. New `SM-*` scope: implement a separate, bounded educational self-model observatory; do not relabel BFS. Distinguish designed utility/retention rules from estimates learned online, and experiments from scientific findings.
6. QA/CI/OUT/DONE: real build and browser checks; 384 token pairs; 55-criterion matrix and 42 cases with manual portions pending. No whole-site WCAG claim. Prepare PR and downloadable evidence without production deployment.

## Inventory to complete during build

Routes, scripts, dependencies and generated resources are captured by CI. No owned audio/video or PDF is added without a verified source and alternative. Native disclosure controls replace a custom preferences modal. Contact uses a verified email, not a nonfunctional send form. News is an editorial archive, not an automatic endorsement or a live feed. No authentication, database, service worker, external analytics or location collection is introduced.
