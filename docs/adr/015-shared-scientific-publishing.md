# ADR-015 — Preserve Astro–Quarto, share presentation and prefer scientific HTML

Status: implemented candidate; assistive mathematical evaluation pending. Drivers: ARCH01–03, SCI01–05, TECH02–03, IA01–03. Date:2026-10-18.

Decision: retain existing static staged build, lockfile and output-integrity tooling. Add a preparation entrypoint that generates shared visual assets, then invokes the existing build rather than manually patching generated HTML. Quarto's source template links the same preferences, uses theme:none and structured MathML. Scientific notes remain English and say so; Spanish editorial research summaries are genuinely translated.

Alternatives: migrate all content to one generator (lower integration count but unnecessary rewriting and loss of existing notebook workflow); PDF-only scientific access (insufficient local reading/navigation); independent Quarto theme switch (conflicting state and palette drift); remote mathematical fonts/renderers everywhere (unnecessary initial network dependencies).

Benefit: preserved URLs, scientific content, common preference state. Cost: two pipelines and source templates must be tested together, including math, code, references and footnotes. MathML presence is not proof of usable speech/navigation in every reader. External publisher accessibility is not controlled by local summaries.

Reversible by replacing the notebook adapter while keeping content/schema and public routes; redirects are required for any future route change. Evidence: actual Quarto–Astro build and per-template browser checks, with manual math cases explicitly pending.
