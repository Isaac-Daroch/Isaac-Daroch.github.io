# Grafito editorial — actual verification report

Review date: **18 October 2026**, Windows desktop. Baseline commit: `addadb814c0c346663a0d7a99933098f6b90e2f5`. Work branch: `fix/grafito-accessibility-complete`. The final source commit is recorded separately by the clean build's `release.json` and delivery `execution.json`; this report does not embed its own circular commit hash.

**Outcome: functional branch prepared for review. Manual accessibility acceptance remains pending. No production deployment was performed.** The initial source failed its real build after rendering due to missing pages and palette CSS. That baseline log is preserved; later failures were used to fix actual Quarto styles, mathematical reflow, transition colors and search behavior.

## Environment actually used

Node 24.19.0, npm 12.2.0, Quarto 1.10.18, Python 3.13, Astro 7.4.0, TypeScript 6.0.3, Playwright 1.64.1 and axe integration 4.14.0. Chromium **156.0.8078.4**; Firefox **157.0**. Headless desktop browser automation, **no assistive technology impersonated**. Screenshots were visually inspected by the implementation agent; this is not a user study or device session.

## Commands executed and results

Commands run from `site` unless otherwise noted. Exit status and complete logs are in the evidence archive/CI artifacts.

| Check | Actual command | Result | Limit |
|---|---|---|---|
| Locked installation | `npm ci` | PASS; 273 packages installed; no vulnerabilities reported by install | Does not replace a security audit |
| Source syntax | `npm run check-js` | PASS; recursively checks source, public runtime, tools and tests | Syntax only |
| Unit/contracts/architecture behavior | `npm test` | PASS; 78 tests | Simulation correctness is not scientific generalization |
| Architecture boundary | `npm run check:architecture` | PASS; no boundary violations | Existing lab architecture scope |
| Astro/types | `npm run check` | PASS; 0 errors, 0 warnings, 0 hints after excluding generated Playwright reports | No AT evidence |
| Real integrated build | `npm run build` | PASS; 19 Astro outputs including 404, 5 Quarto pages, generated CSS and bibliography; final verifier reports zero missing internal resources | External destinations not continuously monitored |
| CSS/source consistency | `npm run check:palettes` | PASS; 24 generated combinations match source | No clinical color-perception claim |
| Opaque token pairs | `npm run check:contrast` | PASS; 24 palettes, 384 authorized pairs, 0 failures | Not a rendered-site audit |
| Negative contrast CLI | `python -m unittest discover -s pruebas -p 'test_*.py' -v` from repo root | PASS; 3 tests, including invisible text→exit 1 and missing palette→exit 2 | Isolated temporary fixtures |
| D2 documentation validator tests | `python -m unittest discover -s tests/governance -p 'test*.py' -v` from repo root | PASS; 18 tests | Documentation governance only |
| Compiled-site browser suite | `npm run test:e2e` | PASS; 61 executions, 0 unexpected failures, 0 skipped | 54 Chromium + 7 Firefox core tests; not Safari/mobile/AT |

## Browser evidence and its scope

* 23 actual content routes checked for HTTP success, one main/h1, title, expected language and unique IDs/ARIA relationships. Real 404 recovery checked separately.
* Axe ran on all 23 routes in base light and dark: **46 scans with no confirmed violations**. The project expands the actual laboratory comparison before scanning. Nothing is excluded from axe to improve the score.
* All **24 palettes** were applied on preferences, bibliography/citation, the real laboratory with its comparison table, and Quarto code: **96 rendered route/palette evaluations**. Generated token values and computed visible text/background pairs are checked separately. Text minimum is 4.5, or 7 in high appearance. JSON ratios do not stand in for rendered states.
* Hover/focus ring, disabled/enhanced controls, expanded citation, comparison results and selectable code are represented. Full human evaluation of focus obstruction, pseudo-elements, selection, chart meaning and perception remains pending.
* Width samples: **320, 375, 768, 1280, 1920 CSS px**. Combined dark + mono + site text 200% + reading + system font + increased letter/word/line/paragraph spacing checked at 320. No whole-page horizontal overflow in sampled routes. Long mathematical expressions use a named keyboard-accessible local scroll region.
* Native menu and Escape return; skip-link focus; explicit/system preference precedence; real tab synchronization and removal; route/language persistence; corrupt JSON; storage denial and quota fallback; legacy migration; isolated reset preserving foreign data; forced-colors emulation.
* JavaScript-disabled content/navigation, and independently blocked preference module; notebook full-text search, no results, clear, history, index failure/retry; copy success/refusal with faithful selectable source; retained laboratory intervention/replay/rejection/separate comparisons and pause out of view.
* Firefox covers the explicitly marked route/semantic, keyboard, preference precedence/persistence/denial, no-JS and search core. It does not duplicate the entire Chromium palette/axe matrix.

