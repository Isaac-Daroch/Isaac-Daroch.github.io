# Observed baseline and correction scope — 18 October 2026

Inspected clean source: `addadb814c0c346663a0d7a99933098f6b90e2f5`, branch `main`. Work branch: `fix/grafito-accessibility-complete`. Repository cloned directly from the owner-supplied URL. No pending changes existed in this clone; no AGENTS.md was found in its tree or workspace ancestors. The former baseline remains recoverable in Git; it described an earlier, incomplete revision and remote execution rather than the current Windows evidence.

The supplied TXT documents are implementation references under the human request to correct the application. They do not authorize production publication, delete operations or unrelated scope. Their exact bytes and SHA-256 are preserved in `source-specification.txt`, `source-startup.txt` and `source-provenance.json`. Annex E describes preparation of those documents, not current site tests.

## Observed in source

| Area | Initial state and consequence |
|---|---|
| Generators | Static Astro 7.4.0 and Quarto; locked npm dependencies; no framework migration |
| Local tools used | Node 24.19.0, npm 12.2.0, Quarto 1.10.18, Python 3.13; Windows |
| Pages | Eleven Astro sources including 404 and Spanish accessibility; five Quarto notes. Header linked missing investigation, observatory, site map, events, news, contact and Spanish sections |
| Shared templates | `BaseLayout.astro`, shared preference form, legacy home/research/publication/project/contact components |
| CSS | Generated palette file referenced but generation absent from build/dev. Astro editorial CSS already existed. Quarto used independent darkly/SCSS colors and did not load shared preferences |
| Navigation | Native details menu, main nav and footer. Obsolete runtime expected a different custom menu contract; no site-map page existed |
| Search | Quarto full-text search index and popup UI existed. Correction retains index generation and replaces popup access with a native, nonmodal search form on notebook home; base note links remain without JavaScript |
| Forms | Preferences selects/check box; local JSON episode import and replay slider. No message backend or personal-data form |
| Dialogs | No owned modal required. Native disclosure is used for preferences/citations and notebook details |
| Scientific content | Structured MathML, bibliography and selectable code in notes; laboratory world/model figures, metrics, transcript and generated comparison tables |
| Owned media/documents | Portrait PNG and SVG assets; no owned audio, recorded video, live stream, gallery/map, PDF or downloadable CV source in the inspected tree |
| Data | One publication record, initially `source-recorded` with null verification date. Existing domain and tests for a separate self-model simulation, but no linked page |
| External code | Local bundled Astro scripts, Quarto Bootstrap/Tippy/Clipboard and search dependencies; no required third-party analytics or embeds. Old GSAP/Three sources are preserved but not loaded by default |
| Persistence | v2 local preferences module exists; early migration lost the in-memory migration when persistence failed; obsolete menu listener mismatched template |
| Language | English primary routes; Spanish preferences only. Other Spanish links had no targets |
| Deployment | Explicit, approval-gated Pages workflow. Build and PR do not deploy. No service worker, accounts, CMS, database or persistent server introduced |

## Observed in execution before changes

`npm ci`: locked install succeeded, 273 packages installed and no reported vulnerabilities. `npm run check`: zero errors/warnings/hints. `npm test`: 72 passed. Actual `npm run build` rendered Quarto/Astro, then **FAILED** final resource verification: palette CSS and header-linked routes were missing. Logs: evidence bundle `baseline-build.log`, `baseline-check.log`, `baseline-tests.log`. Type checks and unit success did not imply a working website.

## Corrections and execution evidence

See `requirements.md` for every requirement, `acceptance-cases.md` for all 42 cases, `wcag-matrix.md` for 55 criteria and `test-report.md` for actual executions. CI and local results apply to their tested tree; no older report is reused as a new PASS.

## Still requiring human or external evidence

Real browser zoom 200/400%, NVDA, VoiceOver, TalkBack, voice activation, Windows system forced colors, user comprehension, scientific translation and the meaning of alternatives. Device-level validation is not inferred from desktop automation. Publisher pages are externally controlled. No claim is made that absent video or a nonpublic clinical repository has been supplied.


## Inventario adicional 1.3 · 18 octubre 2026

La ruta de biblioteca se añade en los cuatro idiomas: seis trabajos externos y tres vídeos enlazados a páginas originales de proyecto. El reproductor de terceros se crea solo tras una pulsación. Las notas escritas traducidas no son transcripciones completas; la revisión de subtítulos, narración, audiodescripción y reproducción real queda pendiente. El archivo de vídeos propios permanece apagado.

Tres ilustraciones conceptuales se conservan como PNG y se distribuyen como WebP responsive; no son datos científicos. Animación CSS y avance temporizado voluntario del observatorio se detienen mediante la preferencia visible de movimiento y concentración. La vista técnica añade activaciones, pesos, sesgos, superficie bidimensional, pérdida de entrenamiento, historial y dos continuaciones contrafactuales; figuras calculadas en SVG, controles nativos y tablas de valores. Las tres asignaturas confirmadas cuentan con ejemplos sintéticos.
