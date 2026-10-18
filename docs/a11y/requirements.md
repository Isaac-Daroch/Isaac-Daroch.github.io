# Requirements and traceability — V2

The 77 owner specification identifiers remain unchanged. Their exact normative text is in the supplied master; this file maps them to implementation and verification rather than replacing them with a generic checklist. `traceability.json` is generated from `registry.mjs`. A linked test is a plan until its executed result is recorded for the candidate SHA.

## Scientific additions, separate from historical D2

| ID | Requirement | Components | Acceptance |
|---|---|---|---|
| SELF-01 | An agent can choose an internal goal without a new command | self-model/domain and application | Without external request, choose calibration, exploration or maintenance through the same evaluation mechanism |
| SELF-02 | Decisions expose their actual numeric contributions | candidates, browser values table | Sum of displayed terms equals the selected utility; no invented narrative is used as causal evidence |
| SELF-03 | Internal state can affect behavior at fixed external conditions | interveneAgent and session.compare | An energy-only intervention preserves history, task request and external difficulty; result evaluated independently |
| SELF-04 | Retained episodes change self estimates | retain, rebuildSelf, estimate | Posterior differs from prior after observations; evidence counts and context shown |
| SELF-05 | The functional self-model participates in decisions | self-prior comparison | Ablation changes evaluated values under the same snapshot, without asserting every state must change action |
| SELF-06 | Retention is bounded and explicitly characterized | selective/recent/random policies | At most eight episodes for all policies; future test questions are not provided to retention |
| SELF-07 | Contrary evidence can revise self estimates | posterior update | Contradictory outcomes can reduce a prior positive estimate; not fixed personality labels |
| SELF-08 | Retrieval removal and historical erasure are different | memory-hidden and forget-and-reconstruct | Hiding memory preserves consolidated estimates; reconstruction is explicitly named and never presented as erasing lived history |
| SELF-09 | Snapshots do not leak mutable state | session facade | Modifying exports cannot alter an active session |
| SELF-10 | Replay is deterministic and scoped | parseAndReplay | Reconstruct from config and commands in an independent session; reject mismatched result, version or oversized input |
| SELF-11 | Execution and input are bounded | numeric validation and command budgets | Maximum 240 steps, batches at most 24, files at most 500 kB; failures do not replace the active session |
| SELF-12 | True simulation parameters do not enter the decision interface | outcome port | Agent receives observed success/failure only, not true ability or outcome probability |
| SELF-13 | Memory-policy histories are comparable without fake causal claims | compareHistories | Same seed, architecture, budget and final current conditions; histories may diverge and are described as longitudinal |
| SELF-14 | Generated experience is reproducible, not a scripted character | randomAt and session | Identical seed/config/commands reproduce; differing seeds can differ; no personality scenario scripts |
| SELF-15 | The visitor controls execution | SelfObservatory and browser adapter | No autoplay; step and bounded batch stop; no timer forces interaction |
| SELF-16 | Source and limitations are inspectable | protocol, research record and tests | Priors, utility weights, heuristic retention, hidden outcome generation and confounding limits are disclosed |

## Macroelements and source boundaries

M01 editorial records: `site/src/data/editorial.mjs`, original `publications.json` and `site.mjs`. M02 public experience: `BaseLayout`, `EditorialPage`, `Preferences`, archives, generated tokens and shared browser preference adapter. M03 experiential laboratory: `site/src/modules/self-model/{domain,application,index.mjs}` with browser-only rendering in `scripts/self-observatory.mjs`. Historical gridworld stays separate. M04 scientific publishing: Quarto sources/template/styles plus existing staged build chain. M05 delivery and governance: source tests, palette verifier, v2 Playwright suite, local preview server, documentation registry and candidate-only CI.

No macroelement is a new remote microservice. No backend, account or private database is introduced. The architecture diagrams in `docs/adr/013...` describe logical boundaries; source files and tests expose the same boundaries.

## Editorial scope

One authored publication is preserved from the verified institutional bibliography. Related literature is not counted as Isaac's work. Existing confirmed professional channels are reused. Events and videos are empty pending verified records. No future itinerary, credentials, medical context, student information or private contact data is imported from previous conversations. News currently includes a source-linked publication update, not a live news service. The pipeline and content model can grow without fabricating records.

## Acceptance states

IMPLEMENTED means code is present. PASS in a scoped executed test means that test passed in its recorded environment. PENDIENTE_MANUAL means a human/device activity was not executed. NO_EVALUADO means no suitable evidence. NO_APLICA requires the actual inventory reason. Neither 'implemented' nor all automated tests green implies WCAG conformance or human product acceptance.
