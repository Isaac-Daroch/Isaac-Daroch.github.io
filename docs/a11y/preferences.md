# Versioned interface preferences

Implementation: `site/public/assets/preferences-core.mjs` is pure. `preferences-runtime.mjs` is shared by Astro/Quarto. Defaults: version 2; theme/appearance system; colorProfile editorial; scale 1; readingMode false; font editorial; spacing normal; motion reduce; dataMode system. Allowed scales: 1, 1.125, 1.25, 1.5, 2. Other domains are defined once in ALLOWED; unknown fields and inherited/invalid values are discarded.

Explicit theme/appearance wins over system. System theme follows dark; contrast more→high, less→soft, custom/no preference→editorial. Reduced motion is local reduce OR system reduce. Forced colors control final rendering without deleting preference. Data mode low is manual or system saveData; no background media load is added by standard mode.

Local key: `isaac-visual-preferences-v2`. Parse/read/write exceptions are caught. Local failure falls back to sessionStorage, then current-document memory. Complete storage denial cannot persist through a full navigation; visible status explains this. Migration only reads actual `isaac-grafito-visual-v1`, maps recognized fields and removes that own legacy key only after successful persistence. On quota failure the migrated state stays usable in memory/session.

Storage events synchronize open tabs; deletion restores defaults. BFCache pageshow re-reads stored state. Reset removes only own local/session keys and preserves focus. No localStorage.clear, URL preferences, server collection or diagnosis. No account. Controls stay disabled until enhanced and have an explicit noscript explanation. System CSS fallback works without scripts.

Initial theme script is a small shared ES module with modulepreload in Astro. CSS follows system until the module applies the saved explicit choice; no intentional theme transition or blocking blank screen. A brief paint before module execution is possible under delayed script loading. No CSP is weakened. Future CSP changes must retain allowed local modules or supply a nonce/hash-compatible initializer.
