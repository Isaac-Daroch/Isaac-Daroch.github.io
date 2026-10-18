#42 acceptance procedures — plan, not results

Record actual source commit, date, route, steps, expected/observed results, OS/browser/AT version, palette, viewport, real zoom, and evidence. Use isolated profiles. No OS changes to the owner computer without authorization.

## T01. Inventory and reference build

**Procedure:** Record checkout, tracked changes, package/lock versions, instructions and source routes. Execute the existing build unchanged before feature work.

**Expected:** Retain exact SHA, command logs, errors and a source/runtime/pending inventory; no inference from screenshots.

**Source:** Owner master Annex C, T01. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T02. Structure names and reading order

**Procedure:** On each editorial and notebook template, traverse headings/regions with a real screen reader; compare DOM and visual order, names, image alternatives and titles.

**Expected:** One identifiable main; meaningful names, relations and sequence; no icon-only essential action.

**Source:** Owner master Annex C, T02. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T03. Global keyboard-only journey

**Procedure:** From a fresh page use only Tab, Shift+Tab, Enter, Space and local Escape to read research, follow article/code links, copy a citation and return. Repeat enlarged/narrow.

**Expected:** No trap, unexpected navigation or hidden focus. Record the actual focus sequence.

**Source:** Owner master Annex C, T03. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T04. Mobile menu and consistent navigation

**Procedure:** Open and close the navigation disclosure with keyboard and touch; visit another language/template; repeat with enlarged text and little viewport height.

**Expected:** Closed links are out of focus order. The nonmodal disclosure does not trap or claim modality.

**Source:** Owner master Annex C, T04. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T05. Skip to main content

**Procedure:** Activate Skip to main content as the first useful keyboard link; continue reading and tabbing in the destination on both generators.

**Expected:** Visible skip link moves focus/reading to main, not merely visual scroll; no covered destination.

**Source:** Owner master Annex C, T05. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T06. Preferences page or dialog

**Procedure:** Open the full preference page through its visible link and use all groups, reset and return navigation. A modal is not present.

**Expected:** No focus trap; names and groups are clear. If a future modal is added, separately test initial focus, inert background, Escape and focus return.

**Source:** Owner master Annex C, T06. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T07. Input error and recovery

**Procedure:** Submit out-of-range seed/energy, unsupported or corrupted episode file, and a recoverable clipboard failure; inspect persistent labels and corrective messages.

**Expected:** No active session is replaced after failed import; entered data remains; errors are textual and connected to the relevant input. No fake contact success.

**Source:** Owner master Annex C, T07. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T08. Search filters results and history

**Procedure:** Search by text and filters, obtain zero results, clear and use browser Back/Forward; repeat with a real screen reader.

**Expected:** Focus remains on the initiating control; concise result count; URL keeps search state but no visual preferences. Base list remains without script.

**Source:** Owner master Annex C, T08. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T09. Rendered palettes and contrast

**Procedure:** Run all384 token checks; in /components/ choose each of24 palettes, exercise default/hover/focus/selected/expanded/invalid/disabled states and examine computed colors.

**Expected:** Informative text≥4.5 or≥7 in high contrast; functional boundaries≥3 on actual backgrounds. Token results remain separate from rendered evidence.

**Source:** Owner master Annex C, T09. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T10. Meaning without color discrimination

**Procedure:** Use monochrome and supplementary color-deficiency simulation; identify statuses, links, selected controls, errors and data without hue.

**Expected:** Meaning survives through words, borders, shape or associated values; scientific images are not globally filtered. Human discrimination is not inferred.

**Source:** Owner master Annex C, T10. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T11. High contrast

**Procedure:** Select high appearance for four profiles and two themes; inspect metadata, code, controls, errors and all informative text.

**Expected:** Informative text on actual surfaces≥7:1; profile and theme remain independent. This does not assert global AAA.

**Source:** Owner master Annex C, T11. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T12. System forced colors

**Procedure:** Use both browser emulation and actual Windows forced-color settings in a test profile, operate controls and then restore OS settings.

**Expected:** Focus, boundaries and selected states remain recognizable; OS colors prevail without global forced-color-adjust:none. Emulation is not an OS task.

**Source:** Owner master Annex C, T12. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T13. System and local motion preference

**Procedure:** Change system theme/contrast/motion where supported; select explicit site settings; change OS again.

**Expected:** Explicit choices are respected except that OS reduced motion always wins; no animated theme change or automatic media.

