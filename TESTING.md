# Verification scope — integrated 1.1.0

A passing source/test command is not automatically a product acceptance certificate. The governing acceptance IDs remain in D2. Results are attached to the exact GitHub Actions source commit and uploaded under `verification-*`.

## Executable scopes

1. Recursive JavaScript syntax check: `tools/check-js.mjs`.
2. Domain, contracts and semantic regression: `tests/agent-lab.test.mjs` and `tests/motion.test.mjs`.
3. Architecture AST/import rules plus deliberate negative fixtures: `tests/architecture.test.mjs`.
4. Output-integrity/allowlist/recoverable-promotion tests: `tests/build-contract.test.mjs` and Quarto link tests.
5. Source-package preflight and restoration with injected failures: `tests/project-transaction.test.mjs`; executed on real Windows and Linux runners, using temporary fake repositories with Git sentinels, not the user's files.
6. Actual Quarto render, Astro compilation, route/resource/metadata and manifest verification.
7. Playwright Chromium against actual `site/dist`, not a reconstructed DOM: principal routes, responsive sizes, no-JS, movement/storage policy, native download and replay, comparisons, navigation, pause, print, axe and optional 3D.
8. Windows PowerShell 5.1 parsing of launch/update/recovery wrappers.
9. Documentation verifier tests and generation, separately identified.

## Known limits

Axe is automated checking, not complete WCAG conformance. A software-rendered CI WebGL context is not the user's GPU. Human screen-reader comprehension tasks, physical printer output, user-machine performance and field LCP/INP/CLS remain separately measured work. Restore tests exercise controlled interruption points, not every filesystem/power-loss condition. Runtime publication is accepted only after live identity and route checks.

## Historical comparison

The first integrated domain run found 44 distinct observed cells, while D1 reported 43 for an old source fixture. This is retained in `SOURCE_RECONCILIATION.md` with the failed run ID, separate scenario identity and an independent union-of-observations oracle. Historical reports are not overwritten or relabeled as new test executions.


## Grafito integration acceptance (18 October 2026)

The current execution entrypoint is `site/npm run test:all`. For browser binaries use
`npx playwright install chromium firefox` from `site`. The current suite covers
all 23 named routes, 24 palette combinations across four representative rendered
routes, every real template in base light/dark with axe, 320/375/768/1280/1920 CSS
widths, combined text/spacing/reading, native menu/skip, preferences/tab/denial/quota,
notebook search/history/error, clipboard refusal/success and retained lab regression.
The Firefox project runs the explicitly marked cross-browser core subset.

See `docs/a11y/test-report.md`, `acceptance-cases.md` and `wcag-matrix.md` for actual
results and manual gaps. Full original 42 procedures live in
`pruebas/PLAN_DE_PRUEBAS.md`. The pre-Grafito browser suite is archived under
`tests/legacy`; assertions requiring old cinematic controls are superseded by the
current conservative-motion specification. Meaningful laboratory and artifact
checks are preserved in the current suite. No automatic result certifies WCAG AA.

`npm run check:contrast` checks the 384 authorized opaque pairs.
`npm run check:palettes` checks generated CSS against JSON after build.
The exact palette values are also compared to the attached Annex A in unit tests.
Native MathML requires a separate real-screen-reader review; a narrow browser
viewport and site-scale 2 do not replace real browser zoom.
