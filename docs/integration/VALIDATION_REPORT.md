# Product verification report — first integrated baseline

Date: 2026-10-18. Source: `3f50f63ea264f9763cfc1f2e0684d5f438aef20d`. Run: https://github.com/Isaac-Daroch/Isaac-Daroch.github.io/actions/runs/39120105741

## Results inspected

Both product jobs completed successfully: Ubuntu 24.04 and Windows Server 2022. The Ubuntu log records 47 unit/contract tests, 21 browser tests against the actual compiled website, 21 JavaScript modules passing syntax, 7 laboratory modules satisfying the architecture check, and an Astro check with zero errors, warnings and hints. The D2 validator's 18 tests are a separate documentary scope.

Quarto rendered five scientific documents. The notebook wrapper verified 32 generated files. Astro emitted 10 pages. The combined output verifier checked 72 published files and 20 required paths with zero missing local resources. Windows also completed the actual two-generator build and parsed the entry scripts with Windows PowerShell 5.1.

## What the browser result covers

Principal routes, real 404 behavior, six responsive widths, motion and storage failure, no-JavaScript degradation, active mobile navigation, native download and local replay, tamper rejection, two separately identified experiments, off-screen pause, print output and three automated axe scans. The optional 3D test accepts successful initialization **or** a safe fallback; it is not proof of performance on a physical user GPU.

## Scope limits

No manual assistive-technology comprehension study, field performance dataset or verification on the owner's individual Windows installation was performed. Recovery tests inject specified faults in temporary repositories; they do not simulate every power-loss/filesystem condition. No percentages from the domain tests are presented as full-application coverage.

## Reproduction and reports

Run `.github/workflows/integrated-site.yml` or the README commands. Verification artifacts include logs, screenshots, print PDF, Playwright/axe outputs, dependency-license inventory and a manifested source package. A new commit obtains a new run; this report remains attached to the source above. Publication must additionally check the live content digest.
