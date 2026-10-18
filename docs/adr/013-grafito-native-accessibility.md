# ADR-013 — Grafito editorial, native access and shared preferences

Status: implemented for branch review, not production accepted. Drivers: GOV-01–05, VIS-01–08, PREF-01–06, ARCH-01–03, TECH-01–03, owner request 2026-10-18. Supersedes D2 decorative motion direction for the new default presentation, not the historical D2 record.

Decision: native HTML; complete preferences page instead of a modal or third-party overlay; a single 24-palette JSON generated into shared CSS; browser-only validated preferences and no account; serif editorial headings with local system text; static content plus meaningful user-operated experiments. Default motion reduced. No WebGL backgrounds, particles, parallax, custom cursor or opacity-faded information. Original media colors are not filtered. Root English routes preserved, Spanish equivalents added where content actually exists.

Alternatives: independent CSS per component risks divergence; a remote widget cannot repair semantics; account persistence introduces unnecessary data processing; arbitrary color sliders lack verified pairs; a full framework migration would invalidate useful infrastructure. Local storage is adequate for this public site. Under denied storage use tab storage when available, otherwise only current-document memory. Total denial cannot preserve state after navigation without another persistence mechanism; disclose this limitation rather than leak preferences through URLs.

Trade-off: editorial sobriety replaces cinematic decoration explicitly prohibited by the new supplied specification. The laboratory remains interactive and inspectable. No claims of treatment or universal accommodation. Controls of 44px and high-contrast informative text of 7:1 are project requirements, not a global AAA claim.

Reversibility: token source and presentation adapters can evolve independently of agent rules. Tests: `preferences-v2.test.mjs`, `pruebas/verificar_contrastes.py`, rendered-component and cross-generator browser tests. Keyboard/screen reader/real zoom/voice tasks remain distinct manual evidence.
