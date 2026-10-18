# Grafito palette contract

Source: `tokens/paletas-grafito.json`, unchanged from inspected commit and checked against all 24 tables in the supplied Annex A. `node tools/generate-grafito.mjs` generates `site/public/assets/paletas.css`; it is ignored as a derived artifact and rebuilt in both dev and build. `--check` rejects absence/drift. No `system` palette exists: 3 appearances × 4 profiles × 2 themes. `system` resolves before application.

Allowed text pairs: text/muted/primary/accent/hover over bg and surface, and on-primary over primary and hover. Border is decorative; control supplies functional boundaries. Focus uses a 3px ring, 4px offset against actual bg/surface; filled buttons retain separation. Selection uses primary/on-primary. Text thresholds are 4.5, or 7 for high; necessary control/focus pairs require 3. The test uses unrounded ratios. No arbitrary accent-button pair was added.

Rendered checks compose actual ancestor backgrounds for visible text; Bootstrap translucent inline-code backgrounds, active TOC blue, gray summary and syntax overrides were corrected after observed failures. All text remains opaque, including disabled explanations. Hover, focus, expanded publication citation, laboratory comparison table and code are represented. Selection/pseudo-elements, all physical focus obstructions and individual perception still need human inspection.

Forced colors use system colors and preserve the saved selection. No global image filters or forced-color-adjust override. No claims of treatment, diagnosis or universal perception. Tests do not certify clinical comfort. Quantitative scientific figures need their own redundant encodings and source data.