## Visual and performance review

Agent-inspected captures: home at 1440×1000 and 375×900; Spanish preferences at 768 px; Quarto mathematical note at 1280 px. Captures are in `evidence/a11y/`. They show layout only; keyboard claims rely on the browser interaction checks above.

Home made no unsolicited third-party requests and did not load Three.js/GSAP. Actual requested final files total **350,637 bytes**, including the portrait. Offline gzip estimate: **296,457 bytes**; initial own JavaScript gzip estimate: **10,792 bytes**. Method: resource URLs requested by home mapped to dist bytes and `gzipSync`; the local static server itself does not compress. These are development measurements against the proposed 1 MiB/120 KiB budgets, not CDN-transfer or hardware measurements. Resource and environment JSON retains individual files and observed browser entry sizes.

## Corrections verified after observed failures

1. Missing palette output and dangling navigation: generation added to dev/build; real sections and bilingual map entry added.
2. Old custom-menu listener conflicted with native disclosure: replaced by one shared Escape behavior with no hidden-state override.
3. Quarto's Bootstrap active blue, gray summary and translucent inline-code background: replaced with shared tested token consumers. Syntax is readable in every profile.
4. Bootstrap link transitions created intermediate, failing colors during theme application: transitions removed from affected notebook navigation, consistent with the no-theme-animation requirement.
5. MathML expanded the page at narrow widths: local scroll wrapper, textual variables, selectable LaTeX and body-positioned contents list.
6. Citation download lacked copy fallback; Quarto copy refusal was silent: selectable source, visible button name and explicit status without focus changes.
7. Notebook full-text access is preserved with a native nonmodal form over Quarto's real generated index; generated root includes use a narrow, tested integration adapter.

Initial browser failure logs and JSON are retained alongside the final clean execution. They are not counted as passing evidence. The earlier type scan accidentally included generated Playwright JavaScript and produced informational hints; `tsconfig` now excludes only generated reports/results, with source checks unchanged.

## Editorial evidence

The existing article metadata and Published–August 2026 status were checked against the [UNAB institutional record](https://researchers.unab.cl/en/publications/a-governed-nl-to-sql-architecture-for-reliable-clinical-data-quer/). This is source verification of the bibliography, not independent experimental replication. Public clinical study code, a local PDF and audiovisual demonstration are not confirmed. Research descriptions and new editorial paraphrases require owner review. No extra achievements, events, news, affiliations, media or social destinations were invented.

## Outstanding manual acceptance

`acceptance-cases.md` records all 42 cases. `wcag-matrix.md` retains all 55 A/AA criteria, conditional applicability and pending human acceptance. In particular:

* NVDA + Chrome/Firefox, VoiceOver + Safari/iOS, TalkBack + Android; actual mathematical navigation, figure/table/citation meaning and duplicate announcements.
* Real browser zoom 200/400%, browser text-only enlargement, operating-system contrast themes, actual voice activation, physical touch/orientation/cancellation and representative users.
* Complete human comparison of every pertinent state in every component; new scientific summaries, biographical wording, Spanish labels and future translations.
* Captions/transcripts/audiodescription and owned PDF auditing are not claimed: no such owned content exists in this inspected scope. Future publication requires source files, alternatives and human review.
* Both local and tab storage denied: current-document settings work, but a full navigation cannot preserve them without another persistence mechanism. This limitation is disclosed publicly. The initial ES module can briefly apply saved preferences after system CSS has painted under a delayed load; no blocking screen or CSP relaxation was added.

The objective remains **WCAG 2.2 A/AA**. Zero automated findings do not establish complete conformance. Primary guidance: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing), [Quarto HTML documentation](https://quarto.org/docs/output-formats/html-basics.html).
