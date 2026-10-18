# D2 implementation map — integrated source 1.1.0

This map supplements, not replaces, the canonical D2 registry. Source implementation, automatic verification, human acceptance and deployment are different states. Historical D1 requirements and acceptance text are retained unchanged. Tests below must be interpreted using the actual attached run, not merely their presence in the tree.

| D2 concern | Implemented boundary | Executable verification | Remaining scope |
|---|---|---|---|
| RF01–04, RF15–17 | Astro editorial components, canonical publication catalog, combined notebook | Actual build, route/metadata verification, browser navigation | Owner credential/content review; external source availability |
| RF05–12 | M03 domain and public session facade | `agent-lab.test.mjs`, native browser download/replay | Old archive exact fixture compatibility explicitly not claimed |
| RF13–14, RF26 | Common motion policy; CSS/GSAP enhancement and opt-in Three.js | Policy truth table, storage/no-JS browser tests, optional WebGL/fallback | Target-device performance and final visual preference review |
| RF18, RF20; RQ04 | Verified source payload, external stage/backup, journaled transaction | Windows/Linux preflight and failure injection tests; wrapper parser | End-to-end update on owner's unique working copy; physical power-loss conditions |
| RF19; RQ01–06 | Locked build, allowlists, manifests, separate explicit deployment | CI build/contract checks and post-deploy identity check | GitHub Pages enablement if absent; owner account administration |
| RF21–22; RQ18 | Bounded v2 parser/replay in independent session | Mutation/version/resource/semantic rejection and browser import | Authorship is out of scope |
| RF23 | Revisable/frozen policy comparison across fixed environments | Control invariants, no privileged knowledge, common physical guard | Scientific generalization not claimed |
| RF24 | Separately labeled BFS tie-break comparison | Determinism and replay; separate browser result table | Not a substitute for RF23 |
| RF25; RQ08 | Text explanation/transcript from same domain snapshots | DOM accessibility scan and event flow | Human screen-reader task study |
| RQ07,09,14 | Progressive enhancement, responsive CSS, print layer | Compiled browser no-JS/responsive/print tests | Manual zoom/assistive-technology comprehension review |
| RQ12,17 | Domain/application/contracts independent of adapters; facade-only consumer access | AST import/capability fitness functions, injected failures, headless equivalence | Broad future integration capabilities require new contracts |
| RQ13,15 | Canonical bibliography and preserved D2 governing documentation | Catalog checks; D2 registry verifier | Human statement approval and documentation handover |
| RQ16 | Reserved original-content policy plus exact dependency inventory | Resolved package metadata inventory | Owner's broader licensing decision remains reserved |

## Macroelement correspondence

M01: `site/src/data`, editorial source records. M02: layouts/components/styles/scripts. M03: `site/src/modules/agent-lab`. M04: `research` and its build adapter. M05: `tools`, workflows, tests and release controls. These are logical boundaries, not five deployed microservices.

## Decisions resolved in implementation

Hexagonal separation is selective: it protects the lab's behavior without inventing ports for pure functions. No backend, authentication, database, message bus or remote agent is introduced. The 3D remains available but cannot block essential reading. The v2 fixture gets a distinct implementation/map identity rather than pretending to reconstruct unavailable byte-level source. Test plans are not marked executed through a documentation generator.
