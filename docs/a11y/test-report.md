# Candidate test report — living evidence record

Version 2.0.0-rc.1. Main production remains the prior release. The final candidate SHA and workflow result must be read from the attached evidence; this file never treats artifact availability as acceptance.

## Executed so far

Baseline: pinned 1.1.0 build passed under run39150733413. New pure source tests: 16 functional self-model cases and seven preference/token cases passed; the root suite contains70 tests (47 historical plus23 new). The 384 canonical token pairs passed. Type checking reached zero errors and warnings after correcting the native preference field types.

The first candidate build did not pass its final combined-output verification. An integration inspection of the exact checkout established canonical portrait path `images/portrait.png`, bibliography `references.bib`, and notebook sources `two-maps`, `demo-protocol`, `reproducibility`, `episode-replay`. Candidate references and the test inventory are being reconciled against that observed source. A failed build is not a successful browser evaluation.

## Evidence layers

1. Unit/domain/architecture: `evidence/v2-unit.log` and the corresponding workflow step.
2. Palette arithmetic: `evidence/contrast-tokens.json`, 24 palettes and384 authorized pairs. Not a rendered-interface certification.
3. Actual compiled-site tests: `evidence/v2-browser.json`, HTML report, screenshots and traces. Tests run only after a successful build; skipped browser jobs are NO_EVALUADO.
4. Manual coverage: NVDA/VoiceOver/TalkBack, voice control, real200%/400% browser zoom, device forced colors, accessible-name quality, alternatives, scientific translation and human understanding remain PENDIENTE_MANUAL.

## Status discipline

PASS means the identified test ran successfully on its recorded SHA/environment. NO_EVALUADO is not a pass. NO_APLICA requires the current component inventory reason; adding a video, PDF or authentication process changes applicability. There is no global accessibility percentage, legal conclusion or blanket WCAG2.2AA claim.

## Review and reproduction

Candidate CI uses locked dependencies and real Quarto/Astro builds in Linux and Windows. Actual browser automation runs Chromium and Firefox on Linux. The source package, static preview and evidence are distinct artifacts. Extract source into a separate folder; run `npm --prefix site ci`, then `node tools/build-v2.mjs`, then `node tools/review-server.mjs site/dist 4179` as individual lines. Do not run old update wrappers over the owner's working copy for this review candidate.
