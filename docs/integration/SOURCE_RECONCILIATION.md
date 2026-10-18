# Integrated source reconciliation — 1.1.0 / D2

The remote repository previously contained documentation and validation helpers, not the complete application. The earlier local/container source archive could not be extracted by the available execution environment. This integrated tree is therefore an explicit reconstruction against D2, the audited behavior descriptions and the preserved patches. It is **not** claimed to be a byte-equivalent recovery of the original ZIP.

The complete rendering/UI, build adapters and encapsulated laboratory are now maintained as source. The original D1 ZIP hash remains a reference to the audit, not the hash of these files. D1 and D2 historical documents remain unchanged; implementation evidence is recorded separately.

## Laboratory fixture compatibility

The new scenario has the distinct identity `corridor-16x10-d2` and implementation `gridworld-d2-1.1.0`. It uses the documented 16×10 board, start (2,5), goal (13,5), supplied prior, local cardinal sensor, original intervention and BFS order. Its explicit walls are listed in the domain source and in every v2 episode.

The first genuine domain run (Actions 39117741221, source f2cb632ffdbd170139099c29d7034e68d8dd12ce) passed 23 tests and failed one observation-count assertion: **44 observed cells versus the D1 report's 43**. Movements (15), ticks (17) and revisions (2) matched. We do not alter the sensor or conceal a cell to force the historical count. The new fixture count is independently checked as the union of the current cell and its cardinal neighbors for each recorded pre-step position. D1's 43 remains a historical result for the old fixture; it is not relabeled as a successful D2 test.

Legacy v1 retains its field meanings for the revisable baseline, but exact old message strings, insertion ordering and uncommitted map bytes are not a compatibility guarantee. Frozen-policy results use the new state/episode contract, not altered v1 metric semantics. Earlier v2 implementation IDs are rejected explicitly.

## Required experimental correction

RF-23 is implemented separately from RF-24. Model revision versus a frozen model changes only update policy, across two identical environment conditions. BFS tie-breaking is a second educational experiment. Neither is called a scientific benchmark or trained intelligence.

## Visual policy

The default first paint is readable and safe with motion reduced until the common policy resolves. Ambient CSS animation and explanatory scroll motion are available when permitted. Full 3D is optional on every device. This retains a dynamic visual experience while avoiding a GPU requirement for reading. It does not claim prior user-device performance measurements.

## Acceptance limits

Source integration, unit tests, complete build, browser tests and Windows restoration are separate checks. Human screen-reader task studies, field Web Vitals and performance on the owner's machines remain explicitly unmeasured. A source commit or documentation build alone never sets all D2 requirements to accepted.
