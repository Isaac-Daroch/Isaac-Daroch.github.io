# Component contracts and regressions

BaseLayout supplies named navs, one main/h1, a first skip link, stable footer help and route-current labels. Native details/summary supplies menu expansion and hides collapsed descendants without JS; one shared Escape listener closes it and restores summary focus. This also works in Quarto's source header include. No modal trap or aria-modal is used. All repeated essential controls have text labels.

Cards use article and separate links; external destinations use the same tab. Publications expose actual status, authors, date/source, BibTeX download, selectable citation and Copy citation. Copy success/failure lives in one small status region; failure retains original selectable text. Quarto code-copy gets the same behavior and visible name. No line numbers are copied.

Preferences use grouped fieldsets/legends, labeled selects and a reading-mode checkbox. Changes do not navigate or steal focus. Errors remain visible and truthful. Contact uses existing public email and copy fallback; it does not simulate a message backend.

Search retains Quarto's full-text index using a nonmodal native search form. Results are DOM-created text/links, not injected HTML. No-JS users browse the base note list. Query-only URLs/history, clear, no results, loading, malformed/unavailable index and retry preserve focus and query. It does not remove visual preferences. The original Quarto popup and global single-character shortcuts are not required by the new search adapter.

The current laboratory is `ExperienceAgent.astro`, its browser adapter and the pure `experience-agent/index.mjs` facade. A 4→8→6→1 MLP learns from retained experience only. Utility terms, candidate actions, internal state, counterfactual comparisons, forgetting/refitting and bounded deterministic replay are shown as text. Nothing runs on a timer. The original fixed-map BFS core/tests and older self-model core/tests remain reproducible supplementary mechanisms; they are not presented as this neural agent.

`InteractiveCV.astro` exposes a chronological path, filter, local text search, stage anchors, source disclosures and complete printing. JavaScript-disabled visitors receive all published entries. Credential categories and editorial modules are controlled by source switches; the build blocks enabled empty/untranslated archives. No visitor-facing administrative toggle or secret is shipped.

The original pre-Grafito browser suite is preserved under tests/legacy. Its assertions about removed GSAP/3D controls and old nav no longer describe the current product. Its meaningful lab/replay/comparison, no-JS, responsive, 404, print and accessibility assertions were retained/adapted in tests/e2e/site.spec.mjs. The obsolete full-motion default is not a current acceptance target.

The 1.1 browser suite is preserved in `tests/legacy/grafito-1.1-browser.spec.mjs` as historical evidence. The current suite exercises the multilingual neural observatory and curriculum. The notebook adapter relocates only our marked generated chrome outside Quarto main, preserving genuine body/main/header/footer landmarks.

Neural replay keeps exact result equality. Activation arithmetic and integer-based initialization are portable; the Chromium/Firefox regression compares all exported data after 48 decisions (including selective retention), verifies both directions and rejects a 1e-10 weight alteration. The episode implementation identity is `experience-self-mlp-1.0.1`. Historical 1.0.0 development episodes have a different identity and are not silently relabeled.