**Source:** Owner master Annex C, T13. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T14. Independent visual preferences

**Procedure:** Change each preference separately and in combinations, keeping focus on the activated control.

**Expected:** No unrelated setting is reset; no reload, scroll-to-top or unexpected context switch.

**Source:** Owner master Annex C, T14. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T15. Persistence across routes and generators

**Procedure:** Set dark/profile/reading, navigate across Astro, Quarto, Spanish and English, then Back/Forward and a second tab.

**Expected:** Valid stored preferences survive same-origin navigation. Unsupplied translations are honestly identified.

**Source:** Owner master Annex C, T15. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T16. Corrupt or denied storage

**Procedure:** Deny storage reads/writes, fill storage, insert invalid JSON/unknown values/old supported key and reload in isolated profiles.

**Expected:** Safe defaults and validated migration; changes apply in memory; saved is not announced after write failure. Cross-document denial limitations are disclosed.

**Source:** Owner master Annex C, T16. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T17. Reset and cross-tab preference changes

**Procedure:** Set preferences, add an unrelated fixture storage key, reset while focused and synchronize another tab.

**Expected:** Only owned keys removed; defaults restored; focus retained; one truthful confirmation and unrelated key preserved.

**Source:** Owner master Annex C, T17. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T18. Prerecorded video captions and controls

**Procedure:** When a real synchronized video is added, check reviewed captions, language/names/formulas, all playback controls and entering/leaving iframe by keyboard.

**Expected:** Accurate synchronized captions, accessible operation and no autoplay; current absence of video is inventoried, not a fabricated test.

**Source:** Owner master Annex C, T18. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T19. Essential visual audio description

**Procedure:** For each supplied video compare essential visible information with the spoken narration; examine a described version where needed.

**Expected:** Visual information is audibly available for1.2.5. Transcript alone is not a substitute for required audio description.

**Source:** Owner master Annex C, T19. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T20. Audio-only and silent video alternatives

**Procedure:** For audio-only or silent-video records compare the complete source with its faithful structured alternative.

**Expected:** Speakers and meaningful sounds/actions are preserved, not a generic summary. Conditional until such records exist.

**Source:** Owner master Annex C, T20. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T21. Live synchronized media

**Procedure:** If live media is introduced, rehearse with the actual captioning service and check keyboard/player/latency under representative conditions.

**Expected:** Live captions actually exist; no claim based on a future plan.

**Source:** Owner master Annex C, T21. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T22. Pause stop hide moving content

**Procedure:** Observe all pages without interaction, then operate explicit simulation steps and any future animated media; try pause/stop where relevant.

**Expected:** No uncontrolled moving/updating content; informative simulation updates occur only when requested.

**Source:** Owner master Annex C, T22. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T23. Flashing content

**Procedure:** Inspect all generated motion and each future media asset for flashes; use appropriate analysis where relevant.

**Expected:** No hazardous decorative flashes; warnings alone do not repair a failing asset. No clinical guarantee is inferred.

**Source:** Owner master Annex C, T23. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T24. Text and real zoom enlargement

**Procedure:** On a real browser use200% text enlargement and200%/400% browser zoom, recording actual settings and task completion.

**Expected:** No loss of content or operation. CSS viewport emulation does not close real zoom acceptance.

**Source:** Owner master Annex C, T24. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T25. Reflow at narrow CSS width and real zoom

**Procedure:** Use320CSSpx width and separately1280window with actual400% zoom; test long labels, DOI and notebook content.

**Expected:** No page-level horizontal scrolling; essential2D tables use labeled keyboard-operable local scroll.

**Source:** Owner master Annex C, T25. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T26. User text spacing

**Procedure:** Apply line-height1.5, paragraph margin2em, letter-spacing.12em and word-spacing.16em together, including long controls.

**Expected:** No truncation, overlap or loss; fixed-height components do not hide text.

**Source:** Owner master Annex C, T26. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T27. Reading mode

**Procedure:** Toggle reading mode in a long article and the experiment, enter/exit using native controls and repeat at enlarged text.

**Expected:** Single-column reading preserves sources, limitations, equations, tables and essential navigation; no duplicate content IDs.

**Source:** Owner master Annex C, T27. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T28. Languages and equivalent routes

**Procedure:** Navigate English/Spanish equivalents and English-only notebook notices; read controls, validation and status messages in their actual language.

**Expected:** html lang and substantial fragments accurate; no flag-only or falsely translated page; scientific translation reviewed separately.

