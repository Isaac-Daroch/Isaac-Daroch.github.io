# Component contracts

## Shared layout and navigation

`BaseLayout.astro` provides one main, a descriptive h1 supplied by the page, a first useful skip link, named main/footer navigation and local equivalent-language links. The native details/summary disclosure is nonmodal; it does not trap focus or make unrelated content inert. Escape closes it and restores focus. Closed links are naturally absent from keyboard navigation. At narrow widths the text disclosure contains all navigation links. The header is not sticky, so it cannot cover anchors at large zoom.

Controls use visible labels included in accessible names, native button/link semantics and min44px interactive dimensions. Positive tabindex, global keyboard interceptors and application/menu roles are not used. Focus uses 3px outline with 4px separation. Page-level main focus is a skip target, not a fake interactive control.

## Preferences and archives

Preferences use grouped native fields on a full page, not a modal. Archives use labeled search/year/topic fields. All records are rendered before JavaScript. Applying filters retains focus and reports only a result count. URL state belongs to search/filter state, never accessibility preferences. Back/forward restores filters. Clear resets filters only. Citation/email copying has a selectable-text fallback and a local status region.

## Laboratory

Before initialization, controls are disabled and scientific context remains present. The visitor explicitly requests a step or a bounded batch; no autoplay or time pressure. Tables provide captions, column headings and scoped row headings where useful. Wide tables scroll in named, keyboard-focusable local regions, never by clipping the whole page. Live status is one small region and does not read every state table repeatedly. Memory removal explicitly reconstructs estimates; when its button disappears focus returns to a stable action. Import errors do not replace the active session.

## States and fixtures

`/components/` is noindex and explicitly labels sample invalid, selected and disabled controls as fixtures. It is not an actual sending form or publication. Every palette is tested on actual controls, not only color arrays. The page includes code, metadata, errors, field borders, focus, selected checkbox, expanded detail and table.

## Conditional components not introduced

There are no modal dialogs, drag/drop editors, timed media, map widgets, account forms or fake contact APIs in this version. Their full acceptance requirements remain in the matrix and content guide for when content warrants them. Not having a modal is preferable to adding one merely to satisfy a test case.
