# Third-party materials

Direct product dependencies are pinned in `site/package.json` and resolved in the authentic lockfile: Astro, GSAP and Three.js. Quarto is a separately installed publishing tool. Development verification uses the pinned Astro checker, TypeScript, Playwright and axe integration.

Run `node tools/third-party.mjs` after `npm ci` to generate an inventory from actual installed package metadata and the resolved lock. The verification artifact preserves that inventory. Preserve each package's LICENSE/NOTICE obligations when distributing its bundled code. GSAP uses its own terms and is not described here as MIT. This inventory is not a legal compatibility certification.

The Quarto output includes its runtime and theme assets; retain upstream attribution. The portrait is recorded in `docs/integration/asset-provenance.json`, from the owner's existing public GitHub profile, not private attachments. No fonts from the assistant's environment or architecture-book figures are included in the source package.
