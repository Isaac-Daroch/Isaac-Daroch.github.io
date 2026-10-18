# ADR-016 — Verified content, deliberate media loading and review-only release

Status: implemented candidate. Drivers: GOV05, DATA01–02, MEDIA01–03, SCI06, OUT01–02, startup instructionL15. Date:2026-10-18.

Decision: preserve confirmed authored bibliography and professional links; prepare event/video collections but publish no invented records. Source-linked news separates factual summary from editorial context. There is no autoplay social feed, external player or fake contact form. Media requires explicit action and verified alternatives when records exist.

Alternatives: scrape all personal context into a public timeline (rejected privacy/authorship risk); invent a video account or sample DOI to fill a layout (rejected factuality); embed social feeds on load (rejected privacy/performance/accessibility uncertainty); auto-merge/deploy after green CI (rejected latest owner instruction).

Benefits: trust, lower initial data use, no third-party gating of core reading, clean source provenance. Costs: some archives are honestly empty until the owner supplies approved records; the candidate needs explicit subsequent publication authorization. Empty content is not a functional failure disguised as a finished catalog.

Reversibility: add reviewed structured records without navigation rewrite. Adding videos, PDF, maps or live media changes WCAG applicability and must update the matrix; no global pass carries forward. Evidence: structural content checks, zero automatically loaded media, no invented-account tests and PR status.
