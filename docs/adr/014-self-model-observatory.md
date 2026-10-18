# ADR-014 — Independent experiential self-model observatory

Status: implementation candidate, scientific validation not claimed. Driver: owner's explicit rejection of a BFS/world-map demonstration as the central research identity. Supplement to D2; the old engine, v1/v2 contracts and protocols remain a separate educational baseline.

Decision: add `site/src/modules/self-model` with domain, application, bounded episode contract and browser adapter through a public facade. No backend, LLM impersonation or hidden prompt. The new environment has two task families, internal energy/fatigue, difficulty, observations and engineered outcome dynamics. A logistic self-predictor is fitted online from a finite selected memory. A utility policy selects work, probe or recovery; requests contribute a term but do not dictate the action. Actual utility terms and observations, not generated introspective prose, form the explanation.

What is designed: actions, initial conditions, outcome laws, logistic features, regularization, utility coefficients, memory budget and salience/coverage retention formula. What changes from experience: retained episodes, fitted predictive weights, local support/uncertainty proxy and resulting choices. The retention criterion uses learned prediction errors but is a heuristic, NOT an independently reinforcement-trained memory policy. No percentages of free will, subjective experience or human emotions are assigned.

Alternatives: a scripted character would communicate a false mechanism; an LLM narrative would not establish causality; training a large neural agent inside the public page would add cost and opacity; reskinning BFS would preserve the original conceptual error. A small inspectable learner is the chosen baseline, not the final research architecture.

Memory semantics: parameters are refitted from the retained set. `forget` is explicitly `forget-and-refit`, not a claim about how forgetting works in neural systems generally. Counterfactual current choices preserve state/history; a genuinely different history requires a separate episode/seed and documented interventions. Replay checks internal consistency, not authenticity or generalization.

Trade-offs: bounded and deterministic execution supports inspection and low-resource access, while the world is intentionally small and coefficients are engineered. New scientific claims need multiple seeds, held-out situations, baselines and independent review. Testing a functional mechanism does not demonstrate its superiority or consciousness.

Tests: `tests/self-model.test.mjs`, browser observatory checks and module dependency checks. The central requirements are recorded under SM-01–08 in docs/a11y/requirements.md; new experiments do not falsely close legacy BFS requirements.
