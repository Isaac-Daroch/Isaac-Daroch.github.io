# ADR-014 — Canonical Grafito tokens and native controls

Status: implemented candidate. Drivers: VIS01–08, PREF01–06, READ01–04, SEM/INPUT/COMP. Date:2026-10-18.

Decision: keep owner's 24 token sets in one JSON; generate CSS and use a common pure preference resolver with explicit system precedence. Use a full preferences page with fieldsets and native selects rather than a modal widget. Use a native nonmodal details navigation disclosure. Local storage stores only validated interface preferences, with memory-only operation on failure.

Rejected: hand-maintained palettes in each component (drift); third-party accessibility overlay (does not repair semantics); global grayscale/inversion (destroys meaning of figures/photos); account-based preferences (privacy/backend cost without need); custom controls where native controls suffice (extra keyboard/voice burden).

Benefits: deterministic resolution, no hidden diagnostic assumptions, same values across generated pages, lower custom-input complexity. Costs: native control appearance varies by OS; full settings page takes a navigation step; denied storage cannot persist across fresh documents without another storage mechanism. High contrast and forced colors remain different features.

Risk/reversal: switching storage or generator affects semantics and privacy, so keep public state contract versioned. Readonly fields remain informative, disabled controls explained, themes have no animated transition. Evidence: seven preference unit tests,384 token pairs,24 rendered palettes and fault/persistence browser scenarios. Human comfort and screen-reader behavior remain separate.
