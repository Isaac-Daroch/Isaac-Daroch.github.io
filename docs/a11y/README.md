# V2 — Grafito editorial and experiential agent observatory

Owner: Isaac Daroch. Engineering candidate: `2.0.0-rc.1`, branch `feature/v2-self-model-grafito`. Governing inputs: PROMPT_MAESTRO(1).txt and INSTRUCCION_DE_ARRANQUE(1).txt supplied on 18 October 2026, including all palette, WCAG, test and reference annexes. The main production release is not changed by preparing this candidate.

Start with [baseline](baseline.md), [requirements and traceability](requirements.md), [test report](test-report.md), and [content guide](content-guide.md). D2 remains a historical governing baseline; this directory records explicit new decisions and scope differences, not retrospective acceptance of D2.

## Why this version differs

The scientific centerpiece is no longer world-map correction by BFS. A separate functional self-model module maintains state, retains selected episodes, estimates its own task success, and uses those estimates in a designed decision rule. The current mechanism learns Bayesian success estimates, not a neural policy. Retention is an adaptive heuristic, not a trained memory controller. Outcomes, utility coefficients, priors, action repertoire and constraints are explicit designed assumptions.

The visual direction is the owner's new Grafito editorial contract. It supersedes decorative particles, neon, moving backgrounds and automatic entrances. Interactivity is meaningful: decisions, interventions, memory inspection, controlled comparisons, replay and archives. Accessibility does not require a visitor to enable a special mode; preferences customize already structured pages.

## Candidate, not a conformance certificate

Automated unit, contrast and browser reports are distinct evidence layers. Human assistive-technology, real zoom, content comprehension, translation and device checks are pending unless specifically recorded with an actual environment. No PASS is inferred from a selector, ARIA attribute, screenshot or file's presence. No clinical benefit is claimed for a palette or font.

## Editing and review

From a separate clone or extracted source directory, install the locked dependencies with `npm --prefix site ci`, build using `node tools/build-v2.mjs`, and start a local compiled preview using `node tools/review-server.mjs site/dist 4179`. Each is a separate one-line command. Existing update/restoration scripts belong to the previous release until their source-version integration and owner-machine execution are reviewed; do not run them to replace a working copy for this candidate.

The preview artifact is static HTML plus local assets. Serve it through HTTP, not file://, because root-relative paths and ES modules follow browser origin rules. No external credentials are required to preview. GitHub Actions uses contents:read for candidate builds and has no deployment job. Production publication remains a separately authorized action.
