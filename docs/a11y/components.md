# Component contracts and regressions

BaseLayout supplies named navs, one main/h1, a first skip link, stable footer help and route-current labels. Native details/summary supplies menu expansion and hides collapsed descendants without JS; one shared Escape listener closes it and restores summary focus. This also works in Quarto's source header include. No modal trap or aria-modal is used. All repeated essential controls have text labels.

Cards use article and separate links; external destinations use the same tab. Publications expose actual status, authors, date/source, BibTeX download, selectable citation and Copy citation. Copy success/failure lives in one small status region; failure retains original selectable text. Quarto code-copy gets the same behavior and visible name. No line numbers are copied.

Preferences use grouped fieldsets/legends, labeled selects and a reading-mode checkbox. Changes do not navigate or steal focus. Errors remain visible and truthful. Contact uses existing public email and copy fallback; it does not simulate a message backend.

Search retains Quarto's full-text index using a nonmodal native search form. Results are DOM-created text/links, not injected HTML. No-JS users browse the base note list. Query-only URLs/history, clear, no results, loading, malformed/unavailable index and retry preserve focus and query. It does not remove visual preferences. The original Quarto popup and global single-character shortcuts are not required by the new search adapter.

Laboratory regression preserves fixed-map intervention, step/run/pause/reset, import/export, isolated replay, rejection, comparisons and pause out of view. Figures have a text transcript. Tables expose caption and scoped headers. Overflow regions are local and keyboard focusable. Self-model page wraps the existing public session facade; it does not alter its model or claim a neural benchmark.

The original pre-Grafito browser suite is preserved under tests/legacy. Its assertions about removed GSAP/3D controls and old nav no longer describe the current product. Its meaningful lab/replay/comparison, no-JS, responsive, 404, print and accessibility assertions were retained/adapted in tests/e2e/site.spec.mjs. The obsolete full-motion default is not a current acceptance target.
