# Canonical Grafito palettes

VIS-01–08, PREF-03, QA-01–02. Source: owner master Annex A. `tokens/paletas-grafito.json` holds exactly 24 indivisible combinations, each with eleven token values. The ordered token array is explicit; no component contains its own palette table. `tools/generate-visual.mjs` generates `site/public/ui/tokens.css` and copies the shared editorial stylesheet. Generated files must not be edited by hand.

Key: `appearance|colorProfile|theme`. Effective appearances: editorial/high/soft; profiles: editorial/redgreen/tritan/mono; themes: light/dark. The preference value system is resolved before palette selection and is not a 25th palette. Public names are Graphite and gold, Blue–amber, Cyan–raspberry and Monochrome, not diagnoses.

## Authorized pairs

text, muted, primary, accent and hover on bg and surface; on-primary on primary and hover; control and focus against bg and surface. These are 16 pairs per combination, 384 total. Informative text threshold is 4.5:1, or 7:1 in high appearance. Necessary boundaries/focus threshold is 3:1. `border` is decorative; fields and actions use `control`. No on-primary/accent pair is assumed valid. Ratios are calculated without threshold-rounding by `tools/verify-contrast.mjs`.

The browser suite opens a noindex component fixture for every palette, changes native preferences, checks computed backgrounds/text and filled-button default/hover/focus, and records axe findings. Token arithmetic and rendered tests remain different evidence. Full semantic image comprehension and individual comfort require human evaluation.

## Forced colors, code, figures, print

OS forced colors have final visual precedence. Native colors Canvas/CanvasText/LinkText/ButtonFace/ButtonText/Highlight are used, never global forced-color-adjust:none. Photographs are not inverted or grayscaled. Agent decisions use text and numeric tables rather than colored states. Code is rendered in high-contrast monochrome syntax, preserving literal text. Print supplies white/black surfaces rather than inheriting dark cards.

The UI has no autoplay animation, neon, moving background, cursor replacement, gradient under text or opacity-reduced metadata. Soft appearance is a display choice, not treatment for a condition. The generated CSS contains no promise of global WCAG or clinical conformance.
