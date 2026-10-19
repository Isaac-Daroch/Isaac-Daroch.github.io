# Isaac Daroch — adaptive intelligence & digital worlds

Integrated static portfolio, Quarto research notebook and a transparent educational agent laboratory. Product source version **1.5.0**. Governing requirements and architecture: **D2**, in `docs/d2/`.

This is the complete integrated source, reconstructed against D2 and the preserved audit/patch descriptions. It is not a byte-for-byte recovery of the earlier uncommitted ZIP. Read `docs/integration/SOURCE_RECONCILIATION.md` for fixture compatibility and the explicit historical observed-cell difference.

## Current multilingual version

The public site is available in English, Spanish, German and Dutch. Version 1.5 reviews the four-language interface, translates library display titles while preserving exact original citations, and localizes the neural observatory’s formulas and inspectors. The accessibility bar uses two compact native disclosures. The separate Research module is disabled by owner request; Home has five essential cards. Repository showcases remain disabled. The library contains one owned publication, four recent readings, nine historical milestones and three external project videos. Teaching retains the three confirmed subjects and synthetic examples. See [editing instructions](docs/EDITAR_CONTENIDO.md) and the [current verification report](docs/a11y/test-report.md).

## Run locally on Windows

Reference tools: Node **24.19.0**, Quarto **1.10.18**, npm with lockfile support and Git. The source also declares Node minimum 22.22.0; release CI uses the exact reference version. No administrator privileges are required.

Extract the source package to a user-owned directory. Open PowerShell in that directory and run one line:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\INICIAR-WEB.ps1
```

The launcher installs locked dependencies if absent, verifies the complete build and starts only the compiled site on `http://127.0.0.1:4321/`. Keep the terminal open; Ctrl+C stops it. The execution-policy flag applies only to that process. Do not work in System32. Never paste a multiline block by right-click when your terminal reverses pasted lines.

For development, from `site`: `npm ci`, then `npm run dev`. Quarto sources are rendered by the wrapper; rerun it after editing a notebook. For production: `npm run build`. No command publishes automatically.

## Update an existing local checkout

Use only the **manifested source release ZIP**, not a random partial checkout. Stop Astro and close editors. Run `ACTUALIZAR-WEB.ps1` from the extracted package. It verifies every source file, stages installation outside the destination, executes syntax/tests/architecture/type/build checks, and only then replaces managed top-level entries. It preserves `.git`, saves previous contents outside the repo in `Projects/_web_backups/Isaac-Daroch.github.io/`, and journals every operation. Enter `ACTUALIZAR` when the displayed target is correct.

`ACTUALIZAR-WEB.ps1 -ValidateOnly` prepares and verifies without replacing the existing app. Backups and staging are not automatically deleted. The updater refuses symlinks/reparse points needing manual review; it must not be used to force changes through an unknown working tree.

Restore using `RESTABLECER-WEB.ps1 -BackupPath "full path to recorded backup"`. Stop Astro first. The journal must remain intact. Newer files are quarantined rather than deleted; original hashes are checked. See `docs/integration/OPERATIONS.md`.

## Structure

- `site/src/modules/agent-lab/domain`: private state, sensor, transition and BFS.
- `application` / `contracts`: driving use cases, bounded parsing and deterministic replay.
- `adapters/browser` / `adapters/headless`: independent presentations through a public facade.
- `site/src/components`, `layouts`, `styles`: static editorial pages and optional effects.
- `site/src/data/publications.json`: canonical bibliographic catalog.
- `research`: scientific notes, equations and bibliography-generated output.
- `tools`: artifact integration, inventory, validation, installation and packaging.
- `docs/d2`: requirements, ideas-forces, quality scenarios, macroelements, contracts and ADR.
- `tests`: executable unit/contracts/architecture/recovery and compiled-site browser checks.

## Verify

From `site`: `npm run check-js`, `npm test`, `npm run check:architecture`, `npm run check`, `npm run build`. For browser tests, `npx playwright install chromium` then `npm run test:e2e`.

The integrated workflow executes actual build and recovery fault tests on Linux and Windows; browser tests on Linux Chromium inspect the real combined artifact. D2's 18 documentation-validator tests are a separate scope. Reports belong to their exact commit/run; do not quote old counts as current results.

## Publish

Use the explicit Pages publication workflow on `main` only after verification. Publishing is separate from editing, local build and documentation validation. The deployed `release.json` identifies content and source; the post-deployment check compares identity and principal routes. If GitHub Pages has never been enabled, repository Settings → Pages must use GitHub Actions; the standard Actions token cannot grant repository-administration permissions to itself.

## What the laboratory proves

It is a fixed deterministic illustration, not a trained world model, learning benchmark, consciousness model or robot controller. The initial map is supplied. Local discrepancies can revise that model. Two separate experiments compare revision policies and BFS tie-breaking. Imported v2 episodes are replayed locally in a fresh instance; consistency does not establish authorship. Legacy v1 remains a snapshot.

## Documentation, status and rights

Start with `docs/d2/README.md`, then `docs/integration/IMPLEMENTATION_MAP.md` and `TESTING.md`. Full manual accessibility testing and field/hardware performance are not certified by automated CI. The portrait is recorded from the owner's public GitHub profile; private photos and identity-document images are excluded. Original-content reuse and third-party licenses are distinct; see `LICENSE`, `THIRD_PARTY_NOTICES.md` and `/privacy/`.


## Grafito editorial correction — branch review

The 18 October 2026 correction completes missing linked sections, makes palette
generation part of dev/build, shares preferences with Quarto, preserves the
full-text notebook index through a native search form, and documents the supplied
77 requirements, 55 WCAG criteria and 42 acceptance procedures. English remains
primary; Spanish entry/map/preferences clearly identify untranslated destinations.

Start the acceptance review at `docs/a11y/test-report.md`. Manual AT/voice/real zoom
and device acceptance remain pending; no complete WCAG conformance is claimed.
The Pages publication workflow remains an explicit separate action.