**Source:** Owner master Annex C, T28. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T29. Images figures and data alternatives

**Procedure:** Compare every informative image, SVG, scientific diagram and future data plot with its concise alt and structured explanation.

**Expected:** Faithful relationships, units, data/uncertainty and purpose; no invented exact values; decorative images properly ignored.

**Source:** Owner master Annex C, T29. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T30. Scientific tables

**Procedure:** Use a real screen reader to navigate table headers/cells at desktop and narrow widths; operate any sorting.

**Expected:** Captions and associated headers persist; local scrolling does not destroy semantic relations.

**Source:** Owner master Annex C, T30. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T31. Structured mathematics

**Procedure:** Read and explore notebook MathML using real target AT/browser, compare variables and source LaTeX, inspect for duplicated speech.

**Expected:** One usable mathematical representation and explanatory variables. MathML presence alone does not prove speech navigation.

**Source:** Owner master Annex C, T31. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T32. PDF and download alternatives

**Procedure:** Inventory each actual downloadable document; examine source, selectable text, tags, language, order, headings, tables and alternatives.

**Expected:** HTML equivalent where appropriate; no inference that export/scan/OCR equals accessible PDF. No fictitious CV file.

**Source:** Owner master Annex C, T32. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T33. No-JavaScript and blocked resources

**Procedure:** Disable JavaScript, block relevant external resources and simulate module/iframe failure on editorial and notebook paths.

**Expected:** Essential content/routes stay usable; inactive experiment is explained with disabled controls; no blank page or fake success.

**Source:** Owner master Annex C, T33. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T34. Reduced data and loading

**Procedure:** Enable low data, inspect network requests, delay external services and compare initial versus explicitly requested resources.

**Expected:** No automatic media/feed payload; core route works on low data; measured bytes distinguished from proposed budgets.

**Source:** Owner master Annex C, T34. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T35. Pointer alternatives to dragging

**Procedure:** Inventory drag/multipoint interactions; for any future one perform the same task with keyboard AND pointer without dragging.

**Expected:** Both alternatives available where needed. No current drag control is invented merely to test this case.

**Source:** Owner master Annex C, T35. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T36. Touch orientation and target sizes

**Procedure:** Use actual touch/landscape, cancellation and keyboard concurrently; measure principal control hit regions at small base fonts.

**Expected:** At least44×44CSSpx for project controls; no forced device motion or hidden keyboard support.

**Source:** Owner master Annex C, T36. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T37. Voice operation and clear instructions

**Procedure:** Use real voice-control software to activate visible labels and complete research/contact/experiment actions; ask a reader to follow instructions.

**Expected:** Visible names match accessible names; instructions do not require remembering icon/color metaphors; no microphone-only path.

**Source:** Owner master Annex C, T37. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T38. Tooltip hover/focus behavior

**Procedure:** Inventory tooltips or hover/focus overlays; if present test dismissible, hoverable and persistent behavior without moving focus unnecessarily.

**Expected:** Essential help is always available. Native click disclosure is not misrepresented as a tooltip.

**Source:** Owner master Annex C, T38. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T39. Copy citations code and clipboard failure

**Procedure:** Copy citation/code/email normally and with denied clipboard API; compare exact selected text and focus.

**Expected:** Accurate text, no hidden prompts or line numbers, one status and a selectable fallback on failure.

**Source:** Owner master Annex C, T39. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T40. Authentication and consequential processes

**Procedure:** Inventory authentication, CAPTCHA, personal data and consequential/multistep submissions; test applicable recovery/review/redundant-entry conditions.

**Expected:** Current static site has none of these processes; future additions must update scope, not inherit N/A.

**Source:** Owner master Annex C, T40. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T41. Help consistency and timing

**Procedure:** Find help/contact from each template and inspect time limits; complete a task without time pressure.

**Expected:** Consistent help placement, preserved state and no invented response deadline or support SLA.

**Source:** Owner master Annex C, T41. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.

## T42. End-to-end research to article code explanation contact

**Procedure:** Complete research→plain/technical explanation→publication→genuine code when supplied→text-backed demonstration→contact, using multiple paths and target AT.

**Expected:** End-to-end useful journey with factual empty states and external limitations. Do not claim code/video exists where the source does not supply it.

**Source:** Owner master Annex C, T42. **Manual state:** PENDIENTE_MANUAL until performed, or justified NO_APLICA. Automation is a separately scoped subset.
