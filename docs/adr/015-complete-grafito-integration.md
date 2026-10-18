# ADR-015 — Complete the interrupted Astro–Quarto integration

Date: 18 October 2026. Status: implemented for branch review; manual validation pending. Drivers: GOV-04/05, COMP-01/03/06, PREF-04/05, TECH-02, ARCH-01/02/03, QA and OUT. Baseline: final build failed due to missing linked pages/CSS; Quarto retained independent theme and controls.

| Decision | Alternative considered | Benefit | Cost / risk | Reversal / evidence |
|---|---|---|---|---|
| Native details/selects and full preferences page | Custom menu/modal/overlay | No focus trap, JS-free nav, inspectable semantics | Summary/browser behavior needs AT review | Reversible template choice; keyboard/no-JS tests |
| JSON-generated palettes in dev/build | Hand-edited component palettes | 24 exact combinations, repeatable CSS | Generator must precede both renderers | Generator --check, exact Annex A and 384-pair tests |
| Local → tab → memory preference fallback | Account/cloud persistence | No account or preference transmission | Total denial cannot persist after document replacement | Disclosed limitation, denial/quota/migration tests |
| Media under explicit action when confirmed | Automatic social/video embeds | Saves data and supports local alternatives | Cannot fabricate absent material; editorial work required | Empty archives, structural publication gates |
| HTML explanation/MathML plus real downloads | PDF-only access | Content inspectable without external application | Native math needs real AT verification | HTML/semantic tests; pending human math/PDF review |
| Preserve Astro/Quarto and normalize allowlisted shared includes | Framework migration/manual dist edits | Existing sources, routes and reproducibility retained | Quarto rewrites root-relative URLs; adapter must stay narrow | Source includes canonical root, staging adapter normalizes exact allowed assets; idempotence tests |
| Nonmodal native search over existing Quarto index | Retain stock popup | Visible names, keyboard/error fallback, no trap/global shortcuts | Own small adapter and history tests | Existing index preserved; source/list remain without JS |

The stock notebook dark Sass colors are replaced by shared token consumers. Its Bootstrap layout and bibliography renderer remain, with the native HTML header include matching portfolio primary labels. No manual patch to dist is required: the build's versioned integration adapter handles cross-project links/resources. No production deployment or framework migration accompanies this decision.
