# Integrated application status — D2 / source 1.1.0

The complete application is now present in this source tree: Astro pages and animation, Quarto notebook, encapsulated agent domain, browser/headless adapters, source-package update and recovery tools, tests and governing documentation. This replaces the earlier checkpoint statement that the runtime was absent.

## Executed product evidence

The first complete verification, source `3f50f63ea264f9763cfc1f2e0684d5f438aef20d`, is recorded in GitHub Actions run **39120105741**:

- Both Ubuntu 24.04 and Windows Server 2022 product jobs completed successfully.
- JavaScript syntax, domain/contracts, architectural dependency rules and restoration fault tests ran on both systems.
- Actual Quarto 1.10.18 rendering and Astro 7.4.0 compilation completed; the combined static artifact passed its required-route, metadata and integrity checks.
- The Ubuntu run reported **47 unit/contract tests**, **21 compiled-site Chromium tests**, and zero errors/warnings in Astro checking.
- Browser tests include native episode download/replay, separate policy comparisons, no-JavaScript behavior, reduced motion/storage errors, responsive layouts, active mobile navigation, print, automated axe scans and optional 3D/fallback behavior.
- Windows PowerShell 5.1 parsed all three entry scripts. The transaction tests used temporary repositories on a real Windows runner, preserving Git sentinels and restoring local changes after injected failures.
- The **18 D2 documentation-validator tests** ran separately. These are not additional product acceptance tests.

Subsequent source commits must run the same pipeline again. Use their own workflow reports, not this historical successful count, as release evidence.

## Scope and remaining human evaluation

This source is an explicit D2-governed reconstruction, not a byte-identical recovery of the earlier uncommitted archive. See `docs/integration/SOURCE_RECONCILIATION.md`, including the observed-cell fixture difference. The original audit and D2 registry remain historical records; their unresolved acceptance fields are not overwritten automatically.

Manual screen-reader comprehension, performance on Isaac's specific computers, field Core Web Vitals, physical power-loss conditions and broader licensing choices remain separate evaluations. Automated verification does not certify all WCAG requirements or scientific generalization.

## Publication

Source integration and public deployment are distinct. `publish-pages.yml` accepts an explicit workflow dispatch or an owner-only `/publish <main-commit>` command in a repository PR conversation. It verifies that the requested commit is the current main commit and has a successful complete product run, retrieves that run's already-tested artifact, checks its manifest and publishes it. A post-deploy check validates route status and release identity.

If Pages is not enabled in repository settings, the workflow stops with a configuration error rather than claiming a live release. No source update installs files on the owner's PC remotely.
