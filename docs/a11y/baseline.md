# Baseline before Grafito / self-model v2

Date: 2026-10-18. Inspected source: `8cb293d4872780bec826221497f2865951c0eeaf` (release 1.1.0). Work branch: `feature/v2-self-model-grafito`. Production is not authorized by the supplied startup instruction and will not be changed in this work.

## Observed in source

Astro 7.4.0 static portfolio, Quarto scientific notebook, Node lockfile, GSAP/Three.js progressive enhancements, deterministic grid-world demo, D2 governance registry, explicit artifact publication workflow, transactional update/restoration tooling. No AGENTS.md or CLAUDE.md was found in the tracked baseline. No local working copy on the owner's computer was accessed or changed.

Routes: `/`, `/about/`, `/projects/`, `/publications/`, `/media/`, `/teaching/`, `/privacy/`, `/engineering/`, `/404.html`, `/research/index.html` and four `/research/notes/*.html` pages. Shared layout: `site/src/layouts/BaseLayout.astro`. Editorial CSS: `site/src/styles/global.css`. Notebook CSS: `research/notebook.css`. The only local photo is `site/public/images/isaac-profile.jpg`. Bibliography is generated from `site/src/data/publications.json`.

The initial notebook forces a light theme; the portfolio uses its own dark presentation. Motion policy exists, but there is no common 24-palette preference engine. Current demo represents world-map correction, not experiential self-modeling. Source records include one authored paper and distinct related literature. Media page contains plans, not published videos. No verified local video, audio, PDF, captions, form backend, accounts, authentication, drag interaction, live media, offline worker, analytics, private database or conference journal record was identified. Links to external editorial pages are not certifications of those pages.

## Observed in execution

GitHub Actions run `39150733413`, job `117743665879`, checks out the pinned baseline, installs locked dependencies and executes actual commands. Environment reported Ubuntu 24.04, Node 24.19.0, npm 11.17.0, Quarto 1.10.18. `npm test`: 47/47 pass. `npm run check`: zero errors, zero warnings, one hint (unused Hero variable). `npm run build`: real Quarto output and Astro output, 72 verified published files. Artifact: `v2-baseline-evidence` (12153663339). No baseline screen-reader, voice-control, zoom or device task was performed. Baseline browser functionality must not be inferred from compilation.

## Assumptions and limits

The container runtime in this session did not execute even simple commands; remote GitHub Actions is the controlled test environment. Windows validation, browser checks, palette tests and manual coverage are recorded separately in the candidate test report. The prior release's test evidence does not accept this new version. All 55 WCAG matrix rows start NO_EVALUADO until scoped evidence is attached.
